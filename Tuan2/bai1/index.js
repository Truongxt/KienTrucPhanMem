const { AppConfig } = require("./singleton/appConfig");
const { RoadLogistics, SeaLogistics } = require("./factoryMethod/logistics");
const { LightThemeFactory, DarkThemeFactory } = require("./abstractFactory/uiFactories");

function renderLoginForm(factory) {
  const button = factory.createButton();
  const input = factory.createInput();
  console.log("-", input.render());
  console.log("-", button.render());
}

function demoSingleton() {
  console.log("\n[Singleton]");
  const configA = AppConfig.getInstance();
  const configB = AppConfig.getInstance();
  configA.settings.env = "production";

  console.log("Config A:", configA.settings);
  console.log("Config B:", configB.settings);
  console.log("Cùng instance:", configA === configB);
}

function demoFactoryMethod() {
  console.log("\n[Factory Method]");
  const road = new RoadLogistics();
  const sea = new SeaLogistics();

  console.log("Road:", road.planDelivery());
  console.log("Sea:", sea.planDelivery());
}

function demoAbstractFactory() {
  console.log("\n[Abstract Factory]");
  console.log("Light theme:");
  renderLoginForm(new LightThemeFactory());

  console.log("Dark theme:");
  renderLoginForm(new DarkThemeFactory());
}

function main() {
  console.log("BÀI 1 - Singleton + Factory Method + Abstract Factory");
  demoSingleton();
  demoFactoryMethod();
  demoAbstractFactory();
}

main();
