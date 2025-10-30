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

  describe('error handling', () => {
    describe('borrowBook errors', () => {
      it('should throw error when trying to borrow book with 0 copies', () => {
        library.addBook('Design Patterns', 0);
        expect(() => library.borrowBook('Design Patterns')).toThrow('Book is not available');
      });

      it('should throw error when maximum borrow limit is reached', () => {
        library.addBook('Book1', 5);
        library.addBook('Book2', 5);
        library.addBook('Book3', 5);
        library.addBook('Book4', 5);

        library.borrowBook('Book1');
        library.borrowBook('Book2');
        library.borrowBook('Book3');

        expect(() => library.borrowBook('Book4')).toThrow('Maximum borrow limit (3) reached');
      });

      it('should not change state when borrow fails due to unavailability', () => {
        library.addBook('Design Patterns', 0);
        expect(() => library.borrowBook('Design Patterns')).toThrow();
        expect(library.getBorrowedBooksCount()).toBe(0);
        expect(library.getAvailableCopies('Design Patterns')).toBe(0);
      });

      it('should not change state when borrow fails due to max limit', () => {
        library.addBook('Book1', 5);
        library.addBook('Book2', 5);
        library.addBook('Book3', 5);
        library.addBook('Book4', 5);

        library.borrowBook('Book1');
        library.borrowBook('Book2');
        library.borrowBook('Book3');

        expect(() => library.borrowBook('Book4')).toThrow();
        expect(library.getBorrowedBooksCount()).toBe(3);
        expect(library.getAvailableCopies('Book4')).toBe(5);
      });
    });

    describe('returnBook errors', () => {
      it('should throw error when trying to return book that was not borrowed', () => {
        library.addBook('TDD by Example', 2);
        expect(() => library.returnBook('TDD by Example')).toThrow('You have not borrowed this book');
      });

      it('should not change state when return fails', () => {
        library.addBook('TDD by Example', 2);
        expect(() => library.returnBook('TDD by Example')).toThrow();
        expect(library.getBorrowedBooksCount()).toBe(0);
        expect(library.getAvailableCopies('TDD by Example')).toBe(2);
      });
    });
  });
});
