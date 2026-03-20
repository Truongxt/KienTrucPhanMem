const { Product } = require("./models/product");
const {
  NormalProductState,
  ImportedProductState,
  LuxuryProductState
} = require("./state/productStates");
const { VATStrategy, ImportTaxStrategy, SpecialTaxStrategy } = require("./strategy/taxStrategies");
const { printTax } = require("./services/taxService");

function main() {
  console.log("BÀI 2.2 - Tính toán thuế sản phẩm với State + Strategy + Decorator");

  const phone = new Product("Điện thoại", 10000000, new NormalProductState());
  printTax(phone, [new VATStrategy(0.1)]);

  const importedPerfume = new Product("Nước hoa nhập khẩu", 3000000, new ImportedProductState());
  printTax(importedPerfume, [new VATStrategy(0.1), new ImportTaxStrategy(0.05)]);

  const luxuryWatch = new Product("Đồng hồ xa xỉ", 50000000, new LuxuryProductState());
  printTax(luxuryWatch, [new VATStrategy(0.1), new SpecialTaxStrategy(0.2)]);

  console.log("\nKết luận: State kiểm soát loại thuế hợp lệ theo nhóm sản phẩm; Strategy đóng gói công thức thuế; Decorator ghép nhiều loại thuế linh hoạt.");
}

main();
