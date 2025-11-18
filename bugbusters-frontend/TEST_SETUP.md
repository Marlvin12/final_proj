# Test Setup Instructions

## Prerequisites

Before running tests, ensure you have:

1. Node.js 20.11.0 or higher
2. npm 10.8.2 or higher
3. All dependencies installed: `npm install`

## Initial Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Install Playwright Browsers (for E2E tests)

**Required for E2E tests only:**

```bash
npx playwright install
```

This will download Chromium, Firefox, and WebKit browsers. This is a one-time setup step.

To install only Chromium (faster, smaller download):

```bash
npx playwright install chromium
```

### 3. Verify Setup

```bash
# Run unit tests (should work immediately)
npm run test

# Run E2E tests (requires browsers installed)
npm run test:e2e
```

## Common Issues

### PostCSS Configuration Error

If you see:
```
Failed to load PostCSS config: Invalid PostCSS Plugin found at: plugins[0]
```

**Solution**: The PostCSS config has been updated to use object format. If you still see this error, ensure `postcss.config.mjs` uses:

```javascript
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};

export default config;
```

### Playwright Browsers Not Found

If you see:
```
Error: browserType.launch: Executable doesn't exist
```

**Solution**: Run `npx playwright install` to download browsers.

### Tests Failing Due to Missing Mocks

If tests fail with authentication or database errors:

1. Check that `src/test/setup.ts` exists
2. Verify mocks are properly configured
3. Ensure test files import from correct paths

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Install Playwright browsers (for E2E tests)
npx playwright install

# 3. Run unit tests
npm run test

# 4. Run E2E tests (requires dev server)
npm run dev &  # In another terminal
npm run test:e2e
```

## Troubleshooting

### Unit Tests Not Running

1. Check Node.js version: `node --version` (should be 20.11.0+)
2. Clear node_modules and reinstall: `rm -rf node_modules && npm install`
3. Check Vitest config: `vitest.config.ts`

### E2E Tests Not Running

1. Ensure browsers are installed: `npx playwright install`
2. Ensure dev server is running: `npm run dev`
3. Check Playwright config: `playwright.config.ts`
4. Try running with UI: `npm run test:e2e:ui`

### Coverage Not Generating

1. Run with coverage flag: `npm run test:coverage`
2. Check coverage directory exists: `coverage/`
3. Open HTML report: `open coverage/index.html`

## Next Steps

After setup is complete, see:
- [TESTING.md](./TESTING.md) - How to write and run tests
- [TEST_RESULTS.md](./TEST_RESULTS.md) - Test results and coverage

