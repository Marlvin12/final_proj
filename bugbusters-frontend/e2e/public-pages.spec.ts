import { test, expect } from '@playwright/test';

test.describe('Public Pages', () => {
  test('should load home page', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/.*\/$/);
    
    // Check for main content
    const heading = page.locator('h1, h2').first();
    await expect(heading).toBeVisible();
  });

  test('should navigate to about page', async ({ page }) => {
    await page.goto('/');
    await page.click('a[href="/about"], text=About');
    await expect(page).toHaveURL(/.*about/);
    
    // Verify page loaded
    const content = page.locator('body');
    await expect(content).toBeVisible();
  });

  test('should navigate to contact page', async ({ page }) => {
    await page.goto('/');
    await page.click('a[href="/contact"], text=Contact');
    await expect(page).toHaveURL(/.*contact/);
    
    // Verify page loaded
    const content = page.locator('body');
    await expect(content).toBeVisible();
  });

  test('should have navigation links', async ({ page }) => {
    await page.goto('/');
    
    // Check for navigation elements
    const nav = page.locator('nav').first();
    await expect(nav).toBeVisible();
  });

  test('should display page content', async ({ page }) => {
    await page.goto('/');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Check that page has content
    const body = page.locator('body');
    const textContent = await body.textContent();
    expect(textContent?.length).toBeGreaterThan(0);
  });
});

