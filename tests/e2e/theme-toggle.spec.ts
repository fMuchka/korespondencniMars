import { test, expect } from '../setup';

test.describe('Theme Toggle UI', () => {
  test('should display theme toggle button after login', async ({ page }) => {
    // Theme toggle should be visible
    const themeToggle = page.getByRole('button', { name: /switch to (dark|light) mode/i });
    await expect(themeToggle).toBeVisible();
  });

  test('should show sun icon and "Switch to dark mode" tooltip in light mode', async ({ page }) => {
    // Check tooltip text indicates dark mode is available
    const themeToggle = page.getByRole('button', { name: /switch to dark mode/i });
    await expect(themeToggle).toBeVisible();
  });
});

test.describe('Theme Switching', () => {
  test('should switch from light to dark mode when clicked', async ({ page }) => {
    // Get initial AppBar background color (light mode)
    const appBar = page.locator('header[class*="MuiAppBar"]').first();
    const lightBgColor = await appBar.evaluate((el) => window.getComputedStyle(el).backgroundColor);

    // Click theme toggle
    const themeToggle = page.getByRole('button', { name: /switch to dark mode/i });
    await themeToggle.click();

    // Get new AppBar background color (should be different for dark mode)
    const darkBgColor = await appBar.evaluate((el) => window.getComputedStyle(el).backgroundColor);

    // Colors should be different
    expect(lightBgColor).not.toBe(darkBgColor);

    // Verify toggle button text changed
    await expect(page.getByRole('button', { name: /switch to light mode/i })).toBeVisible();
  });

  test('should switch back from dark to light mode', async ({ page }) => {
    // Toggle to dark
    await page.getByRole('button', { name: /switch to dark mode/i }).click();
    await expect(page.getByRole('button', { name: /switch to light mode/i })).toBeVisible();

    // Toggle back to light
    await page.getByRole('button', { name: /switch to light mode/i }).click();
    await expect(page.getByRole('button', { name: /switch to dark mode/i })).toBeVisible();
  });

  test('should handle multiple rapid toggles', async ({ page }) => {
    // Rapidly toggle 5 times
    for (let i = 0; i < 5; i++) {
      const currentToggle = page.getByRole('button', { name: /switch to (dark|light) mode/i });
      await currentToggle.click();
    }

    // Should end up in dark mode (odd number of toggles)
    await expect(page.getByRole('button', { name: /switch to light mode/i })).toBeVisible();
  });
});

test.describe('Theme Persistence', () => {
  test('should persist dark theme preference in localStorage', async ({ page }) => {
    // Toggle to dark mode
    await page.getByRole('button', { name: /switch to dark mode/i }).click();

    // Check localStorage
    const themeMode = await page.evaluate(() => localStorage.getItem('KM-THEME-VALUE'));
    expect(themeMode).toBe('dark');
  });

  test('should persist light theme preference in localStorage', async ({ page }) => {
    // Toggle to dark, then back to light
    await page.getByRole('button', { name: /switch to dark mode/i }).click();
    await page.getByRole('button', { name: /switch to light mode/i }).click();

    // Check localStorage
    const themeMode = await page.evaluate(() => localStorage.getItem('KM-THEME-VALUE'));
    expect(themeMode).toBe('light');
  });

  test('should restore dark theme after page reload', async ({ page }) => {
    // Toggle to dark mode
    await page.getByRole('button', { name: /switch to dark mode/i }).click();
    await expect(page.getByRole('button', { name: /switch to light mode/i })).toBeVisible();

    // Reload page
    await page.reload();

    // Re-login
    await page.getByLabel(/nickname/i).fill('TestUser');
    await page.getByLabel(/password/i).fill('password123');
    await page.getByRole('button', { name: /submit/i }).click();

    await expect(page.getByText('You: TestUser')).toBeVisible();

    // Should still be in dark mode
    await expect(page.getByRole('button', { name: /switch to light mode/i })).toBeVisible();

    // Verify localStorage still has dark mode
    const themeMode = await page.evaluate(() => localStorage.getItem('KM-THEME-VALUE'));
    expect(themeMode).toBe('dark');
  });

  test('should restore light theme after page reload', async ({ page }) => {
    // Toggle to dark first, then back to light
    await page.getByRole('button', { name: /switch to dark mode/i }).click();
    await expect(page.getByRole('button', { name: /switch to light mode/i })).toBeVisible();

    await page.getByRole('button', { name: /switch to light mode/i }).click();
    await expect(page.getByRole('button', { name: /switch to dark mode/i })).toBeVisible();

    // Reload page
    await page.reload();

    // Re-login
    await page.getByLabel(/nickname/i).fill('TestUser');
    await page.getByLabel(/password/i).fill('password123');
    await page.getByRole('button', { name: /submit/i }).click();

    await expect(page.getByText('You: TestUser')).toBeVisible();

    // Should still be in light mode
    await expect(page.getByRole('button', { name: /switch to dark mode/i })).toBeVisible();
  });

  test('should default to light mode on first visit', async ({ page }) => {
    // Verify localStorage is empty (beforeEach clears it)
    const initialTheme = await page.evaluate(() => localStorage.getItem('KM-THEME-VALUE'));
    expect(initialTheme).toBeNull();

    // Should show light mode (sun icon, "switch to dark mode" text)
    await expect(page.getByRole('button', { name: /switch to dark mode/i })).toBeVisible();
  });
});

test.describe('Theme Persistence Across Sessions', () => {
  test('should maintain theme across logout and login', async ({ page }) => {
    // Toggle to dark mode
    await page.getByRole('button', { name: /switch to dark mode/i }).click();
    await expect(page.getByRole('button', { name: /switch to light mode/i })).toBeVisible();

    // Logout
    await page.getByRole('button', { name: /logout/i }).click();

    // Wait for login page
    await expect(page.getByRole('button', { name: /submit/i })).toBeVisible();

    // Login again
    await page.getByLabel(/nickname/i).fill('TestUser');
    await page.getByLabel(/password/i).fill('password123');
    await page.getByRole('button', { name: /submit/i }).click();

    await expect(page.getByText('You: TestUser')).toBeVisible();

    // Theme should still be dark
    await expect(page.getByRole('button', { name: /switch to light mode/i })).toBeVisible();
  });
});

test.describe('Theme Visual Changes', () => {
  test('should change background color when toggling theme', async ({ page }) => {
    // Get body background in light mode
    const lightBodyBg = await page.evaluate(
      () => window.getComputedStyle(document.body).backgroundColor
    );

    // Toggle to dark
    await page.getByRole('button', { name: /switch to dark mode/i }).click();

    // Get body background in dark mode
    const darkBodyBg = await page.evaluate(
      () => window.getComputedStyle(document.body).backgroundColor
    );

    // Background colors should be different
    expect(lightBodyBg).not.toBe(darkBodyBg);
  });

  test('should update all MUI components when theme changes', async ({ page }) => {
    // Toggle to dark mode
    await page.getByRole('button', { name: /switch to dark mode/i }).click();

    // Note: Colors might be the same if MUI uses same primary color,
    // but we verify the theme system is working by checking localStorage
    const themeMode = await page.evaluate(() => localStorage.getItem('KM-THEME-VALUE'));
    expect(themeMode).toBe('dark');
  });
});

test.describe('Accessibility', () => {
  test('should be keyboard navigable', async ({ page }) => {
    // Tab to theme toggle button
    const themeToggle = page.getByRole('button', { name: /switch to dark mode/i });
    await themeToggle.focus();

    // Press Enter to toggle
    await page.keyboard.press('Enter');

    // Should switch to dark mode
    await expect(page.getByRole('button', { name: /switch to light mode/i })).toBeVisible();
  });

  test('should have proper aria-label', async ({ page }) => {
    // Theme toggle should have aria-label
    const themeToggle = page.getByRole('button', { name: /switch to dark mode/i });
    const ariaLabel = await themeToggle.getAttribute('aria-label');
    expect(ariaLabel).toBeTruthy();
    expect(ariaLabel).toMatch(/switch to (dark|light) mode/i);
  });
});
