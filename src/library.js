export class Library {
  constructor() {
    this.books = new Map();
    this.borrowedBooks = [];
    this.MAX_BORROW_LIMIT = 3;
  }

  addBook(title, copies) {
    if (this.books.has(title)) {
      const currentCopies = this.books.get(title);
      this.books.set(title, currentCopies + copies);
    } else {
      this.books.set(title, copies);
    }
  }

  getAvailableCopies(title) {
    return this.books.get(title) || 0;
  }

  borrowBook(title) {
    const availableCopies = this.getAvailableCopies(title);

    if (availableCopies === 0) {
      throw new Error('Book is not available');
    }

    if (this.borrowedBooks.length >= this.MAX_BORROW_LIMIT) {
      throw new Error(`Maximum borrow limit (${this.MAX_BORROW_LIMIT}) reached`);
    }

    this.books.set(title, availableCopies - 1);
    this.borrowedBooks.push(title);
  }

  returnBook(title) {
    const index = this.borrowedBooks.indexOf(title);

    if (index === -1) {
      throw new Error('You have not borrowed this book');
    }

    this.borrowedBooks.splice(index, 1);
    const currentCopies = this.getAvailableCopies(title);
    this.books.set(title, currentCopies + 1);
  }

  getBorrowedBooksCount() {
    return this.borrowedBooks.length;
  }

  markAsBorrowed(title) {
    this.borrowedBooks.push(title);
  }
}
