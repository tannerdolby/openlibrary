const axios = require("axios").default;
import { GetWorksPageFileResponse, GetWorksPageGenericResponse, QueryParams, Suffix, BibKeys, RequestConfig, BookCovers, OpenLibResponse} from "./types";

/**
 * A class representing the Open Library Book API connections. Fetch data from 
 * any of the four book APIs provided by [Open Library](https://openlibrary.org/dev/docs/api/books).
 */
export default class OpenLibrary {
    baseUrl: string;
    bookApiUrl: string;
    requestConfig: RequestConfig;

    constructor() {
        this.baseUrl = "https://openlibrary.org";
        this.bookApiUrl = `${this.baseUrl}/api/books`;
        this.requestConfig = {
            baseUrl: this.baseUrl,
            headers: {
                'Accept': "text/html, text/plain, application/json, application/yaml",
                'Accept-Encoding': 'gzip, deflate, br',
            }
        };
    }

    async executeGetRequest (url: string , suffix: string = "", reqConfig: RequestConfig) {
        let htmlResponse: GetWorksPageGenericResponse;
        let fileContentResponse: GetWorksPageFileResponse;

        if (suffix != "") {
            try {
                fileContentResponse = await axios.get(url, reqConfig);
                return fileContentResponse.hasOwnProperty("data") ? fileContentResponse.data : fileContentResponse;
            } catch (e) {
                console.error(e);
            }
        } else {
            try {
                htmlResponse = await axios.get(url, reqConfig);
                return htmlResponse.hasOwnProperty("data") ? htmlResponse.data : htmlResponse;
            } catch (e) {
                console.error(e);
            }
        }
    }

    // Covers API
    /**
     * Get a single book covers image URL.
     * @param key The identifier type. Can be any one of ISBN, OCLC, LCCN, OLID and ID (case-insensitive)
     * @param value The corresponding value for `key`.
     * @param size The size of the book cover image. Can be one of S, M and L for small, medium and large respectively.
    */
    async getBookCover(key: string, value: string | number, size: string) {
        let request: string = `${this.baseUrl}/b/${key}/${value}-${size}.jpg`;
        let response = await axios.get(request, this.requestConfig);
        return response;
    }

    /**
     * Get a list of book covers image URLs.
     * @param coversObjList An array of book cover objects to return book covers for. (e.g. [{title: string, id: string | number, key: string, size: string},]
     * @returns An array of book cover image URLs.
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

    /* Books APIs (Works, ISBN, Editions pages and configurable Books API) */
    async getWorksPage(bookId: string, bookTitle: string = "", suffix: Suffix = "", fullUrl: string="") {
        let request: string = bookTitle && (suffix == "" || suffix) ? `${this.baseUrl}/works/${bookId}/${bookTitle}` : `${this.baseUrl}/works/${bookId}.${suffix}`;
        let response: OpenLibResponse = this.executeGetRequest(fullUrl == "" ? request : fullUrl, suffix, this.requestConfig);
        return response;
    }
    
    async getIsbnPage(bookId: string, bookTitle: string = "", suffix: Suffix = "", fullUrl: string="") {
        let request: string = bookTitle && (suffix == "" || suffix) ? `${this.baseUrl}/isbn/${bookId}` : `${this.baseUrl}/isbn/${bookId}.${suffix}`;
        let response: OpenLibResponse = this.executeGetRequest(request, suffix, this.requestConfig);
        return response;
    }

    async getEditionsPage(bookId: string, bookTitle: string = "", suffix: Suffix = "", fullUrl: string="") {
        let request: string = bookTitle && (suffix == "" || suffix) ? `${this.baseUrl}/books/${bookId}/${bookTitle}` : `${this.baseUrl}/books/${bookId}.${suffix}`;
        let response: Promise<string | GetWorksPageFileResponse | GetWorksPageGenericResponse | undefined> = this.executeGetRequest(request, suffix, this.requestConfig);
        return response;
    }

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

        for (const field in queryParams) {
            // counter += 1;
            // if (counter == 1) {
            //     request = `${this.bookApiUrl}?${bibKeysStr}`;
            // } else {
            //     request += `&${queryParams[field]}`;
            // }
            
        }

        request = bookTitle && (suffix == "" || suffix) ? `${this.baseUrl}/books/${bookId}/${bookTitle}` : `${this.baseUrl}/books/${bookId}.${suffix}`;
        response = this.executeGetRequest(request, suffix, this.requestConfig);
        return response;
    }

    // Authors API
    async getAuthorsPage (authorId: string, suffix: string = "json") {
        // todo
        let request: string = `${this.baseUrl}/authors/${authorId}.${suffix}`;
        let response = this.executeGetRequest(request, suffix, this.requestConfig);
        return response;
    }

    // Subjects API
    async getSubjectsPage() {
        // todo
    }
}

const openLib = new OpenLibrary();
