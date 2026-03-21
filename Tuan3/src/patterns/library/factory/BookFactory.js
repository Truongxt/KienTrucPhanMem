const PaperBook = require("../models/PaperBook");
const EBook = require("../models/EBook");
const AudioBook = require("../models/AudioBook");

class BookFactory {
  static createBook(type, data) {
    switch (type) {
      case "paper":
        return new PaperBook(data);
      case "ebook":
        return new EBook(data);
      case "audio":
        return new AudioBook(data);
      default:
        throw new Error(`Unsupported book type: ${type}`);
    }
  }
}

module.exports = BookFactory;
