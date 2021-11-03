const OpenLibrary = require("../src/openlibrary");

let openLibrary = new OpenLibrary["default"]();

test("A request to the 'Partner' API (formerly 'Read') for fetching a books readable version returns expected JSON response", () => {
    openLibrary.getReadableBookVersion("isbn", "0596156715").then(res => {
        expect(res["records"]["/books/OL24194264M"]["data"]["authors"][0]["name"]).toBe("Jono Bacon");
        expect(res["records"]["/books/OL24194264M"]["data"]["authors"][0]["url"]).toBe("https://openlibrary.org/authors/OL2654203A/Jono_Bacon");
    });
});