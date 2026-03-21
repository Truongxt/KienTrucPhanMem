const Button = require("./Button");
const Input = require("./Input");
const UIGroup = require("./UIGroup");

function runCompositeUIDemo() {
  const page = new UIGroup("MainPage");
  const navbar = new UIGroup("Navbar");
  const dialog = new UIGroup("SearchDialog");

  navbar.add(new Button("Home"));
  navbar.add(new Button("Library"));

  dialog.add(new Input("SearchInput"));
  dialog.add(new Button("SearchButton"));

  page.add(navbar);
  page.add(dialog);

  page.render();
}

module.exports = { runCompositeUIDemo };
