class TaxStrategy {
  constructor(name) {
    this.name = name;
  }

  calculate() {
    throw new Error("calculate() chưa được cài đặt");
  }
}

class VATStrategy extends TaxStrategy {
  constructor(rate = 0.1) {
    super("VAT");
    this.rate = rate;
  }

  calculate(basePrice) {
    return basePrice * this.rate;
  }
}

class ImportTaxStrategy extends TaxStrategy {
  constructor(rate = 0.05) {
    super("ImportTax");
    this.rate = rate;
  }

  calculate(basePrice) {
    return basePrice * this.rate;
  }
}

class SpecialTaxStrategy extends TaxStrategy {
  constructor(rate = 0.2) {
    super("SpecialTax");
    this.rate = rate;
  }

  calculate(basePrice) {
    return basePrice * this.rate;
  }
}

module.exports = {
  TaxStrategy,
  VATStrategy,
  ImportTaxStrategy,
  SpecialTaxStrategy
};
