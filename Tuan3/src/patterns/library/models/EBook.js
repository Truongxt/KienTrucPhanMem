const Book = require("./Book");

class EBook extends Book {
  constructor(data) {
    super({ ...data, type: "ebook" });
  }
}

module.exports = EBook;
