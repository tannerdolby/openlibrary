const OpenLibrary = require("../src/openlibrary");

let openLib = new OpenLibrary["default"]();

test("Fetch books by subject name without extra details", () => {
    openLib.getSubjectsPage("love").then(res => {
        expect(res["key"]).toEqual("/subjects/love");
        expect(res["name"].toLowerCase()).toEqual("love");
        expect(res.hasOwnProperty("publishers")).toBe(false);
    });
});

// When query parameter details=true is passed, related subjects, 
// prominent publishers, prolific authors and publishing_history are 
// also included in the response
test("Fetch books by subject name, related subjects, publishers, authors (detailed)", () => {
    openLib.getSubjectsPage("love", { "details": true , "limit": 2}).then(res => {
        expect(res["key"]).toEqual("/subjects/love");
        expect(res["name"]).toEqual("Love");
        expect(res["publishers"].length).toBeGreaterThan(0);
        expect(res.hasOwnProperty("publishers")).toBe(true);
        expect(res.hasOwnProperty("authors")).toBe(true);
        expect(res.hasOwnProperty("languages")).toBe(true);
    });
});