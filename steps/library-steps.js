import { Given, When, Then, Before } from '@cucumber/cucumber';
import { Library } from '../src/library.js';
import assert from 'assert';

Before(function () {
  this.library = new Library();
});

Given('the library contains book {string} with {int} copy', function (bookTitle, copies) {
  this.library.addBook(bookTitle, copies);
});

Given('the library contains book {string} with {int} copies', function (bookTitle, copies) {
  this.library.addBook(bookTitle, copies);
});

Given('I have borrowed the book {string}', function (bookTitle) {
  this.library.markAsBorrowed(bookTitle);
});

When('I borrow the book {string}', function (bookTitle) {
  this.library.borrowBook(bookTitle);
});

When('I return the book {string}', function (bookTitle) {
  this.library.returnBook(bookTitle);
});

Then('the book {string} has {int} copies available', function (bookTitle, expectedCopies) {
  const actualCopies = this.library.getAvailableCopies(bookTitle);
  assert.strictEqual(actualCopies, expectedCopies,
    `Expected ${expectedCopies} copies of "${bookTitle}", but got ${actualCopies}`);
});

Then('the user has {int} borrowed book', function (expectedCount) {
  const actualCount = this.library.getBorrowedBooksCount();
  assert.strictEqual(actualCount, expectedCount,
    `Expected ${expectedCount} borrowed books, but got ${actualCount}`);
});

Then('the user has {int} borrowed books', function (expectedCount) {
  const actualCount = this.library.getBorrowedBooksCount();
  assert.strictEqual(actualCount, expectedCount,
    `Expected ${expectedCount} borrowed books, but got ${actualCount}`);
});
