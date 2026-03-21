const FileSystemComponent = require("./FileSystemComponent");

class FileLeaf extends FileSystemComponent {
  constructor(name, sizeKb) {
    super(name);
    this.sizeKb = sizeKb;
  }

  show(indent = 0) {
    const prefix = " ".repeat(indent);
    console.log(`${prefix}- File: ${this.name} (${this.sizeKb}KB)`);
  }
}

module.exports = FileLeaf;
