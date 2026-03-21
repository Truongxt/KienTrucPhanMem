const UIComponent = require("./UIComponent");

class Button extends UIComponent {
  render(indent = 0) {
    const prefix = " ".repeat(indent);
    console.log(`${prefix}- Button: ${this.name}`);
  }
}

module.exports = Button;
