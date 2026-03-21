const { runCompositeFileSystemDemo } = require("./patterns/composite/filesystem/demo");
const { runCompositeUIDemo } = require("./patterns/composite/ui/demo");
const { runStockObserverDemo } = require("./patterns/observer/stock/demo");
const { runTaskObserverDemo } = require("./patterns/observer/task/demo");
const { runAdapterDemo } = require("./patterns/adapter/demo");
const { runLibraryDemo } = require("./patterns/library/demo");

function runAllDemos() {
  console.log("\n========== 1) COMPOSITE: FILE SYSTEM ==========");
  runCompositeFileSystemDemo();

  console.log("\n========== 2) COMPOSITE: UI ==========");
  runCompositeUIDemo();

  console.log("\n========== 3) OBSERVER: STOCK ==========");
  runStockObserverDemo();

  console.log("\n========== 4) OBSERVER: TASK ==========");
  runTaskObserverDemo();

  console.log("\n========== 5) ADAPTER: JSON <-> XML ==========");
  runAdapterDemo();

  console.log("\n========== 6) LIBRARY SYSTEM ==========");
  runLibraryDemo();
}

runAllDemos();
