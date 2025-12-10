import { test, expect } from '@playwright/test';

test.describe('Scores Display', () => {
  test.beforeEach(async ({ page }) => {
    // Mock Firebase Auth Identity Toolkit API
    // Mock Firebase Auth Identity Toolkit API
    // Use Regex to match both real API and Emulator paths
    await page.route(/.*accounts:signInWithPassword.*/, async (route) => {
      console.log('Intercepted signInWithPassword request');
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
      console.log('Intercepted accounts:lookup request');
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

    await page.goto('/');

    await page.getByLabel(/nickname/i).fill('TestUser');
    await page.getByLabel(/password/i).fill('password123');

    // Submit
    await page.getByRole('button', { name: /submit/i }).click();

    // Verify redirect/UI change
    // App.tsx shows "You: {user}" in AppBar on success
    await expect(page.getByText('You: TestUser')).toBeVisible();
    await expect(page.getByText('Scores dashboard')).toBeVisible();
  });

  test('should display visual components', async ({ page }) => {
    // Check for dashboard sections
    await expect(page.getByText('Scores dashboard')).toBeVisible();

    // Check for charts containers
    await expect(page.getByText('Win split — players')).toBeVisible();
    await expect(page.getByText('Win split — corporations')).toBeVisible();
    await expect(page.getByText('Player Placements')).toBeVisible();

    // Check table headers
    await expect(page.getByRole('columnheader', { name: 'Game' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Player' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Corp' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Total' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Rank' })).toBeVisible();
  });
});
