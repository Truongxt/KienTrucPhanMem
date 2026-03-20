class Truck {
  deliver() {
    return "Giao hàng bằng xe tải";
  }
}

class Ship {
  deliver() {
    return "Giao hàng bằng tàu";
  }
}

module.exports = { Truck, Ship };
