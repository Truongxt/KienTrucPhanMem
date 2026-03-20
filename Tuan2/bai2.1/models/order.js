const { NewOrderState } = require("../state/orderStates");
const { StandardShipping } = require("../strategy/shippingStrategies");
const { FullRefund } = require("../strategy/refundStrategies");

class Order {
  constructor(id, totalAmount, weightKg) {
    this.id = id;
    this.totalAmount = totalAmount;
    this.weightKg = weightKg;
    this.state = new NewOrderState();
    this.shippingStrategy = new StandardShipping();
    this.refundStrategy = new FullRefund();
  }

  setState(state) {
    this.state = state;
  }

  setShippingStrategy(strategy) {
    this.shippingStrategy = strategy;
  }

  setRefundStrategy(strategy) {
    this.refundStrategy = strategy;
  }

  process() {
    this.log(`Trạng thái hiện tại: ${this.state.name}`);
    this.state.handle(this);
  }

  log(message) {
    console.log(`[Order ${this.id}] ${message}`);
  }
}

module.exports = { Order };
