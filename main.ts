// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);
// const input = urlParams.get('input');

const BASE_URL = "https://en.wikipedia.org/w/api.php";

// let input = "Category:Animals";
let input = "Category:Animals";
let depth = 1;
let word = "evolu";
let otherLang = "he";

/* MAIN */

(async () => {
    /* START getSubcatsByCatAndLevel */
    const hi = await getSubcatsByCatAndLevel(input, depth);
    console.log(hi);
    const cats = new Set(hi.map(x => x.title));
    console.log(cats);
    /* END getSubcatsByCatAndLevel */

    /* START getAllPagesInCat */
    //debugger

    let articles = [];
    const pagesInCatsPromises = Array.from(cats).map(async cat => articles.push(...await getAllPagesInCat(cat)));
    await Promise.all(pagesInCatsPromises);

    console.log(articles);
    const articlesSet = new Set(articles.map(x => x.title));
    const sorted = Array.from(articlesSet).sort();
    console.log(sorted);
    /* END getAllPagesInCat */

    const pagesHaveEvolutionSection = await getPagesHaveEvolutionSection(sorted);
    console.log(pagesHaveEvolutionSection);

    const titlesInOtherLang = [];
    const titleInOtherLanguagePromises = pagesHaveEvolutionSection.map(async page => {
        let otherLAngTitle = await getTitleInOtherLanguage(page, otherLang);
        otherLAngTitle && titlesInOtherLang.push(otherLAngTitle);
    });
    await Promise.all(titleInOtherLanguagePromises);
    // for await (const page of pagesHaveEvolutionSection) {
    //     debugger
    //     let otherLAngTitle = await getTitleInOtherLanguage(page, otherLang);
    //     otherLAngTitle && titlesInOtherLang.push(otherLAngTitle);
    // }
    console.log(titlesInOtherLang)
})();

/* API */
async function getPagesHaveEvolutionSection(titles) {
    const pagesHaveEvolutionSection = [];

    const pagesHaveEvolutionSectionPromises = titles.map(async (title) => {
        const content = await getContentOfPage(title);
        const regex = new RegExp("==(.{0,30}" + word + ".{0,30})==", 'gi');
        if (content && content.match(regex) != null) {
            pagesHaveEvolutionSection.push(title)
        }
    });

    await Promise.all(pagesHaveEvolutionSectionPromises);
    return pagesHaveEvolutionSection;
}

async function getSubcatsByCatAndLevel(catName, level) {
    let subcats = await getAllSubcats(catName);
    if (level > 0) {
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
    const url = `https://en.wikipedia.org/w/api.php?origin=*&action=query&titles=${title}&prop=langlinks&format=json&lllang=${lang}&lllimit=500`;
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