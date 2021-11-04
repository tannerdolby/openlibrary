const OpenLibrary = require("../src/openlibrary");

let openLibrary = new OpenLibrary["default"]();

test("A request to the 'Partner' API (formerly 'Read') for fetching a books readable version returns expected JSON response", () => {
    openLibrary.getReadableVersion("isbn", "0596156715").then(res => {
        expect(res["records"]["/books/OL24194264M"]["data"]["authors"][0]["name"]).toBe("Jono Bacon");
        expect(res["records"]["/books/OL24194264M"]["data"]["authors"][0]["url"]).toBe("https://openlibrary.org/authors/OL2654203A/Jono_Bacon");
    });
});

test("A request to the 'Partner' API (formerly 'Read') for fetching multiple books readable versions returns expects JSON response", () => {
    openLibrary.getReadableVersions("id:1;lccn:50006784|olid:OL6179000M;lccn:55011330").then(res => {
        expect(res["1"]["records"]["/books/OL6068644M"]["data"]["url"]).toBe("http://openlibrary.org/books/OL6068644M/The_interpretation_of_dreams");
        expect(res["1"]["records"]["/books/OL6068644M"]["data"]["key"]).toBe("/books/OL6068644M");
        expect(res["1"]["records"]["/books/OL6068644M"]["data"]["title"]).toBe("The interpretation of dreams");
    });
});