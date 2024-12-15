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
/* MAIN */
(function () { return __awaiter(_this, void 0, void 0, function () {
    var _a, categoryFullName, depth, word, otherLang, catsInfo, cats, articles, pagesInCatsPromises, articlesSet, sorted, pagesHaveEvolutionSection, pages, titlesInOtherLang, pages_1, pages_1_1, page, otherLAngTitle, e_1_1;
    var _this = this;
    var e_1, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = getHashParams(), categoryFullName = _a.cat, depth = _a.dep, word = _a.word, otherLang = _a.lang;
                console.log("started at ".concat((new Date()).toLocaleString()));
                console.time("timer");
                return [4 /*yield*/, getSubcatsByCatAndLevel(categoryFullName, depth)];
            case 1:
                catsInfo = _c.sent();
                cats = new Set(__spreadArray(__spreadArray([], catsInfo.map(function (cat) { return cat.title; }), true), [categoryFullName], false));
                console.log("finished getSubcatsByCatAndLevel: ".concat(cats.size, " cats"));
                console.timeLog("timer");
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
                _c.sent();
                articlesSet = new Set(articles.map(function (x) { return x.title; }));
                sorted = Array.from(articlesSet).sort();
                console.log("finished getAllPagesInCat: ".concat(sorted.length, " articles"));
                console.timeLog("timer");
                pagesHaveEvolutionSection = [];
                if (!word) return [3 /*break*/, 4];
                return [4 /*yield*/, getPagesHaveWordInSectionTitle(sorted, word)];
            case 3:
                pagesHaveEvolutionSection = _c.sent();
                console.log("finished getPagesHaveWordInSectionTitle: ".concat(pagesHaveEvolutionSection.length, " articles"));
                console.timeLog("timer");
                _c.label = 4;
            case 4:
                pages = pagesHaveEvolutionSection.length ? pagesHaveEvolutionSection : sorted;
                titlesInOtherLang = [];
                _c.label = 5;
            case 5:
                _c.trys.push([5, 11, 12, 17]);
                pages_1 = __asyncValues(pages);
                _c.label = 6;
            case 6: return [4 /*yield*/, pages_1.next()];
            case 7:
                if (!(pages_1_1 = _c.sent(), !pages_1_1.done)) return [3 /*break*/, 10];
                page = pages_1_1.value;
                return [4 /*yield*/, getTitleInOtherLanguage(page, otherLang)];
            case 8:
                otherLAngTitle = _c.sent();
                titlesInOtherLang.push([page, otherLAngTitle]);
                _c.label = 9;
            case 9: return [3 /*break*/, 6];
            case 10: return [3 /*break*/, 17];
            case 11:
                e_1_1 = _c.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 17];
            case 12:
                _c.trys.push([12, , 15, 16]);
                if (!(pages_1_1 && !pages_1_1.done && (_b = pages_1["return"]))) return [3 /*break*/, 14];
                return [4 /*yield*/, _b.call(pages_1)];
            case 13:
                _c.sent();
                _c.label = 14;
            case 14: return [3 /*break*/, 16];
            case 15:
                if (e_1) throw e_1.error;
                return [7 /*endfinally*/];
            case 16: return [7 /*endfinally*/];
            case 17:
                console.log("finished getTitleInOtherLanguage: ".concat(titlesInOtherLang.filter(function (t) { return !!t[1]; }).length, " articles"));
                console.timeLog("timer");
                document.write("<table>" +
                    "<tr><td>en article in category ".concat(categoryFullName.split(":")[1], " with title with \"").concat(word, "\"</td><td>").concat(otherLang, " article</td></tr>") +
                    titlesInOtherLang.map(function (t) { return "<tr><td><a href=\"https://en.wikipedia.org/wiki/".concat(t[0], "\">").concat(t[0], "</a></td><td><a href=\"https://").concat(otherLang, ".wikipedia.org/wiki/").concat(t[1], "\">").concat(t[1] ? t[1] : "", "</a></td></tr>"); }));
                console.timeEnd("timer");
                console.log("ended at ".concat((new Date()).toLocaleString()));
                return [2 /*return*/];
        }
    });
}); })();
/* Helpers */
function getHashParams() {
    var hash = window.location.hash.substr(1);
    return hash.split('&').reduce(function (res, item) {
        var parts = item.split('=');
        res[parts[0]] = parts[1];
        return res;
    }, {});
}
/* API */
function getPagesHaveWordInSectionTitle(titles, word) {
    var titles_1, titles_1_1;
    var e_2, _a;
    return __awaiter(this, void 0, void 0, function () {
        var pagesHaveEvolutionSection, regex, title, content, e_2_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    pagesHaveEvolutionSection = [];
                    regex = new RegExp("==(.{0,30}" + word + ".{0,30})==", 'gi');
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
                    if (!word || (content && content.match(regex) != null)) {
                        pagesHaveEvolutionSection.push(title);
                    }
                    _b.label = 5;
                case 5: return [3 /*break*/, 2];
                case 6: return [3 /*break*/, 13];
                case 7:
                    e_2_1 = _b.sent();
                    e_2 = { error: e_2_1 };
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
                    if (e_2) throw e_2.error;
                    return [7 /*endfinally*/];
                case 12: return [7 /*endfinally*/];
                case 13: return [2 /*return*/, pagesHaveEvolutionSection];
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
                case 0:
                    if (level == 0)
                        return [2 /*return*/, []];
                    return [4 /*yield*/, getAllSubcats(catName)];
                case 1:
                    subcats = _a.sent();
                    if (!(level > 1)) return [3 /*break*/, 3];
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
                    url = "https://en.wikipedia.org/w/api.php?origin=*&action=query&titles=".concat(title, "&prop=langlinks|pageviews&format=json&lllang=").concat(lang, "&lllimit=500");
                    return [4 /*yield*/, fetch(url)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    json = _a.sent();
                    langLinks = json.query?.pages[Object.keys(json.query?.pages)[0]].langlinks;
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
