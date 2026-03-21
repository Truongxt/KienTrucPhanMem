const UIComponent = require("./UIComponent");

class UIGroup extends UIComponent {
  constructor(name) {
    super(name);
    this.children = [];
  }

  add(component) {
    this.children.push(component);
  }

  render(indent = 0) {
    const prefix = " ".repeat(indent);
    console.log(`${prefix}+ Group: ${this.name}`);
    this.children.forEach((child) => child.render(indent + 2));
  }
}

module.exports = UIGroup;
