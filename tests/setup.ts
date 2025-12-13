import { test as base, expect } from '@playwright/test';

/**
 * Global test setup for authenticated user sessions
 * Extends Playwright's base test with automatic login before each test
 *
 * Uses Firebase Auth Emulator (localhost:9099) for authentication
 * Make sure emulator is running: firebase emulators:start
 */
export const test = base.extend({
  page: async ({ page }, use) => {
    // Navigate and login
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());

    await page.getByLabel(/nickname/i).fill('TestUser');
    await page.getByLabel(/password/i).fill('password123');
    await page.getByRole('button', { name: /submit/i }).click();

    // Verify login success
    await expect(page.getByText('You: TestUser')).toBeVisible();
    await expect(page.getByText('Scores dashboard')).toBeVisible();

    // Use the authenticated page in the test
    await use(page);
  },
});

export { expect };
