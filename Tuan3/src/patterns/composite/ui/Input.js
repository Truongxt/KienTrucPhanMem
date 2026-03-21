const UIComponent = require("./UIComponent");

class Input extends UIComponent {
  render(indent = 0) {
    const prefix = " ".repeat(indent);
    console.log(`${prefix}- Input: ${this.name}`);
  }
}

module.exports = Input;
