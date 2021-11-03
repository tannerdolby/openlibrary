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
 * A class representing the Open Library API connections. Fetch data from
 * the Open Library REST API and Open Library APIs outlined in the [Developer Center](https://openlibrary.org/dev/docs/api/)
 */
var OpenLibrary = /** @class */ (function () {
    function OpenLibrary() {
        this.baseUrl = "https://openlibrary.org";
        this.bookApiUrl = this.baseUrl + "/api/books";
        this.coversApiUrl = "https://covers.openlibrary.org";
        this.authorsApiUrl = "https://authors.openlibrary.org";
        this.searchApiUrl = this.baseUrl + "/search";
        this.requestConfig = {
            baseUrl: this.baseUrl,
            headers: {
                'Accept': "text/html, text/plain, application/json, application/yaml, image/*",
                'Accept-Encoding': 'gzip, deflate, br'
            }
        };
    }
    OpenLibrary.prototype.executeGetRequest = function (url, reqConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var response, redirectedHtml, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        redirectedHtml = "";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios.get(url, reqConfig)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.hasOwnProperty("data") ? response.data : response];
                    case 3:
                        e_1 = _a.sent();
                        // todo: address this axios redirect hiccup
                        if (e_1.response.hasOwnProperty("data") && e_1.response.data) {
                            redirectedHtml = e_1.response.data;
                        }
                        else {
                            console.error({
                                "message": "Unable to fetch HTML page intially. Axios might not have handled a redirect or the Open Library could be down.",
                                "isAxiosError": e_1.isAxiosError,
                                "statusCode": e_1.response.status,
                                "responseData": e_1.response.data
                            });
                        }
                        return [3 /*break*/, 4];
                    case 4:
                        if (redirectedHtml && redirectedHtml != "") {
                            return [2 /*return*/, redirectedHtml];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get a book covers image URL from the Covers API.
     * @param {string} key The identifier type. Can be any one of ISBN, OCLC, LCCN, OLID and ID (case-insensitive)
     * @param {string} value The corresponding value for `key`.
     * @param {string} size The size of the book cover image. Can be one of S, M and L for small, medium and large respectively.
     * @returns {string} A book covers image URL.
    */
    OpenLibrary.prototype.getBookCover = function (key, value, size) {
        return __awaiter(this, void 0, void 0, function () {
            var request, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request = this.coversApiUrl + "/b/" + key.toLowerCase() + "/" + value + "-" + size + ".jpg";
                        return [4 /*yield*/, axios.get(request, this.requestConfig)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response && response["status"] == 200 ? response["request"]["res"]["responseUrl"] : response];
                }
            });
        });
    };
    /**
     * Get a list of book cover image URLs from the Covers API.
     * @param {BooksCovers[]} coversObjList An array of book cover objects to return book covers for. (e.g. [{title: string, id: string | number, key: string, size: string},]
     * @returns {string[]} An array of book cover image URLs.
    */
    OpenLibrary.prototype.getBookCovers = function (coversObjList) {
        return __awaiter(this, void 0, void 0, function () {
            var covers;
            var _this = this;
            return __generator(this, function (_a) {
                covers = [];
                coversObjList.forEach(function (cover) {
                    var key = cover.key, id = cover.id, size = cover.size;
                    var response = _this.getBookCover(key, id, size);
                    covers.push(response);
                });
                return [2 /*return*/, Promise.all(covers).then(function (c) {
                        return c;
                    })];
            });
        });
    };
    ;
    /**
     * Get a Work page for a specific book identifier and or title. A Work is a logical collection of similar Editions.
     * @param {string} bookId A required parameter representing the book identifier.
     * @param {string} bookTitle Optional parameter which specifies the 'Work' (book) title.
     * @param {string} suffix Optional parameter which specifies the data representation of function result. ("json" | "yml")
     * @param {string} fullUrl Optional parameter which represents a complete and valid request URL to the 'Works' API.
     * @returns {OpenLibResponse} Returns a Work page in the specified data representation e.g. HTML, JSON, or YML.
     */
    OpenLibrary.prototype.getWorksPage = function (bookId, bookTitle, suffix, fullUrl) {
        if (bookTitle === void 0) { bookTitle = ""; }
        if (suffix === void 0) { suffix = ""; }
        if (fullUrl === void 0) { fullUrl = ""; }
        return __awaiter(this, void 0, void 0, function () {
            var request, response;
            return __generator(this, function (_a) {
                request = bookTitle && (suffix == "" || !suffix) ? this.baseUrl + "/works/" + bookId + "/" + bookTitle : this.baseUrl + "/works/" + bookId + "." + suffix;
                response = this.executeGetRequest(fullUrl == "" ? request : fullUrl, this.requestConfig);
                return [2 /*return*/, response];
            });
        });
    };
    /**
     * An alternative way to get an 'Editions' page for a specific book identifier and or title.
     * @param {string} bookId Required parameter representing the book identifier.
     * @param {string} bookTitle Optional parameter which specifies the 'Work' (book) title.
     * @param {string} suffix Optional parameter which specifies the data representation of function result. ("json" | "yml")
     * @param {string} fullUrl Optional parameter which represents a complete and valid request URL to the 'Works' API.
     * @returns {OpenLibResponse} Returns a Work page in the specified data representation e.g. HTML, JSON, or YML.
     */
    OpenLibrary.prototype.getIsbnPage = function (bookId, bookTitle, suffix, fullUrl) {
        if (bookTitle === void 0) { bookTitle = ""; }
        if (suffix === void 0) { suffix = ""; }
        if (fullUrl === void 0) { fullUrl = ""; }
        return __awaiter(this, void 0, void 0, function () {
            var request, response;
            return __generator(this, function (_a) {
                request = bookTitle && (suffix == "" || !suffix) ? this.baseUrl + "/isbn/" + bookId : this.baseUrl + "/isbn/" + bookId + "." + suffix;
                response = this.executeGetRequest(request, this.requestConfig);
                return [2 /*return*/, response];
            });
        });
    };
    /**
     * Fetch an 'Editions' page for a specific book based on identifier and or title.
     * @param {string} bookId Required parameter representing the book identifier.
     * @param {string} bookTitle Optional parameter which specifies the 'Edition' (book) title.
     * @param {string} suffix Optional parameter which specifies the data representation of function result. ("json" | "yml")
     * @param {string} fullUrl Optional parameter which represents a complete and valid request URL to the 'Editions' API.
     * @returns {OpenLibResponse} Returns a Work page in the specified data representation e.g. HTML, JSON, or YML.
     */
    OpenLibrary.prototype.getEditionsPage = function (bookId, bookTitle, suffix, fullUrl) {
        if (bookTitle === void 0) { bookTitle = ""; }
        if (suffix === void 0) { suffix = ""; }
        if (fullUrl === void 0) { fullUrl = ""; }
        return __awaiter(this, void 0, void 0, function () {
            var request, response;
            return __generator(this, function (_a) {
                request = bookTitle && (suffix == "" || !suffix) ? this.baseUrl + "/books/" + bookId + "/" + bookTitle : this.baseUrl + "/books/" + bookId + "." + suffix;
                response = this.executeGetRequest(request, this.requestConfig);
                return [2 /*return*/, response];
            });
        });
    };
    /**
     * Use the configurable 'Books' endpoint which allows requesting information on one or more books
     * using ISBNs, OCLC Numbers, LCCNs and OLIDs (Open Library IDs).
     * @param {string} bookId Required parameter representing the book identifier.
     * @param {string} bookTitle Optional parameter which specifies the 'Edition' (book) title.
     * @param {string} suffix Optional parameter which specifies the data representation of function result. ("json" | "yml")
     * @param bibkeys
     * @param format
     * @param callback
     * @param jscmd
     * @param fullUrl
     * @returns
     */
    OpenLibrary.prototype.getBooksPage = function (bookId, bookTitle, suffix, bibkeys, format, callback, jscmd, fullUrl) {
        if (bookTitle === void 0) { bookTitle = ""; }
        if (suffix === void 0) { suffix = ""; }
        if (bibkeys === void 0) { bibkeys = { "openLibraryIdType": "", "openLibraryId": 0 }; }
        if (format === void 0) { format = ""; }
        if (callback === void 0) { callback = function () { }; }
        if (jscmd === void 0) { jscmd = ""; }
        if (fullUrl === void 0) { fullUrl = ""; }
        return __awaiter(this, void 0, void 0, function () {
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
                // todo
                for (field in queryParams) {
                    // counter += 1;
                    // if (counter == 1) {
                    //     request = `${this.bookApiUrl}?${bibKeysStr}`;
                    // } else {
                    //     request += `&${queryParams[field]}`;
                    // }
                }
                request = bookTitle && (suffix == "" || suffix) ? this.baseUrl + "/books/" + bookId + "/" + bookTitle : this.baseUrl + "/books/" + bookId + "." + suffix;
                response = this.executeGetRequest(request, this.requestConfig);
                return [2 /*return*/, response];
            });
        });
    };
    // ----------------- AUTHORS APIs -----------------
    /**
     * Fetch complete data for an individual author by identifier and gets their Author page as ".json|.yml|.rdf".
     * @param authorId Required parameter which specifies the identifier key for an author.
     * @param suffix Optional parameter which specifies the
     */
    OpenLibrary.prototype.getAuthorsPage = function (authorId, suffix) {
        if (suffix === void 0) { suffix = "json"; }
        return __awaiter(this, void 0, void 0, function () {
            var request, response;
            return __generator(this, function (_a) {
                request = this.baseUrl + "/authors/" + authorId + "." + suffix;
                response = this.executeGetRequest(request, this.requestConfig);
                return [2 /*return*/, response];
            });
        });
    };
    /**
     * Get an author photo using OLID or ID.
     * @param {string} key The identifier type. Can be any one of ISBN, OCLC, LCCN, OLID and ID (case-insensitive)
     * @param {string} value The corresponding value for `key`.
     * @param {string} size The size of the book cover image. Can be one of S, M and L for small, medium and large respectively.
     */
    OpenLibrary.prototype.getAuthorPhoto = function (key, value, size) {
        return __awaiter(this, void 0, void 0, function () {
            var request, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request = this.coversApiUrl + "/a/" + key.toLowerCase() + "/" + value + "-" + size + ".jpg";
                        return [4 /*yield*/, axios.get(request, this.requestConfig)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response && response["status"] == 200 ? response["request"]["res"]["responseUrl"] : response];
                }
            });
        });
    };
    /**
     * Search for an author by specifying a query parameter such as name.
     * @param {string} queryParam Required query parameter string to search for an author. Can be a single query for name e.g. "twain" or multiple querys "twain&limit"
     * @returns An authors information as JSON if found.
     */
    OpenLibrary.prototype.searchForAuthors = function (queryParam) {
        return __awaiter(this, void 0, void 0, function () {
            var request, response, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request = this.searchApiUrl + "/authors.json?q=" + queryParam.replace(/\s+/, "%20");
                        return [4 /*yield*/, axios.get(request, this.requestConfig)];
                    case 1:
                        response = _a.sent();
                        data = response["data"];
                        return [2 /*return*/, response["status"] == 200 ? data : response];
                }
            });
        });
    };
    /**
     *
     * @param authorId The identifier for an author. (e.g. OL23919A)
     * @param limit The number of works to return for an author. Default is 50.
     * @param offset The number of works to offset for pagination. Default is 50.
     * @returns {JSON} Returns the works for an author as JSON.
     */
    OpenLibrary.prototype.getAuthorWorks = function (authorId, limit, offset) {
        if (limit === void 0) { limit = 0; }
        if (offset === void 0) { offset = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var request, response, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request = this.baseUrl + "/authors/" + authorId + "/works.json";
                        if (limit != 0) {
                            request += "?limit=" + limit;
                        }
                        else if (offset != 0) {
                            request += "?offset=" + offset;
                        }
                        return [4 /*yield*/, axios.get(request, this.requestConfig)];
                    case 1:
                        response = _a.sent();
                        data = response["data"];
                        return [2 /*return*/, response["status"] == 200 ? data : response];
                }
            });
        });
    };
    // ----------------- END AUTHORS API -----------------
    // Subjects API 
    OpenLibrary.prototype.getSubjectsPage = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    /**
     * Use the Search API to specify a solr query and return the results found.
     * @param queryParam Parameter which specifies the [solr query](https://openlibrary.org/search/howto), e.g. "twain" would result in q=twain and a name=value pair would persist in the URL as "author=rowling".
     * @param fields Parameter which specifies the fields to get back from solr. Use the special value * to get all fields (although be prepared for a very large response!)
     * @returns A JSON response containing the search results returned from the solr query.
     */
    OpenLibrary.prototype.search = function (queryParam, fields, archive) {
        if (fields === void 0) { fields = ""; }
        if (archive === void 0) { archive = false; }
        return __awaiter(this, void 0, void 0, function () {
            var query, fieldStr, isFromArchive, args, qs, request, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = !queryParam.split("").includes("=") ? "q=" + queryParam.replace(/\s+/, "+") : queryParam;
                        fieldStr = fields ? "fields=" + fields : "";
                        isFromArchive = archive ? "availability" : "";
                        args = [query, fieldStr, isFromArchive];
                        qs = "";
                        args.forEach(function (arg) { return qs += arg + ","; });
                        qs.slice(0, -1);
                        request = this.searchApiUrl + ".json?" + qs;
                        return [4 /*yield*/, axios.get(request, this.requestConfig)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    return OpenLibrary;
}());
exports["default"] = OpenLibrary;
var openLibrary = new OpenLibrary();
// // https://openlibrary.org/authors/OL1394244A/works.json?limit=100
// openLibrary.getAuthorWorks("OL1394244A", 1).then(res => {
//     console.log(Object.keys(res), "RESUMESAKI");
//     console.log(res, "FOO");
//     // console.log(Object.keys(res["entries"][0]));
// });