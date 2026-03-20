class PaymentStrategy {
  pay() {
    throw new Error("pay() chưa được cài đặt");
  }
}

class CreditCardStrategy extends PaymentStrategy {
  pay(amount) {
    return `Thanh toán thẻ tín dụng: ${amount.toFixed(2)}`;
  }
}

class PayPalStrategy extends PaymentStrategy {
  pay(amount) {
    return `Thanh toán PayPal: ${amount.toFixed(2)}`;
  }
}

class BankTransferStrategy extends PaymentStrategy {
  pay(amount) {
    return `Thanh toán chuyển khoản: ${amount.toFixed(2)}`;
  }
}

module.exports = {
  PaymentStrategy,
  CreditCardStrategy,
  PayPalStrategy,
  BankTransferStrategy
};
