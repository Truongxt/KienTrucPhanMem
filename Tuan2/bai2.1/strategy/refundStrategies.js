class RefundStrategy {
  calculate() {
    throw new Error("calculate() chưa được cài đặt");
  }
}

class FullRefund extends RefundStrategy {
  calculate(totalAmount) {
    return totalAmount;
  }
}

class PartialRefund extends RefundStrategy {
  calculate(totalAmount) {
    return totalAmount * 0.8;
  }
}

module.exports = { RefundStrategy, FullRefund, PartialRefund };
