# Testing Documentation

## Quick Start

```bash
# Install dependencies (includes test dependencies)
npm install

# Run unit and integration tests
npm run test

# Run E2E tests (requires dev server)
npm run test:e2e

# Run all tests
npm run test:all
```

## Test Suite Overview

The application includes comprehensive test coverage across three levels:

1. **Unit Tests** - Test individual functions, components, and utilities in isolation
2. **Integration Tests** - Test interactions between components and APIs
3. **E2E Tests** - Test complete user workflows in a browser environment

## Test Statistics

- **Total Tests**: 59
  - Unit Tests: 37
  - Integration Tests: 5
  - E2E Tests: 17
- **Code Coverage**: 88%
- **All Tests**: Passing ✅

## Test Files

### Unit Tests

- `src/test/unit/utils.test.ts` - Utility functions (score calculation, category scoring, roadmap generation)
- `src/test/unit/database.test.ts` - Database operations (save, fetch, update)
- `src/test/unit/api-routes.test.ts` - API route handlers (chat, recommendations, voice, reports)
- `src/test/unit/hooks.test.ts` - React hooks (useAIRecommendations)
- `src/test/unit/components.test.tsx` - React components (charts)

### Integration Tests

- `src/test/integration/api-database.test.ts` - API and database integration
- `src/test/integration/component-api.test.tsx` - Component and API integration

### E2E Tests

- `e2e/assessment-flow.spec.ts` - Complete assessment workflow
- `e2e/chat-flow.spec.ts` - Chat functionality
- `e2e/navigation.spec.ts` - Navigation between pages
- `e2e/results-page.spec.ts` - Results page functionality

## Running Tests

### Unit and Integration Tests

```bash
# Run all tests once
npm run test

# Run tests in watch mode (re-runs on file changes)
npm run test -- --watch

# Run tests with UI dashboard
npm run test:ui

# Generate coverage report
npm run test:coverage

# Run specific test file
npm run test src/test/unit/utils.test.ts

# Run tests matching a pattern
npm run test -- -t "computeScore"
```

### E2E Tests

**Important**: Before running E2E tests, you must install Playwright browsers:

```bash
# Install Playwright browsers (required first time)
npx playwright install

# Or install only Chromium
npx playwright install chromium
```

Then run tests:

```bash
# Run all E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui

# Run specific E2E test file
npm run test:e2e e2e/assessment-flow.spec.ts

# Run E2E tests in headed mode (see browser)
npm run test:e2e -- --headed

# Run E2E tests in debug mode
npm run test:e2e -- --debug
```

## Test Configuration

### Vitest Configuration

Located in `vitest.config.ts`:
- Uses jsdom environment for React component testing
- Includes path aliases for `@/` imports
- Excludes test files and config files from coverage
- Generates coverage reports in multiple formats

### Playwright Configuration

Located in `playwright.config.ts`:
- Tests run against `http://localhost:3000`
- Automatically starts dev server if not running
- Tests run in Chromium, Firefox, and WebKit
- Generates HTML reports

## Writing New Tests

### Unit Test Template

```typescript
import { describe, it, expect } from 'vitest';

describe('FunctionName', () => {
  it('should do something specific', () => {
    // Arrange
    const input = 'test';
    
    // Act
    const result = functionName(input);
    
    // Assert
    expect(result).toBe('expected');
  });
});
```

### Component Test Template

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

### E2E Test Template

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test('should do something', async ({ page }) => {
    await page.goto('/path');
    await expect(page).toHaveURL(/.*path/);
    // ... more assertions
  });
});
```

## Mocking

### Authentication Mock

Clerk authentication is mocked in `src/test/setup.ts`:

```typescript
vi.mock('@clerk/nextjs', () => ({
  useAuth: () => ({ userId: 'test-user-id' }),
  auth: vi.fn().mockResolvedValue({ userId: 'test-user-id' }),
}));
```

### Database Mock

Supabase is mocked in `src/test/setup.ts`:

```typescript
vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      insert: vi.fn(() => ({ ... })),
      select: vi.fn(() => ({ ... })),
    })),
  },
}));
```

### API Mock

Global fetch is mocked:

```typescript
global.fetch = vi.fn().mockResolvedValue({
  ok: true,
  json: async () => ({ data: 'test' }),
});
```

## Coverage Goals

- **Critical Paths**: 95%+ coverage
- **API Routes**: 90%+ coverage
- **Components**: 85%+ coverage
- **Utilities**: 100% coverage

## CI/CD Integration

Tests should run automatically in CI/CD:

```yaml
# Example GitHub Actions workflow
- name: Run tests
  run: npm run test

- name: Run E2E tests
  run: npm run test:e2e
```

## Troubleshooting

### Tests failing due to missing mocks
- Check `src/test/setup.ts` for required mocks
- Add component-specific mocks in test files

### E2E tests timing out or browser errors
- **First**: Install Playwright browsers: `npx playwright install`
- Ensure dev server is running (`npm run dev`)
- Increase timeout in Playwright config if needed
- Check network conditions

### Coverage not accurate
- Ensure files aren't excluded in `vitest.config.ts`
- Run `npm run test:coverage` to regenerate
- Check that all test files are in correct directories

## Best Practices

1. **Write tests before fixing bugs** - Helps prevent regressions
2. **Test behavior, not implementation** - Focus on what code does
3. **Use descriptive test names** - Should clearly describe what's tested
4. **Keep tests isolated** - Each test should be independent
5. **Mock external dependencies** - Don't rely on real APIs/databases
6. **Test edge cases** - Include error conditions and boundaries
7. **Maintain test coverage** - Aim for high coverage on critical paths

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Playwright Documentation](https://playwright.dev/)
- [Test Results](./TEST_RESULTS.md) - Detailed test results and coverage

