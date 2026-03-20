const { AuthorizedState, FailedState } = require("./state/paymentStates");
const { CreditCardStrategy, PayPalStrategy, BankTransferStrategy } = require("./strategy/paymentStrategies");
const { Payment } = require("./models/payment");
const { ProcessingFeeDecorator, DiscountDecorator } = require("./decorators/paymentDecorators");

function main() {
  console.log("BÀI 2.3 - Hệ thống thanh toán với State + Strategy + Decorator");

  const payment = new Payment(2000000, new CreditCardStrategy());
  payment.setState(new AuthorizedState());

  let enhanced = new ProcessingFeeDecorator(payment, 0.02);
  enhanced = new DiscountDecorator(enhanced, 0.1);

  const finalAmount = enhanced.getAmount();
  console.log(`Số tiền cuối cùng: ${finalAmount.toFixed(2)}`);
  console.log(enhanced.execute());
  console.log(`Trạng thái sau thanh toán: ${payment.state.name}`);

  const secondPayment = new Payment(1500000, new PayPalStrategy());
  secondPayment.setState(new AuthorizedState());
  console.log(secondPayment.execute());

  const thirdPayment = new Payment(5000000, new BankTransferStrategy());
  thirdPayment.setState(new FailedState());
  try {
    console.log(thirdPayment.execute());
  } catch (error) {
    console.log(`Lỗi: ${error.message}`);
  }

  console.log("\nKết luận: State kiểm soát luồng thanh toán hợp lệ; Strategy đổi phương thức thanh toán; Decorator bổ sung phí xử lý và mã giảm giá mà không sửa lớp Payment.");
}

main();
