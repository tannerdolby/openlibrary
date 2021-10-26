# openlibrary 
A Node.js Open Library client for interacting with the [Open Library REST API](http://openlibrary.org/dev/docs/restful_api) and Open Library APIs listed in the [Open Library Developer Center](https://openlibrary.org/developers/api). Requests to the Open Library servers made using [axios](https://www.npmjs.com/package/axios). 

## Installation
Install the package from [npm](https://npmjs.com) (once its published).

```bash
npm install openlibrary
```

## What does it do?
The client library provides access to all of the public Open Library APIs described in the [integrations](#Integrations) section. After installing the package from npm, add it to your project:

```js
const OpenLibrary = require("openlibrary");

const openLibrary = new OpenLibrary();

openLibrary.searchForAuthors("J R R Tolken").then(res => {
    console.log(res);
    // { ...
    //   docs:
    //    [ { key: 'OL3485759A',
    //        text: [ '/authors/OL3485759A', 'J R R Tolken' ],
    //        type: 'author',
    //        name: 'J R R Tolken',
    //        top_work: 'Lord of the Rings the Film Book',
    //        work_count: 1,
    //        _version_: 1700758664814526500 } ] }
});

// Get a book cover image URL
openLibrary.getBookCover("id", 6564962, "L").then(res => {
    console.log(res);
    // https://ia800603.us.archive.org/view_archive.php?archive=/24/items/olcovers656/olcovers656-L.zip&file=6564962-L.jpg
});

// Retrieve a specific work by identifier and return json
openLibrary.getWorksPage("OL45883W", "", "json").then(res => {
    console.log(res);
    // { 
    //     description: "The main character Fantastic Mr. Fox ...",
    //     title: 'Fantastic Mr. Fox',
    //     ...
    // }
});
```

## Why openlibrary?
`openlibrary` is fast! ⚡

It's written in TypeScript and provides a user-friendly client library to interact with the Open Library APIs. There is one class [`OpenLibrary`](https://github.com/tannerdolby/openlibrary/blob/master/src/books.ts) that provides methods to easily interact with Open Library APIs.

The Open Library provides API access to several "book" related services. There is an [official client](https://github.com/internetarchive/openlibrary-client) written in Python provided by the Open Library team. There are also other "unofficial" client libraries written in [Ruby](https://github.com/jayfajardo/openlibrary) and more. This plugin falls into the "unofficial" client library section. Since there wasn't a Node.js client library already documented, that is what inspired me to develop openlibrary.

## Integrations
The `openlibrary` client library supports the following [Open Library APIs](https://openlibrary.org/developers/api):

- [x] Books API - Retrieve a specific work or edition by identifier
- [x] Authors API - Retrieve an author and their works by author identifier
- [ ] Subjects API (Experimental) - Fetch books by subject name
- [x] Search API (todo) - Search results for books, authors, and more
- [ ] Search inside API (todo) - Search for matching text within millions of books
- [ ] Partner API (todo)- Formerly the "Read" API, fetch one or more books by library identifiers (ISBNs, OCLC, LCCNs)
- [x] Covers API - Fetch book covers by ISBN or Open Library identifier
- [ ] Recent Changes API (todo) - Programatic access to changes across Open Library
- [ ] REST API (todo)

## Methods
Todo add documentation

#### getEditionsPage(bookId: string, bookTitle: string = "", suffix: Suffix = "", fullUrl: string="")
Fetch an 'Editions' page for a specific book based on identifier and or title.

`openLibrary.getEditionsPage("OL7353617M", "", "yml").then(res => { console.log(res) });`

#### getAuthorsPage(authorId: string, suffix: Suffix = "json")
Access data on an individual author.

`openLibrary.getAuthorsPage("OL23919A", "yml").then(res => { console.log(res) });`

#### getAuthorPhoto(key: string, value: string, size: string)
Access an author photo using OLID or ID.

`openLibrary.getAuthorPhoto("olid", "OL229501A", "S").then(res => { console.log(res) });`


## Testing
Jest is the test framework used. Run all of the unit tests locally with:

```bash
npm run test
```

## Contributing 🌱

todo

## Kudos & Other Client Libraries
Shoutout to the Open Library team for providing a robust set of public APIs. The official Python client library by `openlibrary` can be found below along with a link to an unofficial Open Library Ruby client.

- [Open Library Developer Center / APIs](https://openlibrary.org/developers/api)
- [openlibrary/openlibrary-client](https://github.com/internetarchive/openlibrary-client#other-client-libraries)
- [jayfajardo/openlibrary](https://github.com/jayfajardo/openlibrary)