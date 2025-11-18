import { chromium, FullConfig } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

async function globalSetup(config: FullConfig) {
  // Load environment variables
  dotenv.config({ path: path.resolve(__dirname, '../.env.local') });
  
  // Create auth directory if it doesn't exist
  const authDir = path.resolve(__dirname, '.auth');
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }
  
  const authFile = path.join(authDir, 'user.json');
  
  // Check if authentication state already exists
  if (fs.existsSync(authFile)) {
    console.log('Using existing authentication state');
    return;
  }
  
  let browser = null;
  let context = null;
  
  try {
    browser = await chromium.launch({ headless: true });
    context = await browser.newContext();
    const page = await context.newPage();
    
    // Navigate to a protected page to trigger authentication
    await page.goto('http://localhost:3000/dashboard/questions');
    
    // Wait to see if we're redirected to sign-in
    await page.waitForTimeout(3000);
    
    const currentUrl = page.url();
    
    // If we're on the sign-in page, we need manual authentication
    if (currentUrl.includes('sign-in') || currentUrl.includes('accounts.dev')) {
      console.log('\n⚠️  Authentication Required for E2E Tests');
      console.log('==========================================');
      console.log('To run E2E tests, you need to authenticate once:');
      console.log('1. The browser will open in headed mode');
      console.log('2. Sign in with your Clerk account');
      console.log('3. The authentication state will be saved for future test runs');
      console.log('4. Close the browser when done\n');
      
      // Close the headless browser
      if (browser) {
        await browser.close();
        browser = null;
      }
      
      // Launch browser in headed mode for manual authentication
      const headedBrowser = await chromium.launch({ headless: false });
      const headedContext = await headedBrowser.newContext();
      const headedPage = await headedContext.newPage();
      
      await headedPage.goto('http://localhost:3000/dashboard/questions');
      
      // Wait for user to manually authenticate (up to 5 minutes)
      console.log('Waiting for manual authentication...');
      await headedPage.waitForURL(/.*dashboard/, { timeout: 300000 });
      
      // Save authentication state
      await headedContext.storageState({ path: authFile });
      console.log('✅ Authentication state saved successfully!');
      
      await headedBrowser.close();
    } else {
      // Already authenticated or no auth required
      if (context) {
        await context.storageState({ path: authFile });
        console.log('✅ Authentication state saved');
      }
    }
    
  } catch (error) {
    console.warn('⚠️  Could not set up authentication automatically.');
    console.warn('You may need to manually authenticate on first test run.');
    console.warn('Error:', error instanceof Error ? error.message : error);
    
    // Create an empty auth file to prevent repeated attempts
    try {
      fs.writeFileSync(authFile, JSON.stringify({ cookies: [], origins: [] }, null, 2));
    } catch (writeError) {
      // Ignore write errors
    }
  } finally {
    try {
      if (browser && browser.isConnected()) {
        await browser.close();
      }
    } catch (closeError) {
      // Browser already closed, ignore
    }
  }
}

export default globalSetup;

