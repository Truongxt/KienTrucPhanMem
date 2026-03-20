const { Order } = require("./models/order");
const {
  NewOrderState,
  ProcessingOrderState,
  DeliveredOrderState,
  CancelledOrderState
} = require("./state/orderStates");
const { ExpressShipping } = require("./strategy/shippingStrategies");
const { PartialRefund } = require("./strategy/refundStrategies");
const { NotificationDecorator, AuditDecorator } = require("./decorators/orderDecorators");

function main() {
  console.log("BÀI 2.1 - Quản lý đơn hàng với State + Strategy + Decorator");

  const order = new Order("A1001", 1200000, 2.5);
  order.setShippingStrategy(new ExpressShipping());
  order.setRefundStrategy(new PartialRefund());

  let flow = new NotificationDecorator(new AuditDecorator(order));

  order.setState(new NewOrderState());
  flow.process();

  order.setState(new ProcessingOrderState());
  flow.process();

  order.setState(new DeliveredOrderState());
  flow.process();

  order.setState(new CancelledOrderState());
  flow.process();

  console.log("\nKết luận: State quản lý vòng đời đơn; Strategy thay đổi cách tính phí vận chuyển/hoàn tiền; Decorator bổ sung thông báo và audit mà không sửa lớp Order.");
}

main();
