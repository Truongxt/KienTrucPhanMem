class UIComponent {
  constructor(name) {
    this.name = name;
  }

  render() {
    throw new Error("Method render() must be implemented");
  }
}

module.exports = UIComponent;
