import { test as base, expect } from '@playwright/test';

/**
 * Global test setup for authenticated user sessions
 * Extends Playwright's base test with automatic login before each test
 */
export const test = base.extend({
  page: async ({ page }, use) => {
    // Mock Firebase Auth Identity Toolkit API
    // Use Regex to match both real API and Emulator paths
    await page.route(/.*accounts:signInWithPassword.*/, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          kind: 'identitytoolkit#VerifyPasswordResponse',
          localId: 'test-user-id',
          email: 'test@example.com',
          displayName: 'Test User',
          idToken: 'fake-id-token',
          registered: true,
          refreshToken: 'fake-refresh-token',
          expiresIn: '3600',
        }),
      });
    });

    // Also mock getAccountInfo if needed by Firebase internals immediately after login
    await page.route(/.*accounts:lookup.*/, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          kind: 'identitytoolkit#GetAccountInfoResponse',
          users: [
            {
              localId: 'test-user-id',
              email: 'test@example.com',
              emailVerified: false,
              validSince: '1234567890',
            },
          ],
        }),
      });
    });

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
