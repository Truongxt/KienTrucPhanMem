const BorrowDecorator = require("./BorrowDecorator");

class ExtendedBorrowDecorator extends BorrowDecorator {
  borrow() {
    return `${super.borrow()} + extended 3 days`;
  }
}

module.exports = ExtendedBorrowDecorator;
