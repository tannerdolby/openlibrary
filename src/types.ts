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
    "openLibraryId": number;
};

export type RequestConfig = {
    baseUrl: string;
    headers: { 'Accept': string; 'Accept-Encoding': string };
}

type DateType = { type: string; value: string };

interface Authors {
    author: Object[];
    type: Object[];
}


export type BookCovers = {
    title: string;
    id: number | string;
    key: string;
    size: string;
}

export type OpenLibHTMLOrFileResponse = Promise<string | GetWorksPageFileResponse | Response | undefined>;

type DocObj = { 
    key: string;
    text: string[];
    type: string;
    name: string;
    alternate_names: string[];
    birth_date: string;
    top_work: string;
    work_count: number;
    top_subjects: string[];
    _version_: number;
}

export interface AuthorSearchJSONResposnse { 
    numFound: number;
    start: number;
    numFoundExact: boolean;
    docs: DocObj[];
    data: {};
}

type GetAuthorWorksAuthorsType = {
    type: {
        key: string;
    };
    author: {
        key: string;
    }
}

type TypeValuePair = { type: string; value: string};

type AuthorWorksEntry = {
    type: { key: string };
    title: string;
    authors: GetAuthorWorksAuthorsType[];
    covers: number[];
    key: string;
    latest_revision: number;
    revision: number;
    created: TypeValuePair;
    last_modified: TypeValuePair;
};

export interface GetAuthorWorksResponse {
    links: {
        self: string;
        author: string;
        next: string;
    };
    size: number;
    entries: AuthorWorksEntry[]
}

// todo: better define this OpenLibraryResponse type
export interface OpenLibraryResponse extends Response {
    data: any;
    request: {
        res: {
            responseUrl: string;
        }
    };
}

export type OpenLibraryIDTypes = "isbn" | "lccn" | "oclc" | "olid";

export interface SubjectsAPIQueryParams {
    details: boolean;
    ebooks: boolean;
    published_in: string;
    limit: number;
    offset: number;
}

interface SubjectsAPIWorksObj {
    key: string;
    title: string;
    edition_count: number;
    cover_id: number;
    cover_edition_key: string;
    subject: Array<any>;
    ia_collection: Array<any>;
    lendinglibrary: boolean;
    printdisabled: boolean;
    lending_edition: string;
    lending_identifier: string;
    authors: Array<any>;
    first_publish_year: null | number;
    ia: string;
    public_scan: boolean;
    has_fulltext: boolean;
    availability: Object
}

export interface SubjectsAPIResponse {
    key: string;
    name: string;
    subject_type: string;
    work_count: number;
    works: SubjectsAPIWorksObj[];
}

export type StringOrUndefined = string | undefined;
export type NumberOrUndefined = number | undefined;
export type BooleanOrUndefined = boolean | undefined;