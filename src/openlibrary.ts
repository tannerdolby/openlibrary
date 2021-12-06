const axios = require("axios").default;
import { 
    GetWorksPageFileResponse, 
    GetWorksPageGenericResponse, 
    QueryParams, 
    Suffix, 
    BibKeys, 
    RequestConfig, 
    BookCovers, 
    OpenLibHTMLOrFileResponse, 
    AuthorSearchJSONResposnse,
    GetAuthorWorksResponse,
    OpenLibraryResponse,
    OpenLibraryIDTypes
} from "./types";

/**
 * A class representing the Open Library API connections. Fetch data from 
 * the Open Library REST API and Open Library APIs outlined in the 
 * [Developer Center](https://openlibrary.org/dev/docs/api/).
 */
export default class OpenLibrary {
    baseUrl: string = "https://openlibrary.org";
    bookApiUrl: string = `${this.baseUrl}/api/books`;
    coversApiUrl: string = "https://covers.openlibrary.org";
    authorsApiUrl: string = "https://authors.openlibrary.org";
    searchApiUrl: string = `${this.baseUrl}/search`;
    subjectsApiUrl: string = `${this.baseUrl}/subjects`;
    requestConfig: RequestConfig = {
        baseUrl: this.baseUrl,
        headers: {
            'Accept': "text/html, text/plain, application/json, application/yaml, image/*",
            'Accept-Encoding': 'gzip, deflate, br',
        }
    };
    data: Object = {};

    // just a default constructor for now
    constructor() {}

    get(this: OpenLibrary, key: string) {
        let value;
        for (const prop in this) {
            if (prop === key) { value = Object.assign(this)[prop]; }
        }
        return value;
    }

    get payload(): Object {
        return this.data;
    }

    // Mainly for Books and Covers API calls
    async executeGetRequest (url: string , reqConfig: RequestConfig) {
        let response: GetWorksPageGenericResponse | GetWorksPageFileResponse;
        let redirectedHtml = "";

        try {
            response = await axios.get(url, reqConfig);
            return response.hasOwnProperty("data") ? response.data : response;
        } catch (e) {
            // todo: this works but feels hackish
            // address this axios redirect hiccup
            if (e.response.hasOwnProperty("data") && e.response.data) {
                redirectedHtml = e.response.data;
            } else {
                console.error({
                    "message": `Unable to fetch HTML page intially. Axios might not have handled a redirect or the Open Library could be down.`,
                    "isAxiosError": e.isAxiosError,
                    "statusCode": e.response.status,
                    "responseData": e.response.data
                });
            }
        }
        if (redirectedHtml && redirectedHtml != "") {
            return redirectedHtml;
        }
    }

    // ----- Covers API ------
    /**
     * Get a book covers image URL from the Covers API.
     * @param {string} key The identifier type. Can be any one of ISBN, OCLC, LCCN, OLID and ID (case-insensitive)
     * @param {string} value The corresponding value for `key`.
     * @param {string} size The size of the book cover image. Can be one of S, M and L for small, medium and large respectively.
     * @returns {string} A book covers image URL.
    */
    async getBookCover(key: string, value: string | number, size: string) {
        let request = `${this.coversApiUrl}/b/${key.toLowerCase()}/${value}-${size}.jpg`;
        let response: OpenLibraryResponse = await axios.get(request, this.requestConfig);
        let url = response.request.res.responseUrl;
        this.data = url;
        return response.status == 200 ? url : response;
    }

    /**
     * Get a list of book cover image URLs from the Covers API.
     * @param {BooksCovers[]} coversObjList An array of book cover objects to return book covers for. (e.g. [{title: string, id: string | number, key: string, size: string},]
     * @returns {string[]} An array of book cover image URLs.
    */
    async getBookCovers(coversObjList: BookCovers[]) {
        let covers: Promise<string | OpenLibraryResponse>[] = [];
        coversObjList.forEach(cover => {
            const { key, id, size } = cover;
            const response = this.getBookCover(key, id, size);
            covers.push(response);
        });
        return Promise.all(covers).then(c => {
            this.data = c;
            return c;
        });
    };
    // ---- Covers API End --------

    /**
     * Get a Work page for a specific book identifier and or title. A Work is a logical collection of similar Editions.
     * @param {string} bookId A required parameter representing the book identifier.
     * @param {string} bookTitle Optional parameter which specifies the 'Work' (book) title.
     * @param {string} suffix Optional parameter which specifies the data representation of function result. ("json" | "yml")
     * @param {string} fullUrl Optional parameter which represents a complete and valid request URL to the 'Works' API.
     * @returns {OpenLibHTMLOrFileResponse} Returns a Work page in the specified data representation e.g. HTML, JSON, or YML.
     */
    async getWorksPage(bookId: string, bookTitle: string = "", suffix: Suffix = "", fullUrl: string="") {
        let request = bookTitle && (suffix == "" || !suffix) ? 
            `${this.baseUrl}/works/${bookId}/${bookTitle}` : `${this.baseUrl}/works/${bookId}.${suffix}`;
        let response: OpenLibHTMLOrFileResponse = this.executeGetRequest(
            fullUrl == "" ? request : fullUrl, this.requestConfig
        );
        this.data = response;
        return response;
    }
    
    /**
     * An alternative way to get an 'Editions' page for a specific book identifier and or title.
     * @param {string} bookId Required parameter representing the book identifier.
     * @param {string} bookTitle Optional parameter which specifies the 'Work' (book) title.
     * @param {string} suffix Optional parameter which specifies the data representation of function result. ("json" | "yml")
     * @param {string} fullUrl Optional parameter which represents a complete and valid request URL to the 'Works' API.
     * @returns {OpenLibHTMLOrFileResponse} Returns a Work page in the specified data representation e.g. HTML, JSON, or YML.
     */
    async getISBNPage(bookId: string, bookTitle: string = "", suffix: Suffix = "", fullUrl: string="") {
        let request= bookTitle && (suffix == "" || !suffix) ? 
            `${this.baseUrl}/isbn/${bookId}` : `${this.baseUrl}/isbn/${bookId}.${suffix}`;
        let response: OpenLibHTMLOrFileResponse = this.executeGetRequest(request, this.requestConfig);
        this.data = response;
        return response;
    }

    /**
     * Fetch an 'Editions' page for a specific book based on identifier and or title.
     * @param {string} bookId Required parameter representing the book identifier.
     * @param {string} bookTitle Optional parameter which specifies the 'Edition' (book) title.
     * @param {string} suffix Optional parameter which specifies the data representation of function result. ("json" | "yml")
     * @param {string} fullUrl Optional parameter which represents a complete and valid request URL to the 'Editions' API.
     * @returns {OpenLibHTMLOrFileResponse} Returns a Work page in the specified data representation e.g. HTML, JSON, or YML.
     */
    async getEditionsPage(bookId: string, bookTitle: string = "", suffix: Suffix = "", fullUrl: string="") {
        let request = bookTitle && (suffix == "" || !suffix) ? 
            `${this.baseUrl}/books/${bookId}/${bookTitle}` : `${this.baseUrl}/books/${bookId}.${suffix}`;
        let response: OpenLibHTMLOrFileResponse = this.executeGetRequest(request, this.requestConfig);
        this.data = response;
        return response;
    }

    // todo: finish functionality for Books API
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
    async getBooksPage(bookId: string, bookTitle: string = "", suffix: Suffix = "", bibkeys: BibKeys = {"openLibraryIdType": "", "openLibraryId": 0}, format: string = "javascript", callback: Function = function(){}, jscmd: string = "viewapi", fullUrl: string="") {
        let request = "";
        let bibKeysStr = "";
        let response: OpenLibHTMLOrFileResponse;
        let queryParams: QueryParams = {
            bibkeys: bibkeys,
            format: format,
            callback: callback,
            jscmd: jscmd
        };

        if (bibkeys) {
            if (bibkeys instanceof Object && bibkeys.constructor == Object) {
                for (const idType in bibkeys) {
                    bibKeysStr+= `${idType}:${bibkeys["openLibraryId"]},`;
                }
            } else if (bibkeys instanceof Array && bibkeys.constructor == Array) {
                bibkeys.forEach(bibkey => {
                    bibKeysStr += `${bibkey},`;
                });
            }
            bibKeysStr.slice(0, -1);
        }
        // todo
        for (const field in queryParams) {
            // counter += 1;
            // if (counter == 1) {
            //     request = `${this.bookApiUrl}?${bibKeysStr}`;
            // } else {
            //     request += `&${queryParams[field]}`;
            // }
            
        }
        request = bookTitle && (suffix == "" || suffix) ? `${this.baseUrl}/books/${bookId}/${bookTitle}` : `${this.baseUrl}/books/${bookId}.${suffix}`;
        response = this.executeGetRequest(request, this.requestConfig);
        return response;
    }
    // ----- END BOOKS APIs -----

    // ----------------- AUTHORS APIs -----------------
    /**
     * Fetch complete data for an individual author by identifier and gets their Author page as ".json|.yml|.rdf". 
     * @param authorId Required parameter which specifies the identifier key for an author.
     * @param suffix Optional parameter which specifies the 
     */
    async getAuthorsPage(authorId: string, suffix: Suffix = "json") {
        let request = `${this.baseUrl}/authors/${authorId}.${suffix}`;
        let response: OpenLibHTMLOrFileResponse = this.executeGetRequest(request, this.requestConfig);
        this.data = response;
        return response;
    }

    /**
     * Get an author photo using OLID or ID.
     * @param {string} key The identifier type. Can be any one of ISBN, OCLC, LCCN, OLID and ID (case-insensitive)
     * @param {string} value The corresponding value for `key`.
     * @param {string} size The size of the book cover image. Can be one of S, M and L for small, medium and large respectively.
     */
    async getAuthorPhoto(key: string, value: string, size: string) {
        let request = `${this.coversApiUrl}/a/${key.toLowerCase()}/${value}-${size}.jpg`;
        let response: OpenLibraryResponse = await axios.get(request, this.requestConfig);
        let url = response.request.res.responseUrl;
        this.data = url;
        return response.status == 200 ? url : response;
    }

    /**
     * Search for an author by specifying a query parameter such as name.
     * @param {string} query The query parameter string to search for an author. Can be a single query for name e.g. "twain" or multiple querys "twain&limit=2"
     * @returns An authors information as JSON if found. 
     */
    async searchForAuthors(query: string) {
        let request = `${this.searchApiUrl}/authors.json?q=${query.replace(/\s+/, "%20")}`;
        let response: OpenLibraryResponse = await axios.get(request, this.requestConfig);
        this.data = response.data;
        return response.status == 200 ? response.data : response;
    }

    /**
     * 
     * @param authorId The identifier for an author. (e.g. OL23919A)
     * @param limit The number of works to return for an author. Default is 50.
     * @param offset The number of works to offset for pagination. Default is 50.
     * @returns {JSON} Returns the works for an author as JSON.
     */
    async getAuthorWorks(authorId: string, limit: number = 0, offset: number = 0) {
        let request = `${this.baseUrl}/authors/${authorId}/works.json`;
        if (limit != 0) {
            request += `?limit=${limit}`;
        } else if (offset != 0) {
            request += `?offset=${offset}`;
        }
        let response: OpenLibraryResponse = await axios.get(request, this.requestConfig);
        this.data = response.data;
        return response.status == 200 ? response.data : response;
    }

    // ----------------- END AUTHORS API -----------------

    // -------- SUBJECTS API  ------------
    /**
     * Get works of a subject. Note: This API is experimental and may change in the future.
     * @param subject Parameter which specifies the subject name to retrieve details for.
     * @param queryParams Query parameters to customize returned subject details.
     */
    async getSubjectsPage(subject: string, queryParams: string | object) {
        let request = `${this.subjectsApiUrl}/${subject}.json`;
        if (queryParams && typeof queryParams == "string") {
            request += queryParams;
        } else if (queryParams && typeof queryParams == "object") {
            for (const field in queryParams) {
                console.log(field, "IM A FIELD");
            }
        }
        let response: OpenLibraryResponse =  await axios.get(request, this.requestConfig);
        this.data = response.data;
        return response["status"] === 200 ? response.data : response;
    }

    // ---- SEARCH API ---- 
    /**
     * Use the Search API to specify a solr query and return the results found.
     * @param queryParam Parameter which specifies the [solr query](https://openlibrary.org/search/howto), e.g. "twain" would result in q=twain and a name=value pair would persist in the URL as "author=rowling".
     * @param fields Parameter which specifies the fields to get back from solr. Use the special value * to get all fields (although be prepared for a very large response!)
     * @returns A JSON response containing the search results returned from the solr query.
     */
    async search(queryParam: string, fields: string = "", archive: boolean = false) {
        // http://openlibrary.org/search.json?q=the+lord+of+the+rings&page=2
        let query = !queryParam.split("").includes("=")  ? `q=${queryParam.replace(/\s+/, "+")}` : queryParam;
        let fieldStr = fields ? `fields=${fields}` : "";
        let isFromArchive = archive ? "availability" : "";
        let args: string[] = [query, fieldStr, isFromArchive];
        let qs = "";
        args.forEach(arg => qs += `${arg},`);
        qs.slice(0, -1);
        let request = `${this.searchApiUrl}.json?${qs}`;
        let response: OpenLibraryResponse = await axios.get(request, this.requestConfig);
        let data = response.data;
        this.data = data;
        return response.status == 200 ? data : response;
    }

    // ---- END SEARCH API -----

    // --------- Partner API (Formerly the Read API) --------
    /**
     * Request information about readable versions of a single book edition.
     * @param idType The Open Library identifier type. Can be 'isbn', 'lccn', 'oclc' or 'olid'.
     * @param {string|number} idValue The actual numeric Open identifier.
     * @returns The JSON hash containing readable versions of a single book.
     */
    async getReadableVersion(idType: OpenLibraryIDTypes, idValue: string | number) {
        if (typeof idValue == "number") idValue = `${idValue}`;
        let request = `https://openlibrary.org/api/volumes/brief/${idType}/${idValue}.json`;
        let response: OpenLibraryResponse = await axios.get(request, this.requestConfig);
        let data = response.data;
        this.data = data;
        return response.status == 200 ? data : response;

    }

    /**
     * Request information about readable versions of mulitple books. This is the multi request format.
     * @param requestList A <request-list> is a list of <request>s, separated by '|'. [Open Library Docs](https://openlibrary.org/dev/docs/api/read)
     * @returns The return value is a hash, with each successful <request> as keys. Expect A JSON response containing the readable versions for the book identifiers supplied in the request list.
     */
    async getReadableVersions(requestList: string) {
        // todo: allow for an array of <request>s to be taken as input also
        let request = `http://openlibrary.org/api/volumes/brief/json/${requestList}`;
        let response: OpenLibraryResponse = await axios.get(request, this.requestConfig);
        let data = response.data;
        this.data = data;
        return response.status == 200 ? data : response;
    }
}

// const openLib = new OpenLibrary();
// console.log(openLib.get("bookApiUrl"));
// openLib.getBookCover("id", 6564962, "L").then(res => {
//     console.log(res, "RESUMESAAKI");
//     console.log(openLib.data, "DATA");
// });

