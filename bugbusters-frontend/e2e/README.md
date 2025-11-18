# E2E Test Setup

## Authentication Setup

E2E tests require authentication to access protected dashboard routes. The test suite uses Playwright's authentication state persistence to handle this.

### First-Time Setup

On the first run of E2E tests, you'll need to authenticate once:

1. **Run the tests** (this will trigger the global setup):
   ```bash
   npm run test:e2e
   ```

2. **A browser window will open** - Sign in with your Clerk account

3. **Wait for redirect** - Once you're redirected to the dashboard, the authentication state will be saved automatically

4. **Close the browser** - The setup will complete and save your session

5. **Future test runs** - Will use the saved authentication state automatically

### Authentication State

- **Location**: `e2e/.auth/user.json`
- **Purpose**: Stores cookies and session data for authenticated requests
- **Git**: This file is ignored (see `.gitignore`) as it contains session data

### Troubleshooting

#### Tests still redirecting to sign-in

1. **Delete the auth state file**:
   ```bash
   rm -rf e2e/.auth
   ```

2. **Re-run the setup** (follow first-time setup steps above)

#### Authentication expired

If your Clerk session expires:

1. Delete `e2e/.auth/user.json`
2. Re-run tests to trigger authentication setup again

#### CI/CD Environment

In CI environments, authentication is skipped. You'll need to:

1. Set up a test user in Clerk
2. Use Clerk's API to create sessions programmatically
3. Or use environment variables to bypass authentication in test mode

## Running Tests

```bash
# Run all E2E tests
npm run test:e2e

# Run with UI
npm run test:e2e:ui

# Run specific test file
npm run test:e2e e2e/assessment-flow.spec.ts

# Run in headed mode (see browser)
npm run test:e2e -- --headed

# Debug mode
npm run test:e2e -- --debug
```

## Test Files

- `assessment-flow.spec.ts` - Complete assessment questionnaire flow
- `chat-flow.spec.ts` - AI chat functionality
- `navigation.spec.ts` - Navigation between pages
- `results-page.spec.ts` - Results page display and interactions

## Notes

- Tests require the dev server to be running (`npm run dev`)
- The global setup (`global-setup.ts`) handles authentication automatically
- Authentication state persists between test runs
- Each developer needs to authenticate once on their machine

