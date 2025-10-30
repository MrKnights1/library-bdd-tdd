import { describe, it, expect, beforeEach } from 'vitest';
import { Library } from '../src/library.js';

describe('Library', () => {
  let library;

  beforeEach(() => {
    library = new Library();
  });

  describe('addBook', () => {
    it('should add a book with specified number of copies', () => {
      library.addBook('Clean Code', 3);
      expect(library.getAvailableCopies('Clean Code')).toBe(3);
    });

    it('should track multiple different books', () => {
      library.addBook('Clean Code', 3);
      library.addBook('Refactoring', 1);
      expect(library.getAvailableCopies('Clean Code')).toBe(3);
      expect(library.getAvailableCopies('Refactoring')).toBe(1);
    });
  });

  describe('borrowBook', () => {
    it('should reduce available copies when borrowing', () => {
      library.addBook('Clean Code', 3);
      library.borrowBook('Clean Code');
      expect(library.getAvailableCopies('Clean Code')).toBe(2);
    });

    it('should increase user borrowed books count', () => {
      library.addBook('Clean Code', 3);
      library.borrowBook('Clean Code');
      expect(library.getBorrowedBooksCount()).toBe(1);
    });

    it('should allow borrowing multiple books', () => {
      library.addBook('Clean Code', 3);
      library.addBook('Refactoring', 2);
      library.borrowBook('Clean Code');
      library.borrowBook('Refactoring');
      expect(library.getBorrowedBooksCount()).toBe(2);
      expect(library.getAvailableCopies('Clean Code')).toBe(2);
      expect(library.getAvailableCopies('Refactoring')).toBe(1);
    });
  });

  describe('returnBook', () => {
    it('should increase available copies when returning', () => {
      library.addBook('Refactoring', 1);
      library.markAsBorrowed('Refactoring');
      library.returnBook('Refactoring');
      expect(library.getAvailableCopies('Refactoring')).toBe(2);
    });

    it('should decrease user borrowed books count', () => {
      library.addBook('Refactoring', 1);
      library.markAsBorrowed('Refactoring');
      library.returnBook('Refactoring');
      expect(library.getBorrowedBooksCount()).toBe(0);
    });
  });

  describe('markAsBorrowed', () => {
    it('should add book to borrowed list without changing available copies', () => {
      library.addBook('Refactoring', 1);
      library.markAsBorrowed('Refactoring');
      expect(library.getAvailableCopies('Refactoring')).toBe(1);
      expect(library.getBorrowedBooksCount()).toBe(1);
    });
  });
});
