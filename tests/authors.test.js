const OpenLibrary = require("../src/openlibrary");
const yaml = require("js-yaml");

let openLibrary = new OpenLibrary["default"]();

test("A request to the 'Authors' API for a given author ID returns expected JSON output", () => {
    let results = openLibrary.getAuthorsPage("OL23919A");
    results.then(res => {
        expect(res["alternate_names"].length).toBeGreaterThan(0);
        expect(res["wikipedia"]).toEqual("http://en.wikipedia.org/wiki/J._K._Rowling");
        expect(res["links"]).toEqual(
            [{ url: 'http://www.jkrowling.com/', type: { key: '/type/link' }, title: 'Official Site' }]
        );
        expect(res["birth_date"]).toEqual("31 July 1965");
        expect(res["name"]).toBe("J. K. Rowling");
    });
});

test("A request to the 'Authors' API for a given author ID returns expected YAML output", () => {
    let results = openLibrary.getAuthorsPage("OL23919A", "yml");
    results.then(res => {
        let yamlObj = yaml.load(res, "utf-8");
        expect(yamlObj["alternate_names"].length).toBeGreaterThan(0);
        expect(yamlObj["wikipedia"]).toEqual("http://en.wikipedia.org/wiki/J._K._Rowling");
        expect(yamlObj["links"]).toEqual(
            [{ url: 'http://www.jkrowling.com/', type: { key: '/type/link' }, title: 'Official Site' }]
        );
        expect(yamlObj["birth_date"]).toEqual("31 July 1965");
        expect(yamlObj["name"]).toBe("J. K. Rowling");
    });
});

test("A request to the 'Authors' API for a given Author ID returns expect .rdf output", () => {
    let response = openLibrary.getAuthorsPage("OL23919A", "rdf");
    response.then(res => {
        expect(res.trim().slice(437, 551)).toBe(`<foaf:Person rdf:about="http://openlibrary.org/authors/OL23919A">
            <foaf:name>J. K. Rowling</foaf:name>`);
    });
});

test("A request to the 'Covers' API to get an Author photo from OLID returns expect image URL string", () => {
    let response = openLibrary.getAuthorPhoto("olid", "OL229501A", "S");
    response.then(res => {
        expect(res).toEqual("https://covers.openlibrary.org/a/olid/OL229501A-S.jpg")
    });
});

test("A request to the 'Authors' API to get all of an Authors works returns expected json output", () => {
    let response = openLibrary.getAuthorWorks("OL1394244A", 1);
    response.then(res => {
        expect(res.hasOwnProperty("links")).toBe(true);
        expect(res["entries"].length).toBeGreaterThan(0);
    });
});