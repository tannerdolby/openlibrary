const OpenLibrary = require("../src/openlibrary");
const yaml = require("js-yaml");
const cheerio = require("cheerio");

let openLibrary = new OpenLibrary["default"]();

test("A request to the 'Works' API for a given book ID returns expected .json output", () => {
    let result = openLibrary.getWorksPage("OL45883W", "", "json");
    result.then(res => {
        expect(res["key"]).toEqual("/works/OL45883W");
        expect(res["title"]).toBe("Fantastic Mr. Fox");
        expect(res["description"]).toEqual('The main character of Fantastic Mr. Fox is an extremely clever anthropomorphized fox named Mr. Fox. He lives with his wife and four little foxes. In order to feed his family, he steals food from the cruel, brutish farmers named Boggis, Bunce, and Bean every night.\r\n' +
        '\r\n' +
        "Finally tired of being constantly outwitted by Mr. Fox, the farmers attempt to capture and kill him. The foxes escape in time by burrowing deep into the ground. The farmers decide to wait outside the hole for the foxes to emerge. Unable to leave the hole and steal food, Mr. Fox and his family begin to starve. Mr. Fox devises a plan to steal food from the farmers by tunneling into the ground and borrowing into the farmer's houses.\r\n" +
        '\r\n' +
        'Aided by a friendly Badger, the animals bring the stolen food back and Mrs. Fox prepares a great celebratory banquet attended by the other starving animals and their families. Mr. Fox invites all the animals to live with him underground and says that he will provide food for them daily thanks to his underground passages. All the animals live happily and safely, while the farmers remain waiting outside in vain for Mr. Fox to show up.')
        expect(res["covers"].length).toBeGreaterThan(0);
        expect(res["subjects"]).toEqual([
            'Animals',
            'Hunger',
            'Open Library Staff Picks',
            'Juvenile fiction',
            "Children's stories, English",
            'Foxes',
            'Fiction',
            'Zorros',
            'Ficción juvenil',
            'Tunnels',
            'Interviews',
            'Farmers',
            "Children's stories",
            'Rats',
            'Welsh Authors',
            'English Authors',
            'Thieves',
            'Tricksters',
            'Badgers',
            "Children's fiction",
            'Foxes, fiction',
            'Underground',
            'Renards',
            'Romans, nouvelles, etc. pour la jeunesse',
            "Children's literature"
        ]);
        expect(res["subject_people"]).toEqual([ 'Bean', 'Boggis', 'Bunce', 'Mr Fox' ]);
        expect(res["subject_times"]).toEqual([ '20th Century' ]);
    });
});

test("A request to the 'Works' API for a given book ID returns expected .yml output", () => {
    let result = openLibrary.getWorksPage("OL45883W", "", "yml");
    result.then(res => {
        let yamlObj = yaml.load(res, "utf-8");
        expect(yamlObj["key"]).toEqual("/works/OL45883W");
        expect(yamlObj["title"]).toBe("Fantastic Mr. Fox");
        expect(yamlObj["description"]).toEqual('The main character of Fantastic Mr. Fox is an extremely clever anthropomorphized fox named Mr. Fox. He lives with his wife and four little foxes. In order to feed his family, he steals food from the cruel, brutish farmers named Boggis, Bunce, and Bean every night.\r\n' +
        '\r\n' +
        "Finally tired of being constantly outwitted by Mr. Fox, the farmers attempt to capture and kill him. The foxes escape in time by burrowing deep into the ground. The farmers decide to wait outside the hole for the foxes to emerge. Unable to leave the hole and steal food, Mr. Fox and his family begin to starve. Mr. Fox devises a plan to steal food from the farmers by tunneling into the ground and borrowing into the farmer's houses.\r\n" +
        '\r\n' +
        'Aided by a friendly Badger, the animals bring the stolen food back and Mrs. Fox prepares a great celebratory banquet attended by the other starving animals and their families. Mr. Fox invites all the animals to live with him underground and says that he will provide food for them daily thanks to his underground passages. All the animals live happily and safely, while the farmers remain waiting outside in vain for Mr. Fox to show up.')
        expect(yamlObj["covers"].length).toBeGreaterThan(0);
        expect(yamlObj["subjects"]).toEqual([
            'Animals',
            'Hunger',
            'Open Library Staff Picks',
            'Juvenile fiction',
            "Children's stories, English",
            'Foxes',
            'Fiction',
            'Zorros',
            'Ficción juvenil',
            'Tunnels',
            'Interviews',
            'Farmers',
            "Children's stories",
            'Rats',
            'Welsh Authors',
            'English Authors',
            'Thieves',
            'Tricksters',
            'Badgers',
            "Children's fiction",
            'Foxes, fiction',
            'Underground',
            'Renards',
            'Romans, nouvelles, etc. pour la jeunesse',
            "Children's literature"
        ]);
        expect(yamlObj["subject_people"]).toEqual([ 'Bean', 'Boggis', 'Bunce', 'Mr Fox' ]);
        expect(yamlObj["subject_times"]).toEqual([ '20th Century' ]);
    });
});

test("A request to the 'Works' API for a given book ID and title returns expected HTML output", () => {
    let result = openLibrary.getWorksPage("OL45883W", "Fantastic Mr. Fox");
    let titles = [
        "fantastic mr fox (3030 edition) | Open Library",
        "Fantastic Mr. Fox (1970 edition) | Open Library",
        "Fantastic Mr. Fox",
        "fantastic mr fox"
    ];
    result.then(res => {
        const $ = cheerio.load(res);
        expect(titles.includes($("title").text())).toBe(true);
        expect(titles.includes($("h1.work-title").text())).toBe(true);
        expect($("h2.edition-byline").text()).toBe("by Roald Dahl");
    });
});

test("A request to the 'ISBN' API for a given book returns expected .json output", () => {
    let results = openLibrary.getISBNPage("9780140328721", "", "json");
    results.then(res => {
        expect(res["publishers"]).toEqual([ 'Puffin' ]);
        expect(res["number_of_pages"]).toBe(96);
        expect(res["isbn_10"]).toEqual([ '0140328726' ]);
        expect(res["covers"]).toEqual([ 8739161 ]);
        expect(res["key"]).toEqual('/books/OL7353617M');
        expect(res["authors"]).toEqual([ { key: '/authors/OL34184A' } ]);
        expect(res["ocaid"]).toEqual('fantasticmrfoxpu00roal');
        expect(res["title"]).toBe('Fantastic Mr. Fox');
        expect(res["publish_date"]).toBe('October 1, 1988');
    });
});

test("A request to the 'ISBN' API for a given book returns expected .yml output", () => {
    let results = openLibrary.getISBNPage("9780140328721", "", "yml");
    results.then(res => {
        let yamlObj = yaml.load(res, "utf-8");
        expect(yamlObj["publishers"]).toEqual([ 'Puffin' ]);
        expect(yamlObj["number_of_pages"]).toBe(96);
        expect(yamlObj["isbn_10"]).toEqual([ 140328726 ]);
        expect(yamlObj["covers"]).toEqual([ 8739161 ]);
        expect(yamlObj["key"]).toEqual('/books/OL7353617M');
        expect(yamlObj["authors"]).toEqual([ { key: '/authors/OL34184A' } ]);
        expect(yamlObj["ocaid"]).toEqual('fantasticmrfoxpu00roal');
        expect(yamlObj["title"]).toBe('Fantastic Mr. Fox');
        expect(yamlObj["publish_date"]).toBe('October 1, 1988');
    });
});

test ("A request to the 'ISBN' API for a given book ID returns failed redirect expected HTML output", () => {
    let results = openLibrary.getISBNPage("9780140328721", "");
    results.then(res => {
        const $ = cheerio.load(res);
        expect($("title").text()).toBe("/isbn/9780140328721. is not found | Open Library");
    });
});

test("A request to the 'Books' (Editions) API for a given book returns expected .yml output", () => {
    let results = openLibrary.getEditionsPage("OL7353617M", "", "yml");
    results.then(res => {
        let yamlObj = yaml.load(res, "utf-8");
        expect(yamlObj["publishers"]).toEqual([ 'Puffin' ]);
        expect(yamlObj["number_of_pages"]).toBe(96);
        expect(yamlObj["isbn_10"]).toEqual([ 140328726 ]);
        expect(yamlObj["covers"]).toEqual([ 8739161 ]);
        expect(yamlObj["key"]).toEqual('/books/OL7353617M');
        expect(yamlObj["authors"]).toEqual([ { key: '/authors/OL34184A' } ]);
        expect(yamlObj["ocaid"]).toEqual('fantasticmrfoxpu00roal');
        expect(yamlObj["title"]).toBe('Fantastic Mr. Fox');
        expect(yamlObj["publish_date"]).toBe('October 1, 1988');
    });
});

test("A request to the 'Books' (Editions) API for a given book ID and file suffix returns expected .json output", () => {
    let results = openLibrary.getEditionsPage("OL7353617M", "", "json");
    results.then(res => {
        expect(res["publishers"]).toEqual([ 'Puffin' ]);
        expect(res["number_of_pages"]).toBe(96);
        expect(res["isbn_10"]).toEqual([ '0140328726' ]);
        expect(res["covers"]).toEqual([ 8739161 ]);
        expect(res["key"]).toEqual('/books/OL7353617M');
        expect(res["authors"]).toEqual([ { key: '/authors/OL34184A' } ]);
        expect(res["ocaid"]).toEqual('fantasticmrfoxpu00roal');
        expect(res["title"]).toBe('Fantastic Mr. Fox');
        expect(res["publish_date"]).toBe('October 1, 1988');
    });
});

test("A request to the 'Books' (Editions) API for a given book ID and title returns expected HTML output", () => {
    let results = openLibrary.getEditionsPage("OL7353617M", "Fantastic_Mr._Fox");
    results.then(res => {
        const $ = cheerio.load(res);
        expect($("title").text()).toBe("Fantastic Mr. Fox (October 1, 1988 edition) | Open Library");
        expect($("h1.work-title").text()).toBe("Fantastic Mr. Fox");
        expect($("h2.edition-byline").text()).toBe("by Roald Dahl");
    });
});
