const LibrarySubscriber = require("./LibrarySubscriber");

class LibraryStaff extends LibrarySubscriber {
  constructor(name) {
    super();
    this.name = name;
  }

  update(event, payload) {
    console.log(`[Staff ${this.name}] event=${event} payload=${payload.title}`);
  }
}

module.exports = LibraryStaff;
