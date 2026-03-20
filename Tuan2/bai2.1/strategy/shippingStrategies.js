class ShippingStrategy {
  calculate() {
    throw new Error("calculate() chưa được cài đặt");
  }
}

class StandardShipping extends ShippingStrategy {
  calculate(weightKg) {
    return 15000 + weightKg * 5000;
  }
}

class ExpressShipping extends ShippingStrategy {
  calculate(weightKg) {
    return 30000 + weightKg * 9000;
  }
}

module.exports = { ShippingStrategy, StandardShipping, ExpressShipping };
