const Subject = require("../core/Subject");

class Task extends Subject {
  constructor(id, title, status = "Todo") {
    super();
    this.id = id;
    this.title = title;
    this.status = status;
  }

  setStatus(newStatus) {
    this.status = newStatus;
    this.notify({ id: this.id, title: this.title, status: this.status });
  }
}

module.exports = Task;
