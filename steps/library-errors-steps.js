import { When, Then } from '@cucumber/cucumber';
import assert from 'assert';

When('I try to borrow the book {string}', function (bookTitle) {
  try {
    this.library.borrowBook(bookTitle);
    this.lastError = null;
  } catch (error) {
    this.lastError = error.message;
  }
});

When('I try to return the book {string}', function (bookTitle) {
  try {
    this.library.returnBook(bookTitle);
    this.lastError = null;
  } catch (error) {
    this.lastError = error.message;
  }
});

Then('I should get an error message {string}', function (expectedError) {
  assert.strictEqual(this.lastError, expectedError,
    `Expected error "${expectedError}", but got "${this.lastError}"`);
});

Then('the user still has {int} borrowed books', function (expectedCount) {
  const actualCount = this.library.getBorrowedBooksCount();
  assert.strictEqual(actualCount, expectedCount,
    `Expected ${expectedCount} borrowed books, but got ${actualCount}`);
});

Then('the book {string} still has {int} copies available', function (bookTitle, expectedCopies) {
  const actualCopies = this.library.getAvailableCopies(bookTitle);
  assert.strictEqual(actualCopies, expectedCopies,
    `Expected ${expectedCopies} copies of "${bookTitle}", but got ${actualCopies}`);
});
