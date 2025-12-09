# Testing Guide

This project uses **Vitest** for unit/component tests and **Playwright** for end-to-end (E2E) tests.

## Quick Start

```bash
# Run unit tests in watch mode
npm run test

# Run unit tests once (CI mode)
npm run test:run

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui

# Debug E2E tests
npm run test:e2e:debug
```

## Unit Testing with Vitest

### Writing Tests

Tests are colocated with components in `__tests__` directories:

```
src/
  components/
    MyComponent.tsx
    __tests__/
      MyComponent.test.tsx
```

### Example Component Test

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test-utils';
import MyComponent from '../MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

### Custom Render Function

Always use the custom `render` from `test-utils` instead of importing directly from `@testing-library/react`. This ensures components are wrapped with necessary providers (MUI Theme, etc.):

```typescript
import { render, screen } from '../../test-utils';
```

### Mocking Firebase

For tests that interact with Firebase, use the provided mocks:

```typescript
import { vi } from 'vitest';
import { setupFirebaseMocks } from '../../test-utils/firebase-mocks';

// In your test file
vi.mock('../../firebase', () => ({
  db: mockFirestore,
  auth: mockAuth,
}));
```

## E2E Testing with Playwright

### Writing E2E Tests

E2E tests live in `tests/e2e/`:

```
tests/
  e2e/
    login.spec.ts
    game-submission.spec.ts
```

### Example E2E Test

```typescript
import { test, expect } from '@playwright/test';

test('user can login', async ({ page }) => {
  await page.goto('/');

  await page.getByLabel(/email/i).fill('test@example.com');
  await page.getByLabel(/password/i).fill('password123');
  await page.getByRole('button', { name: /login/i }).click();

  await expect(page.getByText(/you:/i)).toBeVisible();
});
```

### Running Specific Tests

```bash
# Run specific test file
npm run test:e2e -- login.spec.ts

# Run tests matching a pattern
npm run test:e2e -- --grep "login"

# Run in headed mode (see browser)
npm run test:e2e -- --headed
```

## Best Practices

### Unit Tests

1. **Test behavior, not implementation** - Focus on what the component does, not how it does it
2. **Use semantic queries** - Prefer `getByRole`, `getByLabelText` over `getByTestId`
3. **Mock external dependencies** - Always mock Firebase, API calls, etc.
4. **Keep tests focused** - One assertion per test when possible
5. **Use descriptive test names** - Make it clear what's being tested

### E2E Tests

1. **Test user flows** - Focus on complete user journeys
2. **Use page object pattern** - For complex pages, create page objects
3. **Wait for elements** - Use Playwright's auto-waiting, avoid manual timeouts
4. **Test critical paths first** - Login, core features, checkout flows
5. **Keep tests independent** - Each test should be able to run alone

## Coverage

Coverage reports are generated in the `coverage/` directory:

```bash
npm run test:coverage
```

Open `coverage/index.html` in your browser to view the detailed report.

### Coverage Goals

- **Statements**: 80%+
- **Branches**: 75%+
- **Functions**: 80%+
- **Lines**: 80%+

## Debugging

### Debugging Unit Tests

```bash
# Run tests in UI mode for interactive debugging
npm run test:ui
```

### Debugging E2E Tests

```bash
# Run in debug mode with Playwright Inspector
npm run test:e2e:debug

# Or run specific test in debug mode
npm run test:e2e:debug -- login.spec.ts
```

## CI/CD Integration

Tests are configured to run in CI environments:

- Vitest runs in CI mode (no watch, single run)
- Playwright uses fewer workers and retries failed tests
- Screenshots and traces are captured on failure

## Troubleshooting

### "Cannot find module" errors

Make sure you've installed all dependencies:

```bash
npm install
```

### Playwright browser errors

Install Playwright browsers:

```bash
npx playwright install
```

### Firebase mock errors

Ensure you're using the mocks from `test-utils/firebase-mocks.ts` and not importing real Firebase in tests.

### Port already in use

If the dev server port (5173) is already in use, either:

1. Stop the running dev server
2. Change the port in `vite.config.ts` and `playwright.config.ts`

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Playwright Documentation](https://playwright.dev/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
