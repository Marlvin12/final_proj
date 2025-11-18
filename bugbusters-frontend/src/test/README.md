# Testing Guide

This directory contains all test files for the Bug Busters Entrepreneurial Hub application.

## Test Structure

```
src/test/
├── setup.ts                    # Global test configuration and mocks
├── unit/                       # Unit tests for individual functions/components
│   ├── utils.test.ts          # Utility function tests
│   ├── database.test.ts       # Database function tests
│   ├── api-routes.test.ts     # API route handler tests
│   ├── hooks.test.ts          # React hook tests
│   └── components.test.tsx    # Component tests
└── integration/                # Integration tests
    ├── api-database.test.ts   # API-Database integration tests
    └── component-api.test.tsx # Component-API integration tests
```

## Running Tests

### Unit and Integration Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test -- --watch

# Run tests with UI
npm run test:ui

# Run tests with coverage report
npm run test:coverage
```

### E2E Tests

```bash
# Run E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui

# Run E2E tests in headed mode
npm run test:e2e -- --headed
```

## Writing Tests

### Unit Test Example

```typescript
import { describe, it, expect } from 'vitest';

describe('MyFunction', () => {
  it('should do something', () => {
    const result = myFunction(input);
    expect(result).toBe(expected);
  });
});
```

### Component Test Example

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent prop="value" />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

### E2E Test Example

```typescript
import { test, expect } from '@playwright/test';

test('should navigate to page', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page).toHaveURL(/.*dashboard/);
});
```

## Test Coverage Goals

- Unit Tests: 90%+ coverage
- Integration Tests: 85%+ coverage
- E2E Tests: Cover all critical user flows

## Best Practices

1. **Test Behavior, Not Implementation**: Focus on what the code does, not how it does it
2. **Use Descriptive Names**: Test names should clearly describe what is being tested
3. **Arrange-Act-Assert**: Structure tests with clear sections
4. **Mock External Dependencies**: Use mocks for API calls, database, etc.
5. **Test Edge Cases**: Include tests for error conditions and boundary cases
6. **Keep Tests Fast**: Unit tests should run quickly
7. **Isolate Tests**: Each test should be independent and not rely on others

## Mocking

Common mocks are set up in `setup.ts`:
- Clerk authentication
- Supabase database client
- Global fetch
- Window.matchMedia

## Troubleshooting

### Tests failing due to missing mocks
- Check `setup.ts` for required mocks
- Add mocks in test file if needed

### E2E tests timing out
- Increase timeout in Playwright config
- Check if dev server is running
- Verify selectors are correct

### Coverage not showing
- Run `npm run test:coverage`
- Check `vitest.config.ts` exclude patterns
- Ensure files are not excluded

