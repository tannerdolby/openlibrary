# openlibrary
A Node.js client library written in TypeScript for interacting with the Open Library APIs. Requests made using [axios](https://www.npmjs.com/package/axios).

## Why openlibrary?
The Open Library provides API access to several "book" related services. There is an [official client](https://github.com/internetarchive/openlibrary-client) written in Python provided by the Open Library team. There are also other "unofficial" client libraries written in [ruby](https://github.com/jayfajardo/openlibrary) and more, this plugin falls into the "unofficial" client library section. Since there wasn't a Node.js client library already documented, that is what inspired me to develop openlibrary.

openlibrary is written in TypeScript to be extra fast and provides a user-friendly client library to interface with the Open Library APIs.

## Installation
Install the package from npm (once its published!).

```shell
npm install openlibrary
```

Add it to your project:

```js
const OpenLibrary = require("openlibrary");

// Create a client representing the Open Library Books APIs
const openLibrary = new OpenLibrary();

// Object representing the 'Works' API within the Books APIs
const { works } = openLibrary.booksApi;

// Fetch a Work page by identifier and return a .json output
// e.g. '/books/OL7353617M.json' 
works.getBook("OL45883W", "", "json").then(res => {
    console.log(res);
    // { 
    //     description: "The main character Fantastic Mr. Fox ...",
    //     title: 'Fantastic Mr. Fox',
    //     ...
    // }
});

// Fetch a Work page by identifier and return a .yml output
works.getBook("OL45883W", "", "yml").then(res => {
    console.log(res);
    // authors:
    // -   author:
    //         key: /authors/OL34184A
    //     type:
    //         key: /type/author_role
    // ...
});

// Fetch a Work page by ID and Title and return HTML
works.getBook("OL45883W", "Fantastic_Mr._FOX").then(res => {
    console.log(res);
    // <html xmlns="http://www.w3.org/1999/xhtml" lang="en"><head>
    // <title>Fantastic Mr. Fox (October 1, 1988 edition) | Open Library</title>
    // ...
});
```

## Integrations
The openlibrary client supports the following Open Library APIs:

- Books API - Retrieve a specific work or edition by identifier
- Authors API - Retrieve an author and their works by author identifier
- Subjects API (Experimental) - Fetch books by subject name
- Search API (todo) - Search results for books, authors, and more
- Search inside API (todo) - Search for matching text within millions of books
- Partner API (todo)- Formerly the "Read" API, fetch one or more books by library identifiers (ISBNs, OCLC, LCCNs)
- Covers API - Fetch book covers by ISBN or Open Library identifier
- Recent Changes API (todo) - Programatic access to changes across Open Library

## Config
Todo

## Testing
Jest is the test framework used. Run all of the unit tests locally with:

```bash
npm run test
```

## Contributing

todo

## Kudos
- [Open Library Developer Center / APIs](https://openlibrary.org/developers/api)