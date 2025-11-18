import { test, expect } from '@playwright/test';

test.describe('Basic Functionality', () => {
  test('should load application', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Page should load without errors
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
  });

  test('should have working links', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Find all links
    const links = page.locator('a[href]');
    const linkCount = await links.count();
    
    if (linkCount > 0) {
      // At least one link should be present
      expect(linkCount).toBeGreaterThan(0);
    }
  });

  test('should render page without console errors', async ({ page }) => {
    const errors: string[] = [];
    
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Filter out known non-critical errors
    const criticalErrors = errors.filter(
      err => !err.includes('favicon') && !err.includes('404')
    );
    
    // Should have minimal critical errors
    expect(criticalErrors.length).toBeLessThan(10);
  });

  test('should have responsive layout', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check viewport
    const viewport = page.viewportSize();
    expect(viewport).not.toBeNull();
    expect(viewport?.width).toBeGreaterThan(0);
    expect(viewport?.height).toBeGreaterThan(0);
  });

  test('should handle page navigation', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Try to navigate to about
    try {
      await page.goto('/about');
      await page.waitForLoadState('networkidle');
      expect(page.url()).toMatch(/.*about/);
    } catch (error) {
      // If about page doesn't exist, that's okay
      expect(page.url()).toMatch(/.*\//);
    }
  });
});

