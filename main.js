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
var input = "Category:Animals";
var depth = 0;
var word = "evolu";
var otherLang = "he";
/* MAIN */
(function () { return __awaiter(_this, void 0, void 0, function () {
    var hi, cats, articles, pagesInCatsPromises, articlesSet, sorted, pagesHaveEvolutionSection, titlesInOtherLang, pagesHaveEvolutionSection_1, pagesHaveEvolutionSection_1_1, page, otherLAngTitle, e_1_1;
    var _this = this;
    var e_1, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, getSubcatsByCatAndLevel(input, depth)];
            case 1:
                hi = _b.sent();
                console.log(hi);
                cats = new Set(hi.map(function (x) { return x.title; }));
                console.log(cats);
                articles = [];
                pagesInCatsPromises = Array.from(cats).map(function (cat) { return __awaiter(_this, void 0, void 0, function () { var _a, _b, _c; return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _b = (_a = articles.push).apply;
                            _c = [articles];
                            return [4 /*yield*/, getAllPagesInCat(cat)];
                        case 1: return [2 /*return*/, _b.apply(_a, _c.concat([_d.sent()]))];
                    }
                }); }); });
                return [4 /*yield*/, Promise.all(pagesInCatsPromises)];
            case 2:
                _b.sent();
                console.log(articles);
                articlesSet = new Set(articles.map(function (x) { return x.title; }));
                sorted = Array.from(articlesSet).sort();
                console.log(sorted);
                return [4 /*yield*/, getPagesHaveEvolutionSection(sorted)];
            case 3:
                pagesHaveEvolutionSection = _b.sent();
                console.log(pagesHaveEvolutionSection);
                titlesInOtherLang = [];
                _b.label = 4;
            case 4:
                _b.trys.push([4, 10, 11, 16]);
                pagesHaveEvolutionSection_1 = __asyncValues(pagesHaveEvolutionSection);
                _b.label = 5;
            case 5: return [4 /*yield*/, pagesHaveEvolutionSection_1.next()];
            case 6:
                if (!(pagesHaveEvolutionSection_1_1 = _b.sent(), !pagesHaveEvolutionSection_1_1.done)) return [3 /*break*/, 9];
                page = pagesHaveEvolutionSection_1_1.value;
                debugger;
                return [4 /*yield*/, getTitleInOtherLanguage(page, otherLang)];
            case 7:
                otherLAngTitle = _b.sent();
                titlesInOtherLang.push([page, otherLAngTitle]);
                _b.label = 8;
            case 8: return [3 /*break*/, 5];
            case 9: return [3 /*break*/, 16];
            case 10:
                e_1_1 = _b.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 16];
            case 11:
                _b.trys.push([11, , 14, 15]);
                if (!(pagesHaveEvolutionSection_1_1 && !pagesHaveEvolutionSection_1_1.done && (_a = pagesHaveEvolutionSection_1["return"]))) return [3 /*break*/, 13];
                return [4 /*yield*/, _a.call(pagesHaveEvolutionSection_1)];
            case 12:
                _b.sent();
                _b.label = 13;
            case 13: return [3 /*break*/, 15];
            case 14:
                if (e_1) throw e_1.error;
                return [7 /*endfinally*/];
            case 15: return [7 /*endfinally*/];
            case 16:
                console.log(titlesInOtherLang);
                document.write("<table>" +
                    ("<tr><td>en article in category " + input.split(":")[1] + " with title with \"" + word + "\"</td><td>" + otherLang + " article</td></tr>") +
                    titlesInOtherLang.map(function (t) { return "<tr><td><a href=\"https://en.wikipedia.org/wiki/" + t[0] + "\">" + t[0] + "</a></td><td><a href=\"https://" + otherLang + ".wikipedia.org/wiki/" + t[1] + "\">" + (t[1] ? t[1] : "") + "</a></td></tr>"; }));
                return [2 /*return*/];
        }
    });
}); })();
/* API */
function getPagesHaveEvolutionSection(titles) {
    return __awaiter(this, void 0, void 0, function () {
        var pagesHaveEvolutionSection, pagesHaveEvolutionSectionPromises;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pagesHaveEvolutionSection = [];
                    pagesHaveEvolutionSectionPromises = titles.map(function (title) { return __awaiter(_this, void 0, void 0, function () {
                        var content, regex;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, getContentOfPage(title)];
                                case 1:
                                    content = _a.sent();
                                    regex = new RegExp("==(.{0,30}" + word + ".{0,30})==", 'gi');
                                    if (content && content.match(regex) != null) {
                                        pagesHaveEvolutionSection.push(title);
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [4 /*yield*/, Promise.all(pagesHaveEvolutionSectionPromises)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, pagesHaveEvolutionSection];
            }
        });
    });
}
function getSubcatsByCatAndLevel(catName, level) {
    return __awaiter(this, void 0, void 0, function () {
        var subcats, subcatsByCatAndLevelPromises;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getAllSubcats(catName)];
                case 1:
                    subcats = _a.sent();
                    if (!(level > 0)) return [3 /*break*/, 3];
                    level--;
                    subcatsByCatAndLevelPromises = subcats.map(function (subcat) { return __awaiter(_this, void 0, void 0, function () {
                        var results;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, getSubcatsByCatAndLevel(subcat.title, level)];
                                case 1:
                                    results = _a.sent();
                                    subcats = __spreadArray(__spreadArray([], subcats, true), results, true);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [4 /*yield*/, Promise.all(subcatsByCatAndLevelPromises)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [2 /*return*/, subcats];
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