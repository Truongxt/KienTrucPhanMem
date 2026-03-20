const { LightButton, DarkButton, LightInput, DarkInput } = require("./components");

class UIFactory {
  createButton() {
    throw new Error("createButton() chưa được cài đặt");
  }

  createInput() {
    throw new Error("createInput() chưa được cài đặt");
  }
}

class LightThemeFactory extends UIFactory {
  createButton() {
    return new LightButton();
  }

  createInput() {
    return new LightInput();
  }
}

class DarkThemeFactory extends UIFactory {
  createButton() {
    return new DarkButton();
  }

  createInput() {
    return new DarkInput();
  }
}

module.exports = { UIFactory, LightThemeFactory, DarkThemeFactory };
