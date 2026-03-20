class OrderState {
  constructor(name) {
    this.name = name;
  }

  handle() {
    throw new Error("handle() chưa được cài đặt");
  }
}

class NewOrderState extends OrderState {
  constructor() {
    super("Mới tạo");
  }

  handle(order) {
    order.log(`Kiểm tra thông tin đơn hàng #${order.id}`);
  }
}

class ProcessingOrderState extends OrderState {
  constructor() {
    super("Đang xử lý");
  }

  handle(order) {
    const shippingCost = order.shippingStrategy.calculate(order.weightKg);
    order.log(`Đóng gói và vận chuyển. Phí vận chuyển: ${shippingCost.toFixed(2)}`);
  }
}

class DeliveredOrderState extends OrderState {
  constructor() {
    super("Đã giao");
  }

  handle(order) {
    order.log("Cập nhật trạng thái: Đã giao");
  }
}

class CancelledOrderState extends OrderState {
  constructor() {
    super("Hủy");
  }

  handle(order) {
    const refund = order.refundStrategy.calculate(order.totalAmount);
    order.log(`Đơn hàng bị hủy. Hoàn tiền: ${refund.toFixed(2)}`);
  }
}

module.exports = {
  OrderState,
  NewOrderState,
  ProcessingOrderState,
  DeliveredOrderState,
  CancelledOrderState
};
