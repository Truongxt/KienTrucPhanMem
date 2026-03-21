const SearchStrategy = require("./SearchStrategy");

class SearchByTitle extends SearchStrategy {
  search(books, keyword) {
    return books.filter((book) =>
      book.title.toLowerCase().includes(keyword.toLowerCase())
    );
  }
}

module.exports = SearchByTitle;
