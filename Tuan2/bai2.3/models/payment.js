const { CreatedState, PaidState } = require("../state/paymentStates");

class Payment {
  constructor(amount, strategy) {
    this.amount = amount;
    this.strategy = strategy;
    this.state = new CreatedState();
  }

  setState(state) {
    this.state = state;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  getAmount() {
    return this.amount;
  }

  getBaseAmount() {
    return this.amount;
  }

  execute(amountOverride) {
    if (!this.state.canPay()) {
      throw new Error(`Không thể thanh toán ở trạng thái: ${this.state.name}`);
    }
    const amountToPay = typeof amountOverride === "number" ? amountOverride : this.amount;
    const message = this.strategy.pay(amountToPay);
    this.setState(new PaidState());
    return message;
  }
}

module.exports = { Payment };
