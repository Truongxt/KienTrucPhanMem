const { Truck, Ship } = require("./transports");

class Logistics {
  createTransport() {
    throw new Error("createTransport() chưa được cài đặt");
  }

  planDelivery() {
    const transport = this.createTransport();
    return transport.deliver();
  }
}

class RoadLogistics extends Logistics {
  createTransport() {
    return new Truck();
  }
}

class SeaLogistics extends Logistics {
  createTransport() {
    return new Ship();
  }
}

module.exports = { Logistics, RoadLogistics, SeaLogistics };
