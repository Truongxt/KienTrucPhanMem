const Library = require("./singleton/Library");
const BookFactory = require("./factory/BookFactory");
const SearchByTitle = require("./strategy/SearchByTitle");
const SearchByAuthor = require("./strategy/SearchByAuthor");
const SearchByGenre = require("./strategy/SearchByGenre");
const LibraryStaff = require("./observer/LibraryStaff");
const UserFollower = require("./observer/UserFollower");
const BasicBorrow = require("./decorator/BasicBorrow");
const ExtendedBorrowDecorator = require("./decorator/ExtendedBorrowDecorator");
const SpecialEditionDecorator = require("./decorator/SpecialEditionDecorator");

function printBooks(label, books) {
  console.log(label, books.map((book) => `${book.title} (${book.type})`).join(", "));
}

function runLibraryDemo() {
  const libraryA = Library.getInstance();
  const libraryB = Library.getInstance();
  console.log("Singleton check:", libraryA === libraryB);

  const staff = new LibraryStaff("Nam");
  const follower = new UserFollower("Hoa");
  libraryA.subscribe(staff);
  libraryA.subscribe(follower);

  libraryA.addBook(
    BookFactory.createBook("paper", {
      id: 1,
      title: "Clean Code",
      author: "Robert C. Martin",
      genre: "Software"
    })
  );

  libraryA.addBook(
    BookFactory.createBook("ebook", {
      id: 2,
      title: "Design Patterns",
      author: "Erich Gamma",
      genre: "Software"
    })
  );

  libraryA.addBook(
    BookFactory.createBook("audio", {
      id: 3,
      title: "Sherlock Holmes",
      author: "Arthur Conan Doyle",
      genre: "Detective"
    })
  );

  printBooks("Search by title:", libraryA.search("clean", new SearchByTitle()));
  printBooks("Search by author:", libraryA.search("gamma", new SearchByAuthor()));
  printBooks("Search by genre:", libraryA.search("software", new SearchByGenre()));

  const bookToBorrow = libraryA.listBooks()[0];
  const basicBorrow = new BasicBorrow(bookToBorrow, "Kien");
  const extendedBorrow = new ExtendedBorrowDecorator(basicBorrow);
  const specialBorrow = new SpecialEditionDecorator(extendedBorrow);
  console.log("Decorator borrow:", specialBorrow.borrow());

  libraryA.markOverdue(2);
}

module.exports = { runLibraryDemo };
