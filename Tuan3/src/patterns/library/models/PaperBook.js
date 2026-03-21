const Book = require("./Book");

class PaperBook extends Book {
  constructor(data) {
    super({ ...data, type: "paper" });
  }
}

module.exports = PaperBook;
