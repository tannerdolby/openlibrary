const OpenLibrary = require("../src/books");
const yaml = require("js-yaml");
const cheerio = require("cheerio");

// OpenLibBook{ __esModule: true, default: [Function: OpenLibBooksAPI] }
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
        expect(res["covers"]).toEqual([
               6498519,  8904777,
                108274,   233884,
               1119236,       -1,
              10222599, 10482837,
               3216657
        ]);
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
        expect(yamlObj["covers"]).toEqual([
               6498519,  8904777,
                108274,   233884,
               1119236,       -1,
              10222599, 10482837,
               3216657
        ]);
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
    result.then(res => {
        const $ = cheerio.load(res);
        expect($("title").text()).toBe("Fantastic Mr. Fox (1970 edition) | Open Library");
        expect($("h1.work-title").text()).toBe("Fantastic Mr. Fox");
        expect($("h2.edition-byline").text()).toBe("by Roald Dahl");
    });
});

test("A request to the 'ISBN' API for a given book returns expected .json output", () => {
    let results = openLibrary.getIsbnPage("9780140328721", "", "json");
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
    let results = openLibrary.getIsbnPage("9780140328721", "", "yml");
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
    let results = openLibrary.getIsbnPage("9780140328721", "");
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
        expect(res.trim()).toEqual(`<?xml version="1.0" encoding="utf-8"?>
<rdf:RDF
  xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns#'
  xmlns:rdfs='http://www.w3.org/2000/01/rdf-schema#'
  xmlns:bio='http://purl.org/vocab/bio/0.1/'
  xmlns:rdg2='http://rdvocab.info/ElementsGr2/'
  xmlns:dcterms='http://purl.org/dc/terms/'
  xmlns:foaf='http://xmlns.com/foaf/0.1/'
  xmlns:ov='http://open.vocab.org/terms/'
  xmlns:owl='http://www.w3.org/2002/07/owl#'
>
    

    <foaf:Person rdf:about="http://openlibrary.org/authors/OL23919A">
            <foaf:name>J. K. Rowling</foaf:name>
    

            <rdg2:variantNameForThePerson>Joanne Rowling</rdg2:variantNameForThePerson>
    <rdg2:variantNameForThePerson>Joanne K. Rowling</rdg2:variantNameForThePerson>
    <rdg2:variantNameForThePerson>J.K.Rowling</rdg2:variantNameForThePerson>
    <rdg2:variantNameForThePerson>Rowling, J.K.</rdg2:variantNameForThePerson>
    <rdg2:variantNameForThePerson>J. Rowling</rdg2:variantNameForThePerson>
    <rdg2:variantNameForThePerson>Rowling, Joanne K.</rdg2:variantNameForThePerson>
    <rdg2:variantNameForThePerson>Jo Murray</rdg2:variantNameForThePerson>
    <rdg2:variantNameForThePerson>J K Rowling</rdg2:variantNameForThePerson>
    <rdg2:variantNameForThePerson>Rowling J.K.</rdg2:variantNameForThePerson>
    <rdg2:variantNameForThePerson>J.K. Rowling (author)</rdg2:variantNameForThePerson>
    <rdg2:variantNameForThePerson>Rowling Joanne</rdg2:variantNameForThePerson>
    <rdg2:variantNameForThePerson>J.K. Rowling</rdg2:variantNameForThePerson>
    <rdg2:variantNameForThePerson>J.K. ROWLING</rdg2:variantNameForThePerson>
    <rdg2:variantNameForThePerson>Rowling J K</rdg2:variantNameForThePerson>
    <rdg2:variantNameForThePerson>J K ROWLING</rdg2:variantNameForThePerson>
    <rdg2:variantNameForThePerson>Newt Scamander</rdg2:variantNameForThePerson>
    <rdg2:variantNameForThePerson>JOANNE K. ROWLING</rdg2:variantNameForThePerson>
    <rdg2:variantNameForThePerson>Kennilworthy Whisp</rdg2:variantNameForThePerson>
    <rdg2:variantNameForThePerson>JK Rowling</rdg2:variantNameForThePerson>
    <rdg2:variantNameForThePerson>JK Rowlings</rdg2:variantNameForThePerson>
    <rdg2:variantNameForThePerson>jk rowling</rdg2:variantNameForThePerson>
    <rdg2:variantNameForThePerson>R.K Rowling</rdg2:variantNameForThePerson>
    <rdg2:variantNameForThePerson>J. K Rowling</rdg2:variantNameForThePerson>
    <rdg2:variantNameForThePerson>J.K Rowling</rdg2:variantNameForThePerson>
    <rdg2:variantNameForThePerson>Rowling J. K.</rdg2:variantNameForThePerson>
    <rdg2:variantNameForThePerson>J. K. Rowling (Auteur)</rdg2:variantNameForThePerson>
    <rdg2:variantNameForThePerson>J.k. Rowling</rdg2:variantNameForThePerson>
    <rdg2:variantNameForThePerson>Rowling, J. K.</rdg2:variantNameForThePerson>
    <rdg2:variantNameForThePerson>ROWLING J.K. -</rdg2:variantNameForThePerson>
    <rdg2:variantNameForThePerson>J. K. ROWLING</rdg2:variantNameForThePerson>
    <rdg2:variantNameForThePerson>Rowling,J.K.</rdg2:variantNameForThePerson>
    <rdg2:variantNameForThePerson>J. K. Rowling</rdg2:variantNameForThePerson>
    <rdg2:variantNameForThePerson>Robert Galbraith</rdg2:variantNameForThePerson>
    <rdg2:variantNameForThePerson>Robert Galbraith (J.K. Rowling)</rdg2:variantNameForThePerson>

            <rdg2:biographicalInformation>Joanne &quot;Jo&quot; Murray, OBE (née Rowling), better known under the pen name J. K. Rowling, is a British author best known as the creator of the Harry Potter fantasy series, the idea for which was conceived whilst on a train trip from Manchester to London in 1990. The Potter books have gained worldwide attention, won multiple awards, sold more than 400 million copies, and been the basis for a popular series of films.</rdg2:biographicalInformation>
    

            <rdg2:titleOfThePerson>OBE</rdg2:titleOfThePerson>
    


      <bio:event>
          <bio:Birth>
               <dcterms:date>31 July 1965</dcterms:date>
          </bio:Birth>
      </bio:event>
      
      <owl:sameAs rdf:resource="http://isni.org/isni/000000012148628X"/>
      <owl:sameAs rdf:resource="http://www.wikidata.org/entity/Q34660"/>
      <owl:sameAs rdf:resource="http://viaf.org/viaf/116796842"/>
      <foaf:isPrimaryTopicOf>
          <foaf:Document rdf:about="http://en.wikipedia.org/wiki/J._K._Rowling">
              <rdfs:label>Wikipedia</rdfs:label>
          </foaf:Document>
      </foaf:isPrimaryTopicOf>
      
      <foaf:page>
          <foaf:Document rdf:about="http://www.jkrowling.com/">
              <rdfs:label>Official Site</rdfs:label>
          </foaf:Document>
      </foaf:page>
      
      <foaf:depiction>
          <foaf:Image rdf:about="https://covers.openlibrary.org/b/id/5543033-M.jpg" />
      </foaf:depiction>
    </foaf:Person>

    <!-- administrative -->
    <rdf:Description rdf:about="">
        <dcterms:modified rdf:datatype="http://www.w3.org/2001/XMLSchema#dateTime">2021-09-30T17:04:08.014242</dcterms:modified>
        <dcterms:created rdf:datatype="http://www.w3.org/2001/XMLSchema#dateTime">2008-04-01T03:28:50.625462</dcterms:created>
        <ov:versionnumber>50</ov:versionnumber>
    </rdf:Description>
</rdf:RDF>`)
    });
});

test("A request to the 'Covers' API for a single Work returns the expect image URL", () => {
    let response = openLibrary.getBookCover("id", 6564962, "L");
    response.then(res => {
        expect([
            "https://ia800603.us.archive.org/view_archive.php?archive=/24/items/olcovers656/olcovers656-L.zip&file=6564962-L.jpg",
            "https://ia600603.us.archive.org/view_archive.php?archive=/24/items/olcovers656/olcovers656-L.zip&file=6564962-L.jpg"
        ].includes(res)).toBe(true);        
    });
});

test("A request to the 'Covers' API for mutliple Works returns the expect array of image URLs", () => {
    let response = openLibrary.getBookCovers([
        {
          title: "The Hitch Hiker's Guide to the Galaxy",
          id: 11464254,
          key: "id",
          size: "L",
          fallback: "https://covers.openlibrary.org/b/id/11464254-L.jpg"
        },
        {
          title: "Star Wars: Splinter of the Mind's Eye",
          id: 6564962,
          key: "id",
          size: "L",
          fallback: "https://ia600603.us.archive.org/view_archive.php?archive=/24/items/olcovers656/olcovers656-L.zip&file=6564962-L.jpg"
        }
    ]);
    response.then(res => {
        let opts = [
        'https://ia600603.us.archive.org/view_archive.php?archive=/24/items/olcovers656/olcovers656-L.zip&file=6564962-L.jpg',
        'https://ia800603.us.archive.org/view_archive.php?archive=/24/items/olcovers656/olcovers656-L.zip&file=6564962-L.jpg'
        ];
        expect(res[0]).toEqual('https://covers.openlibrary.org/b/id/11464254-L.jpg');
        expect(opts.includes(res[1])).toEqual(true);
    });
});

test("A request to get an Author photo from OLID returns expect image URL string", () => {
    let response = openLibrary.getAuthorPhoto("olid", "OL229501A", "S");
    response.then(res => {
        expect(res).toEqual("https://covers.openlibrary.org/a/olid/OL229501A-S.jpg")
    });
});