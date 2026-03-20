class PaymentDecorator {
  constructor(payment) {
    this.payment = payment;
  }

  getAmount() {
    return this.payment.getAmount();
  }

  getBaseAmount() {
    if (typeof this.payment.getBaseAmount === "function") {
      return this.payment.getBaseAmount();
    }
    return this.payment.getAmount();
  }

  execute(amountOverride) {
    if (typeof amountOverride === "number") {
      return this.payment.execute(amountOverride);
    }
    return this.payment.execute();
  }
}

class ProcessingFeeDecorator extends PaymentDecorator {
  constructor(payment, feeRate) {
    super(payment);
    this.feeRate = feeRate;
  }

  getAmount() {
    return this.payment.getAmount() * (1 + this.feeRate);
  }

  execute(amountOverride) {
    const baseAmount = typeof amountOverride === "number" ? amountOverride : this.getBaseAmount();
    const adjustedAmount = baseAmount * (1 + this.feeRate);
    const result = this.payment.execute(adjustedAmount);
    return `${result} (kèm phí xử lý ${(this.feeRate * 100).toFixed(1)}%)`;
  }
}

class DiscountDecorator extends PaymentDecorator {
  constructor(payment, discountRate) {
    super(payment);
    this.discountRate = discountRate;
  }

  getAmount() {
    return this.payment.getAmount() * (1 - this.discountRate);
  }

  execute(amountOverride) {
    const baseAmount = typeof amountOverride === "number" ? amountOverride : this.getBaseAmount();
    const adjustedAmount = baseAmount * (1 - this.discountRate);
    const result = this.payment.execute(adjustedAmount);
    return `${result} (áp dụng giảm giá ${(this.discountRate * 100).toFixed(1)}%)`;
  }
}

module.exports = {
  PaymentDecorator,
  ProcessingFeeDecorator,
  DiscountDecorator
};
