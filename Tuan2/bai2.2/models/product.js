class Product {
  constructor(name, basePrice, state) {
    this.name = name;
    this.basePrice = basePrice;
    this.state = state;
  }

  setState(state) {
    this.state = state;
  }
}

module.exports = { Product };
