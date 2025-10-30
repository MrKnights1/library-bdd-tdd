Feature: Book borrowing management

  Scenario: Borrowing a book reduces availability
    Given the library contains book "Clean Code" with 3 copies
    When I borrow the book "Clean Code"
    Then the book "Clean Code" has 2 copies available
    And the user has 1 borrowed book

  Scenario: Returning a book increases availability
    Given the library contains book "Refactoring" with 1 copy
    And I have borrowed the book "Refactoring"
    When I return the book "Refactoring"
    Then the book "Refactoring" has 2 copies available
    And the user has 0 borrowed books
