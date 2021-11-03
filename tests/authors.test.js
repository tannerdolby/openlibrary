const OpenLibrary = require("../src/openlibrary");
const yaml = require("js-yaml");

let openLibrary = new OpenLibrary["default"]();

test("A request to the 'Authors' API for a given author ID returns expected JSON output", () => {
    let results = openLibrary.getAuthorsPage("OL23919A");
    results.then(res => {
        expect(res["alternate_names"]).toEqual([ 'Joanne Rowling',
        'Joanne K. Rowling',
        'J.K.Rowling',
        'Rowling, J.K.',
        'J. Rowling',
        'Rowling, Joanne K.',
        'Jo Murray',
        'J K Rowling',
        'Rowling J.K.',
        'J.K. Rowling (author)',
        'Rowling Joanne',
        'J.K. Rowling',
        'J.K. ROWLING',
        'Rowling J K',
        'J K ROWLING',
        'Newt Scamander',
        'JOANNE K. ROWLING',
        'Kennilworthy Whisp',
        'JK Rowling',
        'JK Rowlings',
        'jk rowling',
        'R.K Rowling',
        'J. K Rowling',
        'J.K Rowling',
        'Rowling J. K.',
        'J. K. Rowling (Auteur)',
        'J.k. Rowling',
        'Rowling, J. K.',
        'ROWLING J.K. -',
        'J. K. ROWLING',
        'Rowling,J.K.',
        'J. K. Rowling',
        'Robert Galbraith',
        'Robert Galbraith (J.K. Rowling)' ]);
        expect(res["wikipedia"]).toEqual("http://en.wikipedia.org/wiki/J._K._Rowling");
        expect(res["bio"]["type"]).toEqual("/type/text")
        expect(res["bio"]["value"]).toEqual('Joanne "Jo" Murray, OBE (née Rowling), better known under the pen name J. K. Rowling, is a British author best known as the creator of the Harry Potter fantasy series, the idea for which was conceived whilst on a train trip from Manchester to London in 1990. The Potter books have gained worldwide attention, won multiple awards, sold more than 400 million copies, and been the basis for a popular series of films.')
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
        expect(yamlObj["alternate_names"]).toEqual([ 'Joanne Rowling',
        'Joanne K. Rowling',
        'J.K.Rowling',
        'Rowling, J.K.',
        'J. Rowling',
        'Rowling, Joanne K.',
        'Jo Murray',
        'J K Rowling',
        'Rowling J.K.',
        'J.K. Rowling (author)',
        'Rowling Joanne',
        'J.K. Rowling',
        'J.K. ROWLING',
        'Rowling J K',
        'J K ROWLING',
        'Newt Scamander',
        'JOANNE K. ROWLING',
        'Kennilworthy Whisp',
        'JK Rowling',
        'JK Rowlings',
        'jk rowling',
        'R.K Rowling',
        'J. K Rowling',
        'J.K Rowling',
        'Rowling J. K.',
        'J. K. Rowling (Auteur)',
        'J.k. Rowling',
        'Rowling, J. K.',
        'ROWLING J.K. -',
        'J. K. ROWLING',
        'Rowling,J.K.',
        'J. K. Rowling',
        'Robert Galbraith',
        'Robert Galbraith (J.K. Rowling)' ]);
        expect(yamlObj["wikipedia"]).toEqual("http://en.wikipedia.org/wiki/J._K._Rowling");
        expect(yamlObj["bio"]["type"]).toEqual("/type/text")
        expect(yamlObj["bio"]["value"]).toEqual('Joanne "Jo" Murray, OBE (née Rowling), better known under the pen name J. K. Rowling, is a British author best known as the creator of the Harry Potter fantasy series, the idea for which was conceived whilst on a train trip from Manchester to London in 1990. The Potter books have gained worldwide attention, won multiple awards, sold more than 400 million copies, and been the basis for a popular series of films.')
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
        // console.log(res.trim().slice(437, 555), "FOO");
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
    response.then((res) => {
        expect(res["entries"][0]["title"]).toEqual("Surviving Tomorrow");
    });
});