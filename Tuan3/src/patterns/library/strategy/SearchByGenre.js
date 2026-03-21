const SearchStrategy = require("./SearchStrategy");

class SearchByGenre extends SearchStrategy {
  search(books, keyword) {
    return books.filter((book) =>
      book.genre.toLowerCase().includes(keyword.toLowerCase())
    );
  }
}

module.exports = SearchByGenre;
