// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);
// const input = urlParams.get('input');

const BASE_URL = "https://en.wikipedia.org/w/api.php";

let input = "Category:Animals";

/* MAIN */

(async () => {
    /* START getSubcatsByCatAndLevel */
    const hi = await getSubcatsByCatAndLevel(input, 0);
    console.log(hi);
    const set = new Set(hi.map(x => x.title));
    console.log(set);
    /* END getSubcatsByCatAndLevel */

    /* START getAllPagesInCat */
    let articles = [];
    //debugger
    for await (const cat of set) {
        articles.push(...await getAllPagesInCat(cat));
    }
    //debugger
    console.log(articles);
    const articlesSet = new Set(articles.map(x => x.title));
    const sorted = Array.from(articlesSet).sort();
    console.log(sorted);
    /* END getAllPagesInCat */

    const pagesHaveEvolutionSection = getPagesHaveEvolutionSection(sorted);
    console.log(pagesHaveEvolutionSection);

})();

/* API */
async function getPagesHaveEvolutionSection(titles) {
    const pagesHaveEvolutionSection = [];
    for await (const title of titles) {
        const content = await getContentOfPage(title);
        // const content = (<any>contentObj).query.pages[0].revisions[0].slots.main.content;
        debugger
        if (content?.search("==Evo") > -1) {
            pagesHaveEvolutionSection.push(title)
        }
    }
    return pagesHaveEvolutionSection;
}

async function getSubcatsByCatAndLevel(catName, level) {
    let subcats = await getAllSubcats(catName);
    if (level > 0) {
        level--;
        for await (let subcat of subcats) {
            let results = await getSubcatsByCatAndLevel(subcat.title, level);
            subcats = [...subcats, ...results];
        }
    }
    return subcats;
}

/* LOW LEVEL (using get) */

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
        debugger
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