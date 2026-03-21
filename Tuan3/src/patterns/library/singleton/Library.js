class Library {
  constructor() {
    if (Library.instance) {
      return Library.instance;
    }

    this.books = [];
    this.subscribers = [];
    Library.instance = this;
  }

  static getInstance() {
    if (!Library.instance) {
      Library.instance = new Library();
    }
    return Library.instance;
  }

  addBook(book) {
    this.books.push(book);
    this.notify("NEW_BOOK", book);
  }

  listBooks() {
    return [...this.books];
  }

  search(keyword, strategy) {
    return strategy.search(this.books, keyword);
  }

  subscribe(subscriber) {
    this.subscribers.push(subscriber);
  }

  unsubscribe(subscriber) {
    this.subscribers = this.subscribers.filter((item) => item !== subscriber);
  }

  notify(event, payload) {
    this.subscribers.forEach((subscriber) => subscriber.update(event, payload));
  }

  markOverdue(bookId) {
    const book = this.books.find((item) => item.id === bookId);
    if (!book) {
      throw new Error(`Book with id=${bookId} not found`);
    }
    this.notify("OVERDUE_BOOK", book);
  }
}

module.exports = Library;
