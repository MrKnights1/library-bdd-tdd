# CLAUDE.md

## Development Workflow

### Claude Workflow

When asked to change project source code or database dump:

1. Ask: "Should we create a GitHub issue for this?"
2. If yes:
   - Create issue using `gh issue create` (follow templates below)
   - Pull latest changes from origin using --rebase
   - Create branch `XX-short-descr` (XX = issue number). Do not ask the user for the name of the branch.
   - Implement and commit changes to branch
   - Ask: "Is there anything else you want to change, or should I squash merge this to main and close issue #XX?"
   - If changes needed: make additional commits
   - If complete: squash merge to main with proper commit message (see Commit Guidelines)
   - Push
   - If push was successful, delete the branch (both locally and on Github)

### Issue Creation

```bash
gh issue create --title "Title" --body "Description"
```

**Feature:**
Title: `As a [role] I [can/want to] [action] so that [benefit]`
Body:

```
As a [role] I [can/want to] [action] so that [benefit]`

Acceptance criteria:
- Each criterion is one sentence on its own line
- Start with capital letter, describe expected behavior
- No numbering, no Given/When/Then format
- Keep simple, declarative, and testable
```

Example acceptance criteria:

```
- There is a new menu item called "Logs" in the main menu
- Clicking that takes to /logs which shows a list of events
- The most recent events are on the top
```

**Bug:**
Title: `[Brief description]`
Labels: `bug`
Body:

```
1. [Reproduction steps]
Expected: [What should happen]
Actual: [What happens]
```

### Implementation

- Branch: `XX-short-description` (XX = issue number)
- Make commits on branch with simple, descriptive messages
- Squash merge to main when complete with proper commit message

## Commit Guidelines

**IMPORTANT: There are TWO separate commit workflows**

### Workflow 1: Branch Commits (Work in Progress)

Use this when committing changes while working on a feature branch:

**Purpose:** Save progress, checkpoint work, easy to understand what changed

**Format:** Simple, descriptive messages

**Examples:**

- `Add event history modal UI`
- `Implement move tracking with from/to locations`
- `Update README with setup instructions`
- `Fix styling on modal dialog`

**Rules:**

- Keep it simple and descriptive
- Commit frequently as you work
- NO "Closes #XX" needed
- NO formal format required

**Bad examples:**

- `wip`
- `fixed stuff`
- `updates`

### Workflow 2: Squash Merge to Main (Final Commit)

Use this ONLY when squash merging the completed feature to main:

**Purpose:** Create clean, meaningful history on main branch that closes the issue

**Format:**

- Features: `As a [role] I [action] so that [benefit]\nCloses #XX`
- Fixes: `Fix: [description]\nCloses #XX`
- Refactor: `Refactor: [description]`
- Style: `Style: [description]`
- Revert: `Revert "[Original commit message]"`
- Simple: `[brief description]`

**Rules:**

- ALWAYS include `Closes #XX` on separate line when resolving issues
- NEVER include "Co-Authored-By: Claude" or any Claude attribution
- Use detailed commit body for complex changes:

  ```
  Fix: Return proper error message for unauthorized AJAX requests
  Closes #123

  - Changed empty array response to include 'Authorization required' message
  - Updated error handling middleware
  ```

**Good examples:**

- `Fix: Cache busting for js files\nCloses #73`
- `As a student I can see my learning outcomes\nCloses #80`

**Bad examples:**

- `wip`
- `fixed stuff`
- `updates`

## Verification Standards

**IMPORTANT: NEVER claim something is working, running, or accessible unless you have actually verified it**

- NEVER say "the app is running on port X" unless you ran it and verified no errors
- NEVER claim "tests are passing" unless you actually ran the tests and saw them pass
- NEVER say "accessible" unless you tested accessibility features
- NEVER claim "deployed successfully" unless you verified the deployment worked
- ALWAYS run and test before claiming functionality works
- If something fails during verification, report the actual error - don't claim it works
- Example: Don't say "Docker is running on port 3000" unless you ran `docker compose up` and verified it started without errors

## Security Guidelines

**IMPORTANT: Always follow best security practices when writing code**

### Data Protection

- NEVER store passwords, API keys, tokens, or secrets in plain text
- ALWAYS use environment variables for secrets (process.env.SECRET_NAME)
- NEVER hardcode secrets in source code
- ALWAYS check .gitignore includes .env, .env.local, and similar files
- ALWAYS hash passwords using bcrypt with minimum 10 rounds before storing in database
- Use separate environment variables for different environments (dev, staging, production)

### Input Validation

- ALWAYS use parameterized queries or ORM methods to prevent SQL injection
- NEVER concatenate user input directly into SQL queries
- ALWAYS validate user input type (string, number, email, etc.)
- ALWAYS validate input length (min/max characters)
- ALWAYS validate input format using regex or validation libraries (zod, joi, yup)
- ALWAYS sanitize HTML output to prevent XSS (escape <, >, &, ", ')
- ALWAYS validate file upload types by checking file content, not just extension
- ALWAYS limit file upload sizes (e.g., max 5MB for images)

### Authentication & Authorization

- ALWAYS verify user is authenticated before processing protected requests
- ALWAYS verify user has permission to access requested resource
- ALWAYS use secure session cookies (httpOnly: true, secure: true, sameSite: 'strict')
- ALWAYS implement rate limiting on login endpoints (e.g., 5 attempts per 15 minutes)
- ALWAYS require strong passwords (min 8 chars, uppercase, lowercase, number, symbol)
- Follow principle of least privilege: users should only access what they need
- NEVER trust client-side authorization checks, always verify server-side

### Network Security

- Configure CORS to allow only specific origins (NEVER use '\*' in production)
- ALWAYS set security headers:
  - Content-Security-Policy: restrict resource loading
  - X-Frame-Options: DENY (prevent clickjacking)
  - X-Content-Type-Options: nosniff
  - Strict-Transport-Security: max-age=31536000
- ALWAYS implement CSRF protection for state-changing requests (POST, PUT, DELETE)
- Use CSRF tokens or double-submit cookie pattern

### Error Handling

- NEVER expose stack traces to users (only show in development logs)
- NEVER expose internal paths, database structure, or technology details in errors
- ALWAYS return generic error messages to users (e.g., "Invalid credentials" not "Password incorrect")
- ALWAYS log detailed security events server-side (failed logins, unauthorized access attempts)
- Use try-catch blocks to handle errors gracefully

### Maintenance

- Run `bun update` regularly to keep dependencies updated
- Run `bun audit` to check for known vulnerabilities in dependencies
- Review code for security issues before merging to main
- Test authentication flows with invalid credentials and expired sessions
- Test authorization by attempting to access resources without permission

## Code Quality Standards

- Write self-documenting code with clear variable names

## Project Structure Guidelines

**IMPORTANT: ALWAYS place files in their correct directories following the project structure**

### Standard Directory Organization

- `/src` - All source code files
  - `/components` - Reusable UI components
  - `/pages` or `/routes` - Page-level components and route handlers
  - `/lib` or `/utils` - Utility functions and helpers
  - `/services` - Business logic and external service integrations
  - `/hooks` - Custom React hooks (if using React)
  - `/types` - TypeScript type definitions and interfaces
  - `/constants` - Application constants and configuration
  - `/styles` - Global styles and theme files
  - `/assets` - Static assets (images, fonts, icons)
- `/public` - Publicly accessible static files (favicon, robots.txt, etc.)
- `/tests` or `/src/__tests__` - Test files
- `/migrations` - Database migration files
- `/scripts` - Build scripts, utilities, and automation
- `/config` - Configuration files for different environments
- `/docs` - Project documentation

### File Placement Rules

- ALWAYS place components in `/src/components`
- ALWAYS place utility functions in `/src/lib` or `/src/utils`
- ALWAYS place API routes/handlers in `/src/routes` or `/src/pages/api`
- ALWAYS place database models in `/src/models`
- ALWAYS place middleware in `/src/middleware`
- ALWAYS place type definitions in `/src/types` (for shared types)
- ALWAYS place test files next to the files they test OR in `/tests` directory
- NEVER place source code files in root directory
- NEVER place configuration files inside `/src` (except module-specific configs)

### Public vs Source Assets

**Use `/public` for:**

- Files that need exact URLs (favicon.ico, robots.txt, sitemap.xml)
- Files served directly without processing (manifest.json, browserconfig.xml)
- Static files referenced in HTML meta tags or external services
- Large media files that shouldn't be bundled
- Files that must keep their exact filename (og-image.png at specific path)

**Use `/src/assets` for:**

- Images imported in components (will be processed/optimized by bundler)
- Fonts loaded via CSS @font-face
- Icons and images that benefit from bundling and hashing
- SVGs imported as components
- Assets that should be optimized and cache-busted

**Rule of thumb:** If the file needs to be at a specific URL path and referenced externally, use `/public`. If it's imported/used by your source code, use `/src/assets`.

### Configuration Files

- Root level: `package.json`, `tsconfig.json`, `.env.example`, `.gitignore`, `README.md`
- Framework configs: `vite.config.ts`, `next.config.js`, etc. in root
- Tool configs: `.eslintrc`, `.prettierrc`, `jest.config.js` in root

### Naming Conventions

- Use lowercase with hyphens for directories: `user-profile`, `api-client`
- Use PascalCase for component files: `UserProfile.js`, `Button.js`
- Use camelCase for utility/function files: `formatDate.ts`, `apiClient.ts`
- Use `.test.ts`, `.spec.ts` or `.e2e.ts` suffix for test files
- Use descriptive names that indicate purpose

### Organization Principles

- Group by feature when project grows large (e.g., `/src/features/auth`, `/src/features/dashboard`)
- Keep related files close together
- Avoid deep nesting (max 3-4 levels)
- Separate concerns: UI components, business logic, data access
- One component/function per file (with exceptions for small, tightly coupled helpers)

### Before Creating New Files

1. Check if file belongs in existing directory structure
2. Verify you're not duplicating existing functionality
3. Follow the established patterns in the codebase
4. Place the file in the correct directory from the start

## Testing Requirements

- Write tests for all business logic and critical paths
- Minimum test coverage percentage (e.g., 80%)
- Test file naming convention (e.g., `*.test.ts` or `*.spec.ts`)
- Always test edge cases and error conditions
- Include integration tests for API endpoints

## Database Guidelines

- ALWAYS create migration files for schema changes
- NEVER modify database directly in production
- Name migrations with sequential number, description, and branch/feature indicator (e.g., `001_add_user_roles_73-user-auth.sql` or `002_create_events_table_45-event-logging.sql`)
- Add indexes for frequently queried columns
- Use transactions for multi-step operations
- Test migrations on copy of production data
- Keep database queries optimized (avoid N+1 queries)
- Document schema changes in migration comments

## API Design Standards

- Use RESTful conventions (GET, POST, PUT, PATCH, DELETE) preferring to PATCH
- Use plural nouns for endpoints (`/users`, not `/user`)
- Return proper HTTP status codes (200, 201, 400, 401, 404, 500)
- Use consistent response format (e.g., `{ data, error, message }`)
- Document all endpoints with examples

## Logging Standards

- Log all security events (authentication, authorization failures)
- Use appropriate log levels (debug, info, warn, error)
- Include request IDs for tracing
- NEVER log sensitive data (passwords, tokens, credit cards)
- Use structured logging (JSON format)
- Include timestamps and context in logs

## Accessibility

- All interactive elements keyboard accessible
- Proper semantic HTML tags used
- ARIA labels for screen readers
- Color contrast meets WCAG AA standards
- Form validation provides clear error messages
- Images have alt text

## Documentation Requirements

- Update README.md when adding new features or changing setup
- Document all environment variables in `.env.example`
- Keep API documentation up to date with actual implementation
- Include setup instructions for new developers

## UI/UX Consistency

- Use consistent spacing (e.g., 4px, 8px, 16px, 24px, 32px)
- Use design system/component library for consistency
- Keep button styles and colors consistent
- Use consistent loading states (spinners, skeletons)
- Provide feedback for all user actions
- Keep forms consistent (labels, validation, error display)

## Code Cleanup Guidelines

**IMPORTANT: After any code change or refactor:**

- ALWAYS remove unused imports and dependencies
- ALWAYS delete commented-out code (use git history if you need it later)
- ALWAYS remove unused variables, functions, and classes
- ALWAYS remove debug console.log statements before committing
- ALWAYS clean up temporary test code
- Delete unused files (orphaned components, old modules)
- Remove unused CSS classes and styles
- Remove completed TODO comments
- Remove dead code paths (unreachable code after refactor)
- Update or remove outdated comments
- Remove unused environment variables from `.env.example`
- Run linter to catch unused code (`bun run lint`)
- Check for unused dependencies with `bun pm ls --unused` or similar
- Remove unused database migrations (carefully!)
- Clean up unused API endpoints
- Remove unused types/interfaces
