const LibrarySubscriber = require("./LibrarySubscriber");

class UserFollower extends LibrarySubscriber {
  constructor(name) {
    super();
    this.name = name;
  }

  update(event, payload) {
    console.log(`[User ${this.name}] event=${event} payload=${payload.title}`);
  }
}

module.exports = UserFollower;
