const OpenLibrary = require("../src/openlibrary");
const yaml = require("js-yaml");

let openLibrary = new OpenLibrary["default"]();

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
    let books = [
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
    ];
    let response = openLibrary.getBookCovers(books);
    response.then(res => {
        let opts = [
        'https://ia600603.us.archive.org/view_archive.php?archive=/24/items/olcovers656/olcovers656-L.zip&file=6564962-L.jpg',
        'https://ia800603.us.archive.org/view_archive.php?archive=/24/items/olcovers656/olcovers656-L.zip&file=6564962-L.jpg'
        ];
        expect(res[0]).toEqual('https://covers.openlibrary.org/b/id/11464254-L.jpg');
        expect(opts.includes(res[1])).toEqual(true);
    });
});