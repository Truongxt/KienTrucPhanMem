const Stock = require("./Stock");
const Investor = require("./Investor");

function runStockObserverDemo() {
  const apple = new Stock("AAPL", 180);

  const kien = new Investor("Kien");
  const linh = new Investor("Linh");

  apple.subscribe(kien);
  apple.subscribe(linh);

  apple.setPrice(181.5);
  apple.setPrice(179.8);
}

module.exports = { runStockObserverDemo };
