const OpenLibrary = require("../src/openlibrary");
const openLibrary = new OpenLibrary["default"]();

test("Testing the getAllTitles utility", () => {
    openLibrary.getAllTitles("Katherine Neville").then(res => {
        // Set(51)
        expect(res.size).toBe(51);
        expect(typeof res[0]).toBe("string");
        expect(res[0]).toBe("The Eight");
    });
});