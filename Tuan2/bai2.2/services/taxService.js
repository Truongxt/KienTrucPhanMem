const { BaseTaxCalculator, StrategyTaxDecorator } = require("../decorators/taxCalculator");

function validateStrategies(state, strategies) {
  const allowed = new Set(state.getAllowedStrategies());
  const invalid = strategies.filter((strategy) => !allowed.has(strategy.name));
  if (invalid.length > 0) {
    const names = invalid.map((item) => item.name).join(", ");
    throw new Error(`Trạng thái ${state.name} không cho phép chiến lược thuế: ${names}`);
  }
}

function buildTaxCalculator(strategies) {
  let calculator = new BaseTaxCalculator();
  for (const strategy of strategies) {
    calculator = new StrategyTaxDecorator(calculator, strategy);
  }
  return calculator;
}

function printTax(product, strategies) {
  validateStrategies(product.state, strategies);
  const calculator = buildTaxCalculator(strategies);

  const taxTotal = calculator.calculate(product.basePrice);
  const finalPrice = product.basePrice + taxTotal;
  const breakdown = calculator.getBreakdown(product.basePrice);

  console.log(`\n${product.name} - ${product.state.name}`);
  console.log(`Giá gốc: ${product.basePrice.toFixed(2)}`);
  breakdown.forEach((line) => {
    console.log(`Thuế ${line.name}: ${line.amount.toFixed(2)}`);
  });
  console.log(`Tổng thuế: ${taxTotal.toFixed(2)}`);
  console.log(`Giá sau thuế: ${finalPrice.toFixed(2)}`);
}

module.exports = { validateStrategies, buildTaxCalculator, printTax };
