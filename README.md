# Library BDD/TDD Project

A mini-application demonstrating BDD (Behavior-Driven Development) and TDD (Test-Driven Development) principles for a library book borrowing management system.

## Features

### Implemented Functionality

- **Book Borrowing**: Users can borrow books from the library
- **Book Returning**: Users can return borrowed books
- **Error Handling**:
  - Cannot borrow unavailable books (0 copies)
  - Maximum borrow limit enforced (3 books)
  - Cannot return books that weren't borrowed
- **Web Interface**: Simple HTML/JS frontend for interacting with the library

## Technology Stack

- **Runtime**: Bun
- **Testing Frameworks**:
  - Unit Tests: Vitest
  - BDD Tests: Cucumber.js
- **Language**: JavaScript (ES Modules)
- **CI/CD**: GitHub Actions
- **Containerization**: Docker + Docker Compose

## Design Decisions

### Domain Choice
- **Library book borrowing system** was chosen instead of Todo or Bank Account
- Provides real-world scenarios with clear business rules
- Easy to understand and test

### Technology Choices
- **Bun**: Fast JavaScript runtime with built-in test runner compatibility
- **Vitest**: Fast unit testing framework with modern API, works well with Bun
- **Cucumber.js**: Industry-standard BDD framework for JavaScript
- **JavaScript ES Modules**: Modern, clean syntax with native import/export

### Architecture Decisions
- **In-memory storage**: Simple Map and Array structures, no external database needed
- **Single Library class**: Simple, focused design following Single Responsibility Principle
- **Error throwing**: Errors thrown as exceptions for clear error handling
- **Maximum borrow limit (3 books)**: Reasonable constraint for testing business rules
- **Separate step definition files**: `library-steps.js` for positive scenarios, `library-errors-steps.js` for error scenarios - better organization

### Testing Strategy
- **TDD approach**: Unit tests written before implementation
- **BDD scenarios**: Written in English with Given/When/Then format
- **Test isolation**: Each scenario starts with fresh Library instance using `Before` hook
- **Comprehensive coverage**: Both positive and negative scenarios tested

## Project Structure

```
/root/kool/library-bdd-tdd/
├── src/                    # Source code
│   └── library.js         # Library class with business logic
├── tests/                  # Unit tests
│   └── library.test.js    # Vitest unit tests
├── features/               # Gherkin feature files
│   ├── borrow-books.feature      # Positive scenarios
│   └── library-errors.feature    # Negative scenarios
├── steps/                  # Cucumber step definitions
│   ├── library-steps.js          # Steps for positive scenarios
│   └── library-errors-steps.js  # Steps for error scenarios
├── public/                 # Frontend files
│   └── index.html         # Web interface
├── server.js              # HTTP server
├── .github/workflows/     # CI configuration
│   └── tests.yml          # GitHub Actions workflow
├── Dockerfile             # Docker configuration
├── docker-compose.yml     # Docker Compose setup
└── README.md              # This file
```

## Setup

### Prerequisites

- [Bun](https://bun.sh) installed
- OR [Docker](https://www.docker.com/) and Docker Compose

### Installation

#### Option 1: Local Setup

```bash
# Clone the repository
git clone https://github.com/MrKnights1/library-bdd-tdd.git
cd library-bdd-tdd

# Install dependencies
bun install
```

#### Option 2: Docker Setup

```bash
# Clone the repository
git clone https://github.com/MrKnights1/library-bdd-tdd.git
cd library-bdd-tdd

# Run with Docker Compose
docker-compose up
```

The application will be available at `http://localhost:3000`

## Running Tests

### All Tests

```bash
bun run test:all
```

### Unit Tests Only

```bash
bun test
```

### BDD Tests Only

```bash
bun run test:bdd
```

### Test Coverage

```bash
bun run test:coverage
```

## Running the Application

### Local

```bash
bun start
```

Then open `http://localhost:3000` in your browser.

### Docker

```bash
docker-compose up
```

Then open `http://localhost:3000` in your browser.

## Test Results

- **Unit Tests**: 14 tests, all passing
- **BDD Scenarios**: 5 scenarios, all passing
- **BDD Steps**: 27 steps, all passing

## Development Workflow

This project follows the BDD/TDD cycle:

1. Write `.feature` file with Gherkin scenarios (Given/When/Then)
2. Run BDD tests → RED (tests fail)
3. Write step definitions (pending)
4. Write unit tests → RED (tests fail)
5. Implement minimum code → GREEN (tests pass)
6. Refactor → GREEN (tests still pass)
7. Commit and push

## CI/CD

GitHub Actions runs automatically on every push to `main`:
- Installs dependencies with Bun
- Runs all unit tests
- Runs all BDD tests
- Verifies complete test suite

View the workflow: `.github/workflows/tests.yml`
