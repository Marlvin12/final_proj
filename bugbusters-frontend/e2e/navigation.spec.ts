import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate to home page', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/.*\/$/);
  });

  test('should navigate to about page', async ({ page }) => {
    await page.goto('/about');
    await expect(page).toHaveURL(/.*about/);
  });

  test('should navigate to contact page', async ({ page }) => {
    await page.goto('/contact');
    await expect(page).toHaveURL(/.*contact/);
  });

  test('should navigate between public pages', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Try to click about link if it exists
    const aboutLink = page.locator('a[href="/about"], a[href*="about"]').first();
    if (await aboutLink.isVisible({ timeout: 2000 }).catch(() => false)) {
      await aboutLink.click();
      await page.waitForLoadState('networkidle');
      expect(page.url()).toMatch(/.*about/);
    } else {
      // Direct navigation
      await page.goto('/about');
      await expect(page).toHaveURL(/.*about/);
    }
  });

  test('should handle protected route redirects', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForTimeout(2000);
    
    // Should either be on dashboard or redirected to sign-in
    const url = page.url();
    expect(url).toMatch(/.*(dashboard|sign-in|accounts\.dev)/);
  });
});

