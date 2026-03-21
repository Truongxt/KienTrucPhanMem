const BorrowOperation = require("./BorrowOperation");

class BasicBorrow extends BorrowOperation {
  constructor(book, memberName) {
    super();
    this.book = book;
    this.memberName = memberName;
  }

  borrow() {
    return `Borrow '${this.book.title}' for ${this.memberName} (7 days)`;
  }
}

module.exports = BasicBorrow;
