const axios = require("axios").default;
import { GetWorksPageFileResponse, GetWorksPageGenericResponse, QueryParams, Suffix, BibKeys, RequestConfig, BookCovers, OpenLibResponse} from "./types";

/**
 * A class representing the Open Library Book API connections. Fetch data from 
 * any of the four book APIs provided by [Open Library](https://openlibrary.org/dev/docs/api/books).
 */
export default class OpenLibrary {
    baseUrl: string;
    bookApiUrl: string;
    coversApiUrl: string;
    requestConfig: RequestConfig;

    constructor() {
        this.baseUrl = "https://openlibrary.org";
        this.bookApiUrl = `${this.baseUrl}/api/books`;
        this.coversApiUrl = "https://covers.openlibrary.org";
        this.requestConfig = {
            baseUrl: this.baseUrl,
            headers: {
                'Accept': "text/html, text/plain, application/json, application/yaml, image/*",
                'Accept-Encoding': 'gzip, deflate, br',
            }
        };
    }

    async executeGetRequest (url: string , reqConfig: RequestConfig) {
        let response: GetWorksPageGenericResponse | GetWorksPageFileResponse;
        let redirectedHtml: string = "";

        try {
            response = await axios.get(url, reqConfig);
            return response.hasOwnProperty("data") ? response.data : response;
        } catch (e) {
            // todo: address this axios redirect hiccup
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

    /**
     * Get a book covers image URL from the Covers API.
     * @param {string} key The identifier type. Can be any one of ISBN, OCLC, LCCN, OLID and ID (case-insensitive)
     * @param {string} value The corresponding value for `key`.
     * @param {string} size The size of the book cover image. Can be one of S, M and L for small, medium and large respectively.
     * @returns {string} A book covers image URL.
    */
    async getBookCover(key: string, value: string | number, size: string) {
        let request: string = `${this.coversApiUrl}/b/${key.toLowerCase()}/${value}-${size}.jpg`;
        let response = await axios.get(request, this.requestConfig);
        return response && response["status"] == 200 ? response["request"]["res"]["responseUrl"] : response;
    }

    /**
     * Get a list of book cover image URLs from the Covers API.
     * @param {BooksCovers[]} coversObjList An array of book cover objects to return book covers for. (e.g. [{title: string, id: string | number, key: string, size: string},]
     * @returns {string[]} An array of book cover image URLs.
    */
    async getBookCovers(coversObjList: BookCovers[]) {
        let covers: Promise<any>[] = [];
        coversObjList.forEach(cover => {
            const { key, id, size } = cover;
            const response = this.getBookCover(key, id, size);
            covers.push(response);
        });
        return Promise.all(covers).then(c => {
            return c;
        });
    };

    /**
     * Get a Work page for a specific book identifier and or title. A Work is a logical collection of similar Editions.
     * @param {string} bookId A required parameter representing the book identifier.
     * @param {string} bookTitle Optional parameter which specifies the 'Work' (book) title.
     * @param {string} suffix Optional parameter which specifies the data representation of function result. ("json" | "yml")
     * @param {string} fullUrl Optional parameter which represents a complete and valid request URL to the 'Works' API.
     * @returns {OpenLibResponse} Returns a Work page in the specified data representation e.g. HTML, JSON, or YML.
     */
    async getWorksPage(bookId: string, bookTitle: string = "", suffix: Suffix = "", fullUrl: string="") {
        let request: string = bookTitle && (suffix == "" || !suffix) ? `${this.baseUrl}/works/${bookId}/${bookTitle}` : `${this.baseUrl}/works/${bookId}.${suffix}`;
        let response: OpenLibResponse = this.executeGetRequest(fullUrl == "" ? request : fullUrl, this.requestConfig);
        return response;
    }
    
    /**
     * An alternative way to get an 'Editions' page for a specific book identifier and or title.
     * @param {string} bookId Required parameter representing the book identifier.
     * @param {string} bookTitle Optional parameter which specifies the 'Work' (book) title.
     * @param {string} suffix Optional parameter which specifies the data representation of function result. ("json" | "yml")
     * @param {string} fullUrl Optional parameter which represents a complete and valid request URL to the 'Works' API.
     * @returns {OpenLibResponse} Returns a Work page in the specified data representation e.g. HTML, JSON, or YML.
     */
    async getIsbnPage(bookId: string, bookTitle: string = "", suffix: Suffix = "", fullUrl: string="") {
        let request: string = bookTitle && (suffix == "" || !suffix) ? `${this.baseUrl}/isbn/${bookId}` : `${this.baseUrl}/isbn/${bookId}.${suffix}`;
        let response: OpenLibResponse = this.executeGetRequest(request, this.requestConfig);
        return response;
    }

    /**
     * Fetch an 'Editions' page for a specific book based on identifier and or title.
     * @param {string} bookId Required parameter representing the book identifier.
     * @param {string} bookTitle Optional parameter which specifies the 'Edition' (book) title.
     * @param {string} suffix Optional parameter which specifies the data representation of function result. ("json" | "yml")
     * @param {string} fullUrl Optional parameter which represents a complete and valid request URL to the 'Editions' API.
     * @returns {OpenLibResponse} Returns a Work page in the specified data representation e.g. HTML, JSON, or YML.
     */
    async getEditionsPage(bookId: string, bookTitle: string = "", suffix: Suffix = "", fullUrl: string="") {
        let request: string = bookTitle && (suffix == "" || !suffix) ? `${this.baseUrl}/books/${bookId}/${bookTitle}` : `${this.baseUrl}/books/${bookId}.${suffix}`;
        let response: OpenLibResponse = this.executeGetRequest(request, this.requestConfig);
        return response;
    }

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
    async getBooksPage(bookId: string, bookTitle: string = "", suffix: Suffix = "", bibkeys: BibKeys = {"openLibraryIdType": "", "openLibraryId": 0}, format: string = "", callback: Function = function(){}, jscmd: string = "", fullUrl: string="") {
        let request: string = "";
        let bibKeysStr: string = "";
        let response: Promise<string | GetWorksPageFileResponse | GetWorksPageGenericResponse | undefined>;
        let queryParams: QueryParams = {
            bibkeys: bibkeys,
            format: format, // javascript by default
            callback: callback,
            jscmd: jscmd // viewapi by default
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

    // Authors API - todo (author image)
    async getAuthorsPage(authorId: string, suffix: Suffix = "json") {
        let request: string = `${this.baseUrl}/authors/${authorId}.${suffix}`;
        let response = this.executeGetRequest(request, this.requestConfig);
        return response;
    }

    async GetAuthorPhoto(key: string, value: string, size: string) {
        let request = `${this.coversApiUrl}/a/${key.toLowerCase()}/${value}-${size}.jpg`;
        let response = await axios.get(request, this.requestConfig);
        return response;
    }

    // Subjects API 
    async getSubjectsPage() {
        // todo
    }
}
