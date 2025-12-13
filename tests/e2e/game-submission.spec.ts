import { test, expect } from '../setup';

test.describe('Game Submission', () => {
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
    const isMockVisible = await mockCheckbox.isVisible().catch(() => false);
    if (isMockVisible) {
      await mockCheckbox.check();
    }

    // Submit
    await page.getByRole('button', { name: 'Save' }).click();

    // Verify Dialog closes (button changes state quickly, so we wait for dialog to close)
    await expect(page.getByRole('heading', { name: /submit game/i, level: 6 })).not.toBeVisible({
      timeout: 10000,
    });

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
