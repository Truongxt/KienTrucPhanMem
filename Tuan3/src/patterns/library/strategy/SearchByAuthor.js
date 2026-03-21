const SearchStrategy = require("./SearchStrategy");

class SearchByAuthor extends SearchStrategy {
  search(books, keyword) {
    return books.filter((book) =>
      book.author.toLowerCase().includes(keyword.toLowerCase())
    );
  }
}

module.exports = SearchByAuthor;
