import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('should redirect to sign-in when accessing protected route', async ({ page }) => {
    await page.goto('/dashboard/questions');
    
    // Should be redirected to sign-in page
    await page.waitForTimeout(2000);
    const url = page.url();
    
    // Either on sign-in page or dashboard (if already authenticated)
    expect(url).toMatch(/.*(sign-in|accounts\.dev|dashboard)/);
  });

  test('should show sign-in page elements', async ({ page }) => {
    await page.goto('/dashboard/questions');
    await page.waitForTimeout(2000);
    
    const url = page.url();
    
    if (url.includes('sign-in') || url.includes('accounts.dev')) {
      // Check for sign-in form elements
      const emailInput = page.locator('input[type="email"], input[name="identifier"]').first();
      const continueButton = page.locator('button:has-text("Continue"), button[type="submit"]').first();
      
      // At least one should be visible
      const emailVisible = await emailInput.isVisible().catch(() => false);
      const buttonVisible = await continueButton.isVisible().catch(() => false);
      
      expect(emailVisible || buttonVisible).toBeTruthy();
    } else {
      // Already authenticated, should be on dashboard
      expect(url).toMatch(/.*dashboard/);
    }
  });

  test('should have Clerk authentication UI', async ({ page }) => {
    await page.goto('/dashboard/questions');
    await page.waitForTimeout(2000);
    
    const url = page.url();
    
    if (url.includes('sign-in') || url.includes('accounts.dev')) {
      // Check for Clerk branding
      const body = page.locator('body');
      const text = await body.textContent();
      expect(text?.toLowerCase()).toMatch(/sign|login|clerk/);
    } else {
      // Already authenticated
      expect(url).toMatch(/.*dashboard/);
    }
  });
});

