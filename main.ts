// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);
// const input = urlParams.get('input');

const BASE_URL = "https://en.wikipedia.org/w/api.php";

let input = "Category:Animals";

(async () => {
    const hi = await getSubcatsByCatAndLevel(input, 1);
    debugger
    console.log(hi);
    const set = new Set(hi.map(x => x.title));
    console.log(set);
})();

async function getSubcatsByCatAndLevel(catName, level) {
    console.log(`catName: ${catName}, level: ${level}`);

    let subcats = await getAllSubcats(catName);
    if (level > 0) {
        level--;
        debugger
        for (let subcat of subcats) {
            let results = await getSubcatsByCatAndLevel(subcat.title, level);
            subcats = [...subcats, ...results];
        }
    }
    return subcats;
}

async function getAllSubcats(catName) {
    const params: IParams = <ICMParams>{
        action: "query",
        list: "categorymembers",
        cmlimit: "500",
        cmtitle: catName,
        origin: "*",
        cmtype: "subcat",
        format: "json"
    };

    return await get(params);
}

async function get(params: IParams): Promise<any[]> {
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
        debugger
        const continueResult: any[] = await get(newParams);
        result.push(...continueResult);
    }

    return result;
}

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