import { ClientRequest, IncomingMessage, Agent } from "http";
import { Writable } from "stream";

export interface GetWorksPageFileResponse {
    description: string;
    title: string;
    covers: number[];
    subject_places: string[];
    subjects: string[];
    subject_people: string[];
    key: string;
    authors: Authors[];
    subject_times: string[];
    type: {
        key: string;
    };
    latest_revision: number;
    revision: number;
    created: DateType;
    last_modified: DateType;
    data: GetWorksPageFileResponse | string;
}

interface QueryParamsObjIndexes {
    [key: string]: BibKeys | string[] | string | Function;
}

export interface QueryParams extends QueryParamsObjIndexes {
    bibkeys: BibKeys | string[];
    format: string;
    callback: Function;
    jscmd: string;
}

export type Suffix = "json" | "yml" | "rdf" | "";

interface BibKeysObjIndexes {
    [key: string]: string | number;
}

export interface BibKeys extends BibKeysObjIndexes {
    "openLibraryIdType": string;
    "openLibraryId": number
};

export type RequestConfig = {
    baseUrl: string;
    headers: { 'Accept': string; 'Accept-Encoding': string };
}

type DateType = { type: string, value: string };

interface Authors {
    author: Object[];
    type: Object[];
}

export interface GetWorksPageGenericResponse {
    status: number,
    statusText: string;
    headers: {
        server: string;
        date: string;
        'content-type': string;
        'transfer-encoding': string;
        connection: string;
        "x-ol-stats": string;
        vary: string;
        "referrer-policy": string;
    };
    config: {
        transitional: {
            silentJSONParsing: boolean,
            forcedJSONParsing: boolean,
            clarifyTimeoutError: boolean
        },
        adapter: [Function],
        transformRequest: [ [Function] ],
        transformResponse: [ [Function] ],
        timeout: number,
        xsrfCookieName: string,
        xsrfHeaderName: string,
        maxContentLength: number,
        maxBodyLength: number,
        validateStatus: [Function],
        headers: {
            Accept: string;
            'Accept-Encoding': string;
            'User-Agent': string;
        },
        baseUrl: string;
        method: string;
        url: string;
        data: any;
    };
    request: ClientRequest;
    _header: string;
    _KeepAliveTImeout: number;
    _onPendingData: Function;
    agent: Agent;
    socketPath: string,
    method: string,
    maxHeaderSize: number,
    insecureHTTPParser: boolean,
    path: string;
    _ended: boolean;
    _res: IncomingMessage;
    aborted: boolean;
    timeoutCb: null;
    upgradeOrConnect: boolean;
    parser: null;
    maxHeadersCount: null;
    reusedSocket: boolean;
    host: string;
    protocol: string;
    _redirectable: Writable;
    data: GetWorksPageFileResponse | string;
}

export type BookCovers = {
    title: string;
    id: number | string;
    key: string;
    size: string;
}

export type OpenLibResponse = Promise<string | GetWorksPageFileResponse | GetWorksPageGenericResponse | undefined>;

type DocObj = { 
    key: string,
    text: string[],
    type: string,
    name: string,
    alternate_names: string[],
    birth_date: string,
    top_work: string,
    work_count: number,
    top_subjects: string[],
    _version_: number 
}

export interface AuthorSearchJSONResposnse { 
    numFound: number,
    start: number,
    numFoundExact: boolean,
    docs: DocObj[]
}

type GetAuthorWorksAuthorsType = {
    type: {
        key: string
    },
    author: {
        key: string
    }
}

type TypeValuePair = { type: string, value: string};

type AuthorWorksEntry = {
    type: { key: string },
    title: string,
    authors: GetAuthorWorksAuthorsType[],
    covers: number[],
    key: string,
    latest_revision: number,
    revision: number;
    created: TypeValuePair
    last_modified: TypeValuePair
};

export interface GetAuthorWorksResponse {
    links: {
        self: string,
        author: string,
        next: string
    },
    size: number,
    entries: AuthorWorksEntry[]
}

// todo add | for other types of Open Library response data
export interface OpenLibraryResponse extends Response {
    data: {}
}

export type OpenLibraryIDTypes = "isbn" | "lccn" | "oclc" | "olid";