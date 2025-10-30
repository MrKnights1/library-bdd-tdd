export class Library {
  constructor() {
    this.books = new Map();
    this.borrowedBooks = [];
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
    if (availableCopies > 0) {
      this.books.set(title, availableCopies - 1);
      this.borrowedBooks.push(title);
    }
  }

  returnBook(title) {
    const index = this.borrowedBooks.indexOf(title);
    if (index > -1) {
      this.borrowedBooks.splice(index, 1);
      const currentCopies = this.getAvailableCopies(title);
      this.books.set(title, currentCopies + 1);
    }
  }

  getBorrowedBooksCount() {
    return this.borrowedBooks.length;
  }

  markAsBorrowed(title) {
    this.borrowedBooks.push(title);
  }
}
