class PaymentState {
  constructor(name) {
    this.name = name;
  }

  canPay() {
    return false;
  }
}

class CreatedState extends PaymentState {
  constructor() {
    super("Khởi tạo");
  }

  canPay() {
    return true;
  }
}

class AuthorizedState extends PaymentState {
  constructor() {
    super("Đã xác thực");
  }

  canPay() {
    return true;
  }
}

class PaidState extends PaymentState {
  constructor() {
    super("Đã thanh toán");
  }
}

class RefundedState extends PaymentState {
  constructor() {
    super("Đã hoàn tiền");
  }
}

class FailedState extends PaymentState {
  constructor() {
    super("Thất bại");
  }
}

module.exports = {
  PaymentState,
  CreatedState,
  AuthorizedState,
  PaidState,
  RefundedState,
  FailedState
};
