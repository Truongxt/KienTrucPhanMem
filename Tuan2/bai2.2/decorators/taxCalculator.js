class TaxCalculator {
  calculate() {
    throw new Error("calculate() chưa được cài đặt");
  }

  getBreakdown() {
    return [];
  }
}

class BaseTaxCalculator extends TaxCalculator {
  calculate() {
    return 0;
  }
}

class TaxCalculatorDecorator extends TaxCalculator {
  constructor(innerCalculator) {
    super();
    this.innerCalculator = innerCalculator;
  }

  calculate(basePrice) {
    return this.innerCalculator.calculate(basePrice);
  }

  getBreakdown(basePrice) {
    return this.innerCalculator.getBreakdown(basePrice);
  }
}

class StrategyTaxDecorator extends TaxCalculatorDecorator {
  constructor(innerCalculator, strategy) {
    super(innerCalculator);
    this.strategy = strategy;
  }

  calculate(basePrice) {
    return this.innerCalculator.calculate(basePrice) + this.strategy.calculate(basePrice);
  }

  getBreakdown(basePrice) {
    const prev = this.innerCalculator.getBreakdown(basePrice);
    return [...prev, { name: this.strategy.name, amount: this.strategy.calculate(basePrice) }];
  }
}

module.exports = {
  TaxCalculator,
  BaseTaxCalculator,
  TaxCalculatorDecorator,
  StrategyTaxDecorator
};
