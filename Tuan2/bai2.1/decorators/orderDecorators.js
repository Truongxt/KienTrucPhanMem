class OrderDecorator {
  constructor(order) {
    this.order = order;
  }

  getOrderId() {
    if (typeof this.order.getOrderId === "function") {
      return this.order.getOrderId();
    }
    return this.order.id;
  }

  process() {
    this.order.process();
  }
}

class NotificationDecorator extends OrderDecorator {
  process() {
    this.order.process();
    console.log(`[Order ${this.getOrderId()}] Gửi thông báo cho khách hàng`);
  }
}

class AuditDecorator extends OrderDecorator {
  process() {
    this.order.process();
    console.log(`[Order ${this.getOrderId()}] Ghi log kiểm toán`);
  }
}

module.exports = { OrderDecorator, NotificationDecorator, AuditDecorator };
