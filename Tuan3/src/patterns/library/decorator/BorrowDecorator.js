const BorrowOperation = require("./BorrowOperation");

class BorrowDecorator extends BorrowOperation {
  constructor(operation) {
    super();
    this.operation = operation;
  }

  borrow() {
    return this.operation.borrow();
  }
}

module.exports = BorrowDecorator;
