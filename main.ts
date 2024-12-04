const BASE_URL = "https://en.wikipedia.org/w/api.php";

/* MAIN */

(async () => {
    const {cat: categoryFullName, dep: depth, word, lang: otherLang} = getHashParams();

    console.log(`started at ${(new Date()).toLocaleString()}`);
    console.time("timer");

    const catsInfo = await getSubcatsByCatAndLevel(categoryFullName, depth);
    const cats = new Set([...catsInfo.map(cat => cat.title), categoryFullName]);
    console.log(`finished getSubcatsByCatAndLevel: ${cats.size} cats`);
    console.timeLog("timer");

    let articles = [];
    const pagesInCatsPromises = Array.from(cats).map(async cat => articles.push(...await getAllPagesInCat(cat)));
    await Promise.all(pagesInCatsPromises);
    const articlesSet = new Set(articles.map(x => x.title));
    const sorted = Array.from(articlesSet).sort();

    console.log(`finished getAllPagesInCat: ${sorted.length} articles`);
    console.timeLog("timer");

    let pagesHaveEvolutionSection = [];
    if (word) {
        pagesHaveEvolutionSection = await getPagesHaveWordInSectionTitle(sorted, word);
        console.log(`finished getPagesHaveWordInSectionTitle: ${pagesHaveEvolutionSection.length} articles`);
        console.timeLog("timer");
    }

    const pages = pagesHaveEvolutionSection.length ? pagesHaveEvolutionSection : sorted;
    const titlesInOtherLang = [];

    for await (const page of pages) {
        let otherLAngTitle = await getTitleInOtherLanguage(page, otherLang);
        titlesInOtherLang.push([page, otherLAngTitle]);
    }
    console.log(`finished getTitleInOtherLanguage: ${titlesInOtherLang.filter(t=>!!t[1]).length} articles`);
    console.timeLog("timer");

    document.write(
        "<table>" +
        `<tr><td>en article in category ${categoryFullName.split(":")[1]} with title with "${word}"</td><td>${otherLang} article</td></tr>` +
        titlesInOtherLang.map(t => `<tr><td><a href="https://en.wikipedia.org/wiki/${t[0]}">${t[0]}</a></td><td><a href="https://${otherLang}.wikipedia.org/wiki/${t[1]}">${t[1] ? t[1] : ""}</a></td></tr>`)
    );

    console.timeEnd("timer");
    console.log(`ended at ${(new Date()).toLocaleString()}`);
})();

/* Helpers */
function getHashParams(): UrlHashParams {
    const hash = window.location.hash.substr(1);

    return hash.split('&').reduce(function (res, item) {
        var parts = item.split('=');
        res[parts[0]] = parts[1];
        return res;
    }, {}) as UrlHashParams;
}

/* API */
async function getPagesHaveWordInSectionTitle(titles, word) {
    const pagesHaveEvolutionSection = [];
    const regex = new RegExp("==(.{0,30}" + word + ".{0,30})==", 'gi');

    for await (const title of titles) {
        const content = await getContentOfPage(title);
        if (!word || (content && content.match(regex) != null)) {
            pagesHaveEvolutionSection.push(title)
        }
    }
    return pagesHaveEvolutionSection;
}

async function getSubcatsByCatAndLevel(catName, level) {
    if (level == 0) return [];

    let subcats = await getAllSubcats(catName);
    if (level > 1) {
        level--;

        const subcatsByCatAndLevelPromises = subcats.map(async subcat => {
            let results = await getSubcatsByCatAndLevel(subcat.title, level);
            subcats = [...subcats, ...results];
        })
        await Promise.all(subcatsByCatAndLevelPromises);
    }
    return subcats;
}

/* LOW LEVEL (using get) */

async function getTitleInOtherLanguage(title: string, lang: string): Promise<string> {
    const url = `https://en.wikipedia.org/w/api.php?origin=*&action=query&titles=${title}&prop=langlinks|pageviews&format=json&lllang=${lang}&lllimit=500`;
    const response = await fetch(url);
    const json = await response.json();
    const langLinks = (<any>json).query.pages[Object.keys((<any>json).query.pages)[0]].langlinks;
    const targetTitle: string = langLinks && langLinks[0][Object.keys(langLinks[0])[1]];
    return targetTitle;
}

async function getContentOfPage(title) {
    const params: IParams = <IRVParams>{
        action: "query",
        origin: "*",
        rvprop: "content",
        prop: "revisions",
        formatversion: "2",
        rvslots: "*",
        format: "json",
        titles: title,
    };

    return await getContent(params);
}

async function getAllPagesInCat(catName) {
    const params: IParams = <ICMParams>{
        action: "query",
        list: "categorymembers",
        cmtitle: catName,
        cmlimit: "500",
        origin: "*",
        cmtype: "page",
        format: "json"
    };

    return await getList(params);
}

async function getAllSubcats(catName) {
    const params: IParams = <ICMParams>{
        action: "query",
        list: "categorymembers",
        cmtitle: catName,
        cmlimit: "500",
        origin: "*",
        cmtype: "subcat",
        format: "json"
    };

    return await getList(params);
}

async function getList(params: IParams): Promise<any[]> {
    const result = [];
    const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
    const url = BASE_URL + "?" + queryString;
    const resp = await fetch(url);
    const json = await resp.json();

    result.push(...json.query[params.list]);

    if (json.continue) {
        const continueKey = Object.keys(json.continue).find(key => key != "continue");
        const newParams = { ...params };
        newParams[continueKey] = json.continue[continueKey];
        const continueResult: any[] = await getList(newParams);
        result.push(...continueResult);
    }

    return result;
}

async function getContent(params: IParams): Promise<string> {
    const result = [];
    const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
    const url = BASE_URL + "?" + queryString;
    const resp = await fetch(url);
    const json = await resp.json();

    if (!json.warnings) {
        return (<any>json).query?.pages[0]?.revisions[0]?.slots?.main?.content;
    } else return null
}

/* MODELS */

interface IParams {
    action: string;
    origin: string;
    list: string;
    format: string;
}

interface ICMParams extends IParams {
    cmtitle: string;
    cmtype: "subcat" | "page" | "file";
    cmlimit: string;
    cmcontinue: string;
}

interface IRVParams extends IParams {
    prop: string;
    titles: string;
    rvslots: string;
    rvprop: string;
    formatversion: string;
}

interface UrlHashParams {
    cat: string,
    dep: string,
    word: string,
    lang: string,
}
