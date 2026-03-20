class AppConfig {
  constructor() {
    if (AppConfig.instance) {
      return AppConfig.instance;
    }
    this.settings = {
      appName: "DesignPatternApp",
      version: "1.0.0",
      env: "development"
    };
    AppConfig.instance = this;
  }

  static getInstance() {
    if (!AppConfig.instance) {
      AppConfig.instance = new AppConfig();
    }
    return AppConfig.instance;
  }
}

module.exports = { AppConfig };
