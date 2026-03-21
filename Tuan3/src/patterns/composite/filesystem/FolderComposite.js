const FileSystemComponent = require("./FileSystemComponent");

class FolderComposite extends FileSystemComponent {
  constructor(name) {
    super(name);
    this.children = [];
  }

  add(component) {
    this.children.push(component);
  }

  remove(componentName) {
    this.children = this.children.filter((child) => child.name !== componentName);
  }

  show(indent = 0) {
    const prefix = " ".repeat(indent);
    console.log(`${prefix}+ Folder: ${this.name}`);
    this.children.forEach((child) => child.show(indent + 2));
  }
}

module.exports = FolderComposite;
