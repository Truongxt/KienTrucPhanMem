class Subject {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter((item) => item !== observer);
  }

  notify(data) {
    this.observers.forEach((observer) => observer.update(data));
  }
}

module.exports = Subject;
