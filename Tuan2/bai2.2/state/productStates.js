class ProductState {
  constructor(name) {
    this.name = name;
  }

  getAllowedStrategies() {
    throw new Error("getAllowedStrategies() chưa được cài đặt");
  }
}

class NormalProductState extends ProductState {
  constructor() {
    super("Sản phẩm thường");
  }

  getAllowedStrategies() {
    return ["VAT"];
  }
}

class ImportedProductState extends ProductState {
  constructor() {
    super("Sản phẩm nhập khẩu");
  }

  getAllowedStrategies() {
    return ["VAT", "ImportTax"];
  }
}

class LuxuryProductState extends ProductState {
  constructor() {
    super("Sản phẩm xa xỉ");
  }

  getAllowedStrategies() {
    return ["VAT", "SpecialTax"];
  }
}

module.exports = {
  ProductState,
  NormalProductState,
  ImportedProductState,
  LuxuryProductState
};
