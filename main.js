// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);
// const input = urlParams.get('input');
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _this = this;
var BASE_URL = "https://en.wikipedia.org/w/api.php";
// let input = "Category:Animals";
var input = "Category:Long-distance_running";
var word = "stor";
var otherLang = "he";
/* MAIN */
(function () { return __awaiter(_this, void 0, void 0, function () {
    var hi, set, articles, set_1, set_1_1, cat, _a, _b, _c, e_1_1, articlesSet, sorted, pagesHaveEvolutionSection, titlesInOtherLang, pagesHaveEvolutionSection_1, pagesHaveEvolutionSection_1_1, page, otherLAngTitle, e_2_1;
    var e_1, _d, e_2, _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0: return [4 /*yield*/, getSubcatsByCatAndLevel(input, 0)];
            case 1:
                hi = _f.sent();
                console.log(hi);
                set = new Set(hi.map(function (x) { return x.title; }));
                console.log(set);
                articles = [];
                _f.label = 2;
            case 2:
                _f.trys.push([2, 8, 9, 14]);
                set_1 = __asyncValues(set);
                _f.label = 3;
            case 3: return [4 /*yield*/, set_1.next()];
            case 4:
                if (!(set_1_1 = _f.sent(), !set_1_1.done)) return [3 /*break*/, 7];
                cat = set_1_1.value;
                _b = (_a = articles.push).apply;
                _c = [articles];
                return [4 /*yield*/, getAllPagesInCat(cat)];
            case 5:
                _b.apply(_a, _c.concat([_f.sent()]));
                _f.label = 6;
            case 6: return [3 /*break*/, 3];
            case 7: return [3 /*break*/, 14];
            case 8:
                e_1_1 = _f.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 14];
            case 9:
                _f.trys.push([9, , 12, 13]);
                if (!(set_1_1 && !set_1_1.done && (_d = set_1["return"]))) return [3 /*break*/, 11];
                return [4 /*yield*/, _d.call(set_1)];
            case 10:
                _f.sent();
                _f.label = 11;
            case 11: return [3 /*break*/, 13];
            case 12:
                if (e_1) throw e_1.error;
                return [7 /*endfinally*/];
            case 13: return [7 /*endfinally*/];
            case 14:
                //debugger
                console.log(articles);
                articlesSet = new Set(articles.map(function (x) { return x.title; }));
                sorted = Array.from(articlesSet).sort();
                console.log(sorted);
                return [4 /*yield*/, getPagesHaveEvolutionSection(sorted)];
            case 15:
                pagesHaveEvolutionSection = _f.sent();
                console.log(pagesHaveEvolutionSection);
                titlesInOtherLang = [];
                _f.label = 16;
            case 16:
                _f.trys.push([16, 22, 23, 28]);
                pagesHaveEvolutionSection_1 = __asyncValues(pagesHaveEvolutionSection);
                _f.label = 17;
            case 17: return [4 /*yield*/, pagesHaveEvolutionSection_1.next()];
            case 18:
                if (!(pagesHaveEvolutionSection_1_1 = _f.sent(), !pagesHaveEvolutionSection_1_1.done)) return [3 /*break*/, 21];
                page = pagesHaveEvolutionSection_1_1.value;
                debugger;
                return [4 /*yield*/, getTitleInOtherLanguage(page, otherLang)];
            case 19:
                otherLAngTitle = _f.sent();
                otherLAngTitle && titlesInOtherLang.push(otherLAngTitle);
                _f.label = 20;
            case 20: return [3 /*break*/, 17];
            case 21: return [3 /*break*/, 28];
            case 22:
                e_2_1 = _f.sent();
                e_2 = { error: e_2_1 };
                return [3 /*break*/, 28];
            case 23:
                _f.trys.push([23, , 26, 27]);
                if (!(pagesHaveEvolutionSection_1_1 && !pagesHaveEvolutionSection_1_1.done && (_e = pagesHaveEvolutionSection_1["return"]))) return [3 /*break*/, 25];
                return [4 /*yield*/, _e.call(pagesHaveEvolutionSection_1)];
            case 24:
                _f.sent();
                _f.label = 25;
            case 25: return [3 /*break*/, 27];
            case 26:
                if (e_2) throw e_2.error;
                return [7 /*endfinally*/];
            case 27: return [7 /*endfinally*/];
            case 28:
                console.log(titlesInOtherLang);
                return [2 /*return*/];
        }
    });
}); })();
/* API */
function getPagesHaveEvolutionSection(titles) {
    var titles_1, titles_1_1;
    var e_3, _a;
    return __awaiter(this, void 0, void 0, function () {
        var pagesHaveEvolutionSection, title, content, regex, e_3_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    pagesHaveEvolutionSection = [];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 7, 8, 13]);
                    titles_1 = __asyncValues(titles);
                    _b.label = 2;
                case 2: return [4 /*yield*/, titles_1.next()];
                case 3:
                    if (!(titles_1_1 = _b.sent(), !titles_1_1.done)) return [3 /*break*/, 6];
                    title = titles_1_1.value;
                    return [4 /*yield*/, getContentOfPage(title)];
                case 4:
                    content = _b.sent();
                    // const content = (<any>contentObj).query.pages[0].revisions[0].slots.main.content;
                    debugger;
                    regex = new RegExp("==(.{0,30}" + word + ".{0,30})==", 'gi');
                    if (content && content.match(regex) != null) {
                        debugger;
                        pagesHaveEvolutionSection.push(title);
                    }
                    _b.label = 5;
                case 5: return [3 /*break*/, 2];
                case 6: return [3 /*break*/, 13];
                case 7:
                    e_3_1 = _b.sent();
                    e_3 = { error: e_3_1 };
                    return [3 /*break*/, 13];
                case 8:
                    _b.trys.push([8, , 11, 12]);
                    if (!(titles_1_1 && !titles_1_1.done && (_a = titles_1["return"]))) return [3 /*break*/, 10];
                    return [4 /*yield*/, _a.call(titles_1)];
                case 9:
                    _b.sent();
                    _b.label = 10;
                case 10: return [3 /*break*/, 12];
                case 11:
                    if (e_3) throw e_3.error;
                    return [7 /*endfinally*/];
                case 12: return [7 /*endfinally*/];
                case 13: return [2 /*return*/, pagesHaveEvolutionSection];
            }
        });
    });
}
function getSubcatsByCatAndLevel(catName, level) {
    var e_4, _a;
    return __awaiter(this, void 0, void 0, function () {
        var subcats, subcats_1, subcats_1_1, subcat, results, e_4_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, getAllSubcats(catName)];
                case 1:
                    subcats = _b.sent();
                    if (!(level > 0)) return [3 /*break*/, 14];
                    level--;
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 8, 9, 14]);
                    subcats_1 = __asyncValues(subcats);
                    _b.label = 3;
                case 3: return [4 /*yield*/, subcats_1.next()];
                case 4:
                    if (!(subcats_1_1 = _b.sent(), !subcats_1_1.done)) return [3 /*break*/, 7];
                    subcat = subcats_1_1.value;
                    return [4 /*yield*/, getSubcatsByCatAndLevel(subcat.title, level)];
                case 5:
                    results = _b.sent();
                    subcats = __spreadArray(__spreadArray([], subcats, true), results, true);
                    _b.label = 6;
                case 6: return [3 /*break*/, 3];
                case 7: return [3 /*break*/, 14];
                case 8:
                    e_4_1 = _b.sent();
                    e_4 = { error: e_4_1 };
                    return [3 /*break*/, 14];
                case 9:
                    _b.trys.push([9, , 12, 13]);
                    if (!(subcats_1_1 && !subcats_1_1.done && (_a = subcats_1["return"]))) return [3 /*break*/, 11];
                    return [4 /*yield*/, _a.call(subcats_1)];
                case 10:
                    _b.sent();
                    _b.label = 11;
                case 11: return [3 /*break*/, 13];
                case 12:
                    if (e_4) throw e_4.error;
                    return [7 /*endfinally*/];
                case 13: return [7 /*endfinally*/];
                case 14: return [2 /*return*/, subcats];
            }
        });
    });
}
/* LOW LEVEL (using get) */
function getTitleInOtherLanguage(title, lang) {
    return __awaiter(this, void 0, void 0, function () {
        var url, response, json, langLinks, targetTitle;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "https://en.wikipedia.org/w/api.php?origin=*&action=query&titles=" + title + "&prop=langlinks&format=json&lllang=" + lang + "&lllimit=500";
                    return [4 /*yield*/, fetch(url)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    json = _a.sent();
                    langLinks = json.query.pages[Object.keys(json.query.pages)[0]].langlinks;
                    targetTitle = langLinks && langLinks[0][Object.keys(langLinks[0])[1]];
                    return [2 /*return*/, targetTitle];
            }
        });
    });
}
function getContentOfPage(title) {
    return __awaiter(this, void 0, void 0, function () {
        var params;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    params = {
                        action: "query",
                        origin: "*",
                        rvprop: "content",
                        prop: "revisions",
                        formatversion: "2",
                        rvslots: "*",
                        format: "json",
                        titles: title
                    };
                    return [4 /*yield*/, getContent(params)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function getAllPagesInCat(catName) {
    return __awaiter(this, void 0, void 0, function () {
        var params;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    params = {
                        action: "query",
                        list: "categorymembers",
                        cmtitle: catName,
                        cmlimit: "500",
                        origin: "*",
                        cmtype: "page",
                        format: "json"
                    };
                    return [4 /*yield*/, getList(params)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function getAllSubcats(catName) {
    return __awaiter(this, void 0, void 0, function () {
        var params;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    params = {
                        action: "query",
                        list: "categorymembers",
                        cmtitle: catName,
                        cmlimit: "500",
                        origin: "*",
                        cmtype: "subcat",
                        format: "json"
                    };
                    return [4 /*yield*/, getList(params)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function getList(params) {
    return __awaiter(this, void 0, void 0, function () {
        var result, queryString, url, resp, json, continueKey, newParams, continueResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    result = [];
                    queryString = Object.keys(params).map(function (key) { return key + '=' + params[key]; }).join('&');
                    url = BASE_URL + "?" + queryString;
                    return [4 /*yield*/, fetch(url)];
                case 1:
                    resp = _a.sent();
                    return [4 /*yield*/, resp.json()];
                case 2:
                    json = _a.sent();
                    result.push.apply(result, json.query[params.list]);
                    if (!json["continue"]) return [3 /*break*/, 4];
                    debugger;
                    continueKey = Object.keys(json["continue"]).find(function (key) { return key != "continue"; });
                    newParams = __assign({}, params);
                    newParams[continueKey] = json["continue"][continueKey];
                    return [4 /*yield*/, getList(newParams)];
                case 3:
                    continueResult = _a.sent();
                    result.push.apply(result, continueResult);
                    _a.label = 4;
                case 4: return [2 /*return*/, result];
            }
        });
    });
}
function getContent(params) {
    var _a, _b, _c, _d, _e;
    return __awaiter(this, void 0, void 0, function () {
        var result, queryString, url, resp, json;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    result = [];
                    queryString = Object.keys(params).map(function (key) { return key + '=' + params[key]; }).join('&');
                    url = BASE_URL + "?" + queryString;
                    return [4 /*yield*/, fetch(url)];
                case 1:
                    resp = _f.sent();
                    return [4 /*yield*/, resp.json()];
                case 2:
                    json = _f.sent();
                    if (!json.warnings) {
                        return [2 /*return*/, (_e = (_d = (_c = (_b = (_a = json.query) === null || _a === void 0 ? void 0 : _a.pages[0]) === null || _b === void 0 ? void 0 : _b.revisions[0]) === null || _c === void 0 ? void 0 : _c.slots) === null || _d === void 0 ? void 0 : _d.main) === null || _e === void 0 ? void 0 : _e.content];
                    }
                    else
                        return [2 /*return*/, null];
                    return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=main.js.map