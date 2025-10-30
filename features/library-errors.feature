Feature: Library error handling

  Scenario: Cannot borrow unavailable book
    Given the library contains book "Design Patterns" with 0 copies
    When I try to borrow the book "Design Patterns"
    Then I should get an error message "Book is not available"
    And the user still has 0 borrowed books

  Scenario: Cannot return a book that was not borrowed
    Given the library contains book "TDD by Example" with 2 copies
    When I try to return the book "TDD by Example"
    Then I should get an error message "You have not borrowed this book"
    And the book "TDD by Example" still has 2 copies available

  Scenario: Maximum borrow limit is enforced
    Given the library contains book "Book1" with 5 copies
    And the library contains book "Book2" with 5 copies
    And the library contains book "Book3" with 5 copies
    And the library contains book "Book4" with 5 copies
    And I have borrowed the book "Book1"
    And I have borrowed the book "Book2"
    And I have borrowed the book "Book3"
    When I try to borrow the book "Book4"
    Then I should get an error message "Maximum borrow limit (3) reached"
    And the user still has 3 borrowed books
