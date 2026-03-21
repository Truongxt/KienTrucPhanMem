class FileSystemComponent {
  constructor(name) {
    this.name = name;
  }

  show() {
    throw new Error("Method show() must be implemented");
  }
}

module.exports = FileSystemComponent;
