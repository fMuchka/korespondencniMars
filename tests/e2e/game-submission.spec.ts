import { test, expect } from '@playwright/test';

test.describe('Game Submission', () => {
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

  test('should submit a game with 2 players', async ({ page }) => {
    // Open Dialog
    await page.getByRole('button', { name: /submit game/i }).click();
    await expect(page.getByRole('heading', { name: /new player/i })).toBeVisible();

    // Add Player 2
    await page.getByRole('button', { name: /add player/i }).click();

    // Using index based locators
    const p1 = page.locator('.MuiDialogContent-root > .MuiStack-root > div').nth(0);
    const p2 = page.locator('.MuiDialogContent-root > .MuiStack-root > div').nth(1);

    // Player 1
    await p1.getByLabel(/name/i).fill('Alice');
    await p1.getByLabel(/corporation/i).click();
    await page
      .getByRole('option', { name: /tharsis/i })
      .first()
      .click();
    await p1.getByLabel(/terraforming rating/i).fill('25');

    // Player 2
    await p2.getByLabel(/name/i).fill('Bob');
    await p2.getByLabel(/corporation/i).click();
    await page
      .getByRole('option', { name: /ecoline/i })
      .first()
      .click();
    await p2.getByLabel(/terraforming rating/i).fill('20');

    // Toggle Mock Submit if available (Dev mode only)
    const mockCheckbox = page.getByLabel(/mock submit/i);
    if (await mockCheckbox.isVisible()) {
      await mockCheckbox.check();
    }

    // Submit
    await page.getByRole('button', { name: 'Save' }).click();

    // Verify Dialog closes
    await expect(page.getByRole('heading', { name: /submit game/i })).not.toBeVisible();

    // Verify Game appears in table (assuming Mock Logic adds it to localStorage which Scores reads?
    // Scores.tsx reads from various sources. If local mock save works, it updates view.
    // If not using mock save, network request happens. We should check network or UI result.

    // Since we didn't mock Firestore write, this might fail if not in Emulator/Mock mode.
    // BUT, checks in Scores.tsx: "if (useMock) { ... read localStorage ... }"
    // So if we checked "Mock Submit", it writes to localStorage. Scores reads it.

    await expect(page.getByRole('cell', { name: 'Alice' }).first()).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Bob' }).first()).toBeVisible();
  });
});
