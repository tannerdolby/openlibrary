"use strict";
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
exports.__esModule = true;
var axios = require("axios")["default"];
/**
 * A class representing the Open Library Book API connections. Fetch data from
 * any of the four book APIs provided by [Open Library](https://openlibrary.org/dev/docs/api/books).
 */
var OpenLibrary = /** @class */ (function () {
    function OpenLibrary() {
        var _this = this;
        this.util = {
            works: {
                getBook: function (bookId, bookTitle, suffix, fullUrl) {
                    if (bookTitle === void 0) { bookTitle = ""; }
                    if (suffix === void 0) { suffix = ""; }
                    if (fullUrl === void 0) { fullUrl = ""; }
                    return __awaiter(_this, void 0, void 0, function () {
                        var request, response;
                        return __generator(this, function (_a) {
                            request = bookTitle && (suffix == "" || suffix) ? this.baseUrl + "/works/" + bookId + "/" + bookTitle : this.baseUrl + "/works/" + bookId + "." + suffix;
                            response = this.util.executeGetRequest(request, suffix, this.requestConfig);
                            return [2 /*return*/, response];
                        });
                    });
                }
            },
            isbn: {
                getBook: function (bookId, bookTitle, suffix, fullUrl) {
                    if (bookTitle === void 0) { bookTitle = ""; }
                    if (suffix === void 0) { suffix = ""; }
                    if (fullUrl === void 0) { fullUrl = ""; }
                    return __awaiter(_this, void 0, void 0, function () {
                        var request, response;
                        return __generator(this, function (_a) {
                            request = bookTitle && (suffix == "" || suffix) ? this.baseUrl + "/isbn/" + bookId : this.baseUrl + "/isbn/" + bookId + "." + suffix;
                            response = this.util.executeGetRequest(request, suffix, this.requestConfig);
                            return [2 /*return*/, response];
                        });
                    });
                }
            },
            editions: {
                getBook: function (bookId, bookTitle, suffix, fullUrl) {
                    if (bookTitle === void 0) { bookTitle = ""; }
                    if (suffix === void 0) { suffix = ""; }
                    if (fullUrl === void 0) { fullUrl = ""; }
                    return __awaiter(_this, void 0, void 0, function () {
                        var request, response;
                        return __generator(this, function (_a) {
                            request = bookTitle && (suffix == "" || suffix) ? this.baseUrl + "/books/" + bookId + "/" + bookTitle : this.baseUrl + "/books/" + bookId + "." + suffix;
                            response = this.util.executeGetRequest(request, suffix, this.requestConfig);
                            return [2 /*return*/, response];
                        });
                    });
                }
            },
            books: {
                getBook: function (bookId, bookTitle, suffix, bibkeys, format, callback, jscmd, fullUrl) {
                    if (bookTitle === void 0) { bookTitle = ""; }
                    if (suffix === void 0) { suffix = ""; }
                    if (bibkeys === void 0) { bibkeys = { "openLibraryIdType": "", "openLibraryId": 0 }; }
                    if (format === void 0) { format = ""; }
                    if (callback === void 0) { callback = function () { }; }
                    if (jscmd === void 0) { jscmd = ""; }
                    if (fullUrl === void 0) { fullUrl = ""; }
                    return __awaiter(_this, void 0, void 0, function () {
                        var request, bibKeysStr, response, queryParams, idType, field;
                        return __generator(this, function (_a) {
                            request = "";
                            bibKeysStr = "";
                            queryParams = {
                                bibkeys: bibkeys,
                                format: format,
                                callback: callback,
                                jscmd: jscmd // viewapi by default
                            };
                            if (bibkeys) {
                                if (bibkeys instanceof Object && bibkeys.constructor == Object) {
                                    for (idType in bibkeys) {
                                        bibKeysStr += idType + ":" + bibkeys["openLibraryId"] + ",";
                                    }
                                }
                                else if (bibkeys instanceof Array && bibkeys.constructor == Array) {
                                    bibkeys.forEach(function (bibkey) {
                                        bibKeysStr += bibkey + ",";
                                    });
                                }
                                bibKeysStr.slice(0, -1);
                            }
                            for (field in queryParams) {
                                // counter += 1;
                                // if (counter == 1) {
                                //     request = `${this.bookApiUrl}?${bibKeysStr}`;
                                // } else {
                                //     request += `&${queryParams[field]}`;
                                // }
                            }
                            request = bookTitle && (suffix == "" || suffix) ? this.baseUrl + "/books/" + bookId + "/" + bookTitle : this.baseUrl + "/books/" + bookId + "." + suffix;
                            response = this.util.executeGetRequest(request, suffix, this.requestConfig);
                            return [2 /*return*/, response];
                        });
                    });
                }
            },
            executeGetRequest: function (url, suffix, reqConfig) {
                if (suffix === void 0) { suffix = ""; }
                return __awaiter(_this, void 0, void 0, function () {
                    var htmlResponse, fileContentResponse, e_1, e_2;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(suffix != "")) return [3 /*break*/, 5];
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 3, , 4]);
                                return [4 /*yield*/, axios.get(url, reqConfig)];
                            case 2:
                                fileContentResponse = _a.sent();
                                return [2 /*return*/, fileContentResponse.hasOwnProperty("data") ? fileContentResponse.data : fileContentResponse];
                            case 3:
                                e_1 = _a.sent();
                                console.error(e_1);
                                return [3 /*break*/, 4];
                            case 4: return [3 /*break*/, 8];
                            case 5:
                                _a.trys.push([5, 7, , 8]);
                                return [4 /*yield*/, axios.get(url, reqConfig)];
                            case 6:
                                htmlResponse = _a.sent();
                                return [2 /*return*/, htmlResponse.hasOwnProperty("data") ? htmlResponse.data : htmlResponse];
                            case 7:
                                e_2 = _a.sent();
                                console.error(e_2);
                                return [3 /*break*/, 8];
                            case 8: return [2 /*return*/];
                        }
                    });
                });
            }
        };
        /* Covers API */
        this.coversApi = {
            apiName: "Covers",
            /**
             * Get a single book covers image URL.
             * @param key The identifier type. Can be any one of ISBN, OCLC, LCCN, OLID and ID (case-insensitive)
             * @param value The corresponding value for `key`.
             * @param size The size of the book cover image. Can be one of S, M and L for small, medium and large respectively.
             */
            getCover: function (key, value, size) { return __awaiter(_this, void 0, void 0, function () {
                var request, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            request = this.baseUrl + "/b/" + key + "/" + value + "-" + size + ".jpg";
                            return [4 /*yield*/, axios.get(request, this.requestConfig)];
                        case 1:
                            response = _a.sent();
                            return [2 /*return*/, response["status"] == 200 ? response["url"] : { "message": "Request failed", "response": response }];
                    }
                });
            }); },
            /**
             * Get a list of book covers image URLs.
             * @param coversObjList An array of book cover objects to return book covers for. (e.g. [{title: string, id: string | number, key: string, size: string},]
             * @returns An array of book cover image URLs.
             */
            getCovers: function (coversObjList) { return __awaiter(_this, void 0, void 0, function () {
                var covers;
                var _this = this;
                return __generator(this, function (_a) {
                    covers = [];
                    coversObjList.forEach(function (cover) {
                        var key = cover.key, id = cover.id, size = cover.size;
                        var response = _this.coversApi.getCover(key, id, size);
                        covers.push(response);
                    });
                    return [2 /*return*/, Promise.all(covers).then(function (c) {
                            return c;
                        })];
                });
            }); }
        };
        /* Books APIs (Works, Editions, ISBN, Books) */
        this.booksApi = {
            apiName: "Books",
            works: {
                getBook: this.util.works.getBook
            },
            isbn: {
                getBook: this.util.isbn.getBook
            },
            editions: {
                getBook: this.util.editions.getBook
            },
            // books.books - todo: use better naming to avoid repitition
            books: {
                getBook: this.util.books.getBook
            }
        };
        // todo
        this.authorsApi = {
            apiName: "Authors",
            getAuthorPage: function (identifierKey) { return __awaiter(_this, void 0, void 0, function () {
                var request;
                return __generator(this, function (_a) {
                    request = "" + this.baseUrl;
                    return [2 /*return*/];
                });
            }); }
        };
        // todo
        this.subjectsApi = {
            apiName: "Subjects"
        };
        this.baseUrl = "https://openlibrary.org";
        this.bookApiUrl = this.baseUrl + "/api/books";
        this.requestConfig = {
            baseUrl: this.baseUrl,
            headers: {
                'Accept': "text/html, text/plain, application/json, application/yaml",
                'Accept-Encoding': 'gzip, deflate, br'
            }
        };
    }
    return OpenLibrary;
}());
exports["default"] = OpenLibrary;
