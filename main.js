// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);
// const input = urlParams.get('input');
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const BASE_URL = "https://en.wikipedia.org/w/api.php";
let input = "Category:Animals";
(() => __awaiter(this, void 0, void 0, function* () {
    const hi = yield getSubcatsByCatAndLevel(input, 1);
    debugger;
    console.log(hi);
    const set = new Set(hi.map(x => x.title));
    console.log(set);
}))();
function getSubcatsByCatAndLevel(catName, level) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`catName: ${catName}, level: ${level}`);
        let subcats = yield getAllSubcats(catName);
        if (level > 0) {
            level--;
            debugger;
            for (let subcat of subcats) {
                let results = yield getSubcatsByCatAndLevel(subcat.title, level);
                subcats = [...subcats, ...results];
            }
        }
        return subcats;
    });
}
function getAllSubcats(catName) {
    return __awaiter(this, void 0, void 0, function* () {
        const params = {
            action: "query",
            list: "categorymembers",
            cmlimit: "500",
            cmtitle: catName,
            origin: "*",
            cmtype: "subcat",
            format: "json"
        };
        return yield get(params);
    });
}
function get(params) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = [];
        const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
        const url = BASE_URL + "?" + queryString;
        const resp = yield fetch(url);
        const json = yield resp.json();
        result.push(...json.query[params.list]);
        if (json.continue) {
            const continueKey = Object.keys(json.continue).find(key => key != "continue");
            const newParams = Object.assign({}, params);
            newParams[continueKey] = json.continue[continueKey];
            debugger;
            const continueResult = yield get(newParams);
            result.push(...continueResult);
        }
        return result;
    });
}
//# sourceMappingURL=main.js.map