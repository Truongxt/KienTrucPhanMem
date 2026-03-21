const Book = require("./Book");

class AudioBook extends Book {
  constructor(data) {
    super({ ...data, type: "audio" });
  }
}

module.exports = AudioBook;
