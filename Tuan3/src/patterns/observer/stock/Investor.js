const Observer = require("../core/Observer");

class Investor extends Observer {
  constructor(name) {
    super();
    this.name = name;
  }

  update({ symbol, price }) {
    console.log(`[Investor: ${this.name}] ${symbol} changed to ${price}`);
  }
}

module.exports = Investor;
