const Subject = require("../core/Subject");

class Stock extends Subject {
  constructor(symbol, price) {
    super();
    this.symbol = symbol;
    this.price = price;
  }

  setPrice(newPrice) {
    this.price = newPrice;
    this.notify({ symbol: this.symbol, price: this.price });
  }
}

module.exports = Stock;
