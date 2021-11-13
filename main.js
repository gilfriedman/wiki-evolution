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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
const BASE_URL = "https://en.wikipedia.org/w/api.php";
let input = "Category:Animals";
/* MAIN */
(() => __awaiter(this, void 0, void 0, function* () {
    var e_1, _a;
    /* START getSubcatsByCatAndLevel */
    const hi = yield getSubcatsByCatAndLevel(input, 0);
    console.log(hi);
    const set = new Set(hi.map(x => x.title));
    console.log(set);
    /* END getSubcatsByCatAndLevel */
    /* START getAllPagesInCat */
    let articles = [];
    try {
        //debugger
        for (var set_1 = __asyncValues(set), set_1_1; set_1_1 = yield set_1.next(), !set_1_1.done;) {
            const cat = set_1_1.value;
            articles.push(...yield getAllPagesInCat(cat));
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (set_1_1 && !set_1_1.done && (_a = set_1.return)) yield _a.call(set_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    //debugger
    console.log(articles);
    const articlesSet = new Set(articles.map(x => x.title));
    const sorted = Array.from(articlesSet).sort();
    console.log(sorted);
    /* END getAllPagesInCat */
    const pagesHaveEvolutionSection = getPagesHaveEvolutionSection(sorted);
    console.log(pagesHaveEvolutionSection);
}))();
/* API */
function getPagesHaveEvolutionSection(titles) {
    var titles_1, titles_1_1;
    var e_2, _a;
    return __awaiter(this, void 0, void 0, function* () {
        const pagesHaveEvolutionSection = [];
        try {
            for (titles_1 = __asyncValues(titles); titles_1_1 = yield titles_1.next(), !titles_1_1.done;) {
                const title = titles_1_1.value;
                const content = yield getContentOfPage(title);
                // const content = (<any>contentObj).query.pages[0].revisions[0].slots.main.content;
                debugger;
                if ((content === null || content === void 0 ? void 0 : content.search("==Evo")) > -1) {
                    pagesHaveEvolutionSection.push(title);
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (titles_1_1 && !titles_1_1.done && (_a = titles_1.return)) yield _a.call(titles_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return pagesHaveEvolutionSection;
    });
}
function getSubcatsByCatAndLevel(catName, level) {
    var e_3, _a;
    return __awaiter(this, void 0, void 0, function* () {
        let subcats = yield getAllSubcats(catName);
        if (level > 0) {
            level--;
            try {
                for (var subcats_1 = __asyncValues(subcats), subcats_1_1; subcats_1_1 = yield subcats_1.next(), !subcats_1_1.done;) {
                    let subcat = subcats_1_1.value;
                    let results = yield getSubcatsByCatAndLevel(subcat.title, level);
                    subcats = [...subcats, ...results];
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (subcats_1_1 && !subcats_1_1.done && (_a = subcats_1.return)) yield _a.call(subcats_1);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
        return subcats;
    });
}
/* LOW LEVEL (using get) */
function getContentOfPage(title) {
    return __awaiter(this, void 0, void 0, function* () {
        const params = {
            action: "query",
            origin: "*",
            rvprop: "content",
            prop: "revisions",
            formatversion: "2",
            rvslots: "*",
            format: "json",
            titles: title,
        };
        return yield getContent(params);
    });
}
function getAllPagesInCat(catName) {
    return __awaiter(this, void 0, void 0, function* () {
        const params = {
            action: "query",
            list: "categorymembers",
            cmtitle: catName,
            cmlimit: "500",
            origin: "*",
            cmtype: "page",
            format: "json"
        };
        return yield getList(params);
    });
}
function getAllSubcats(catName) {
    return __awaiter(this, void 0, void 0, function* () {
        const params = {
            action: "query",
            list: "categorymembers",
            cmtitle: catName,
            cmlimit: "500",
            origin: "*",
            cmtype: "subcat",
            format: "json"
        };
        return yield getList(params);
    });
}
function getList(params) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = [];
        const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
        const url = BASE_URL + "?" + queryString;
        const resp = yield fetch(url);
        const json = yield resp.json();
        result.push(...json.query[params.list]);
        if (json.continue) {
            debugger;
            const continueKey = Object.keys(json.continue).find(key => key != "continue");
            const newParams = Object.assign({}, params);
            newParams[continueKey] = json.continue[continueKey];
            const continueResult = yield getList(newParams);
            result.push(...continueResult);
        }
        return result;
    });
}
function getContent(params) {
    var _a, _b, _c, _d, _e;
    return __awaiter(this, void 0, void 0, function* () {
        const result = [];
        const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
        const url = BASE_URL + "?" + queryString;
        const resp = yield fetch(url);
        const json = yield resp.json();
        if (!json.warnings) {
            return (_e = (_d = (_c = (_b = (_a = json.query) === null || _a === void 0 ? void 0 : _a.pages[0]) === null || _b === void 0 ? void 0 : _b.revisions[0]) === null || _c === void 0 ? void 0 : _c.slots) === null || _d === void 0 ? void 0 : _d.main) === null || _e === void 0 ? void 0 : _e.content;
        }
        else
            return null;
    });
}
//# sourceMappingURL=main.js.map