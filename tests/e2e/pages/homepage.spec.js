import { test, expect } from '@playwright/test';

test('homepage loads correctly', async ({ page }) => {
  await page.goto('/');
  
  // Check that the page loads
  await expect(page).toHaveTitle(/CM Kit/);
  
  // Check for main content
  await expect(page.locator('h1')).toBeVisible();
});

test('navigation works correctly', async ({ page }) => {
  await page.goto('/');
  
  // Click on demo link
  await page.click('text=Demo');
  
  // Should navigate to demo page
  await expect(page).toHaveURL(/.*demo/);
  await expect(page.locator('h1')).toContainText('Demo');
});

test('demo page interactions', async ({ page }) => {
  await page.goto('/admin/demo');
  
  // Check that demo page loads
  await expect(page.locator('h1')).toContainText('CM Kit Admin Demo');
  
  // Test any interactive elements
  // Add more specific tests based on demo page functionality
});

test('docs navigation', async ({ page }) => {
  await page.goto('/');
  
  // Navigate to docs
  await page.click('text=Docs');
  await expect(page).toHaveURL(/.*docs/);
  await expect(page.locator('h1')).toContainText('Documentation');
}); 