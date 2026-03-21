const BorrowDecorator = require("./BorrowDecorator");

class SpecialEditionDecorator extends BorrowDecorator {
  borrow() {
    return `${super.borrow()} + special edition request`;
  }
}

module.exports = SpecialEditionDecorator;
