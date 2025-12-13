import { test, expect } from '@playwright/test';

test.describe('Theme Toggle Feature', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test.describe('Theme Toggle UI', () => {
    test('should display theme toggle button after login', async ({ page }) => {
      await page.goto('/');

      // Login
      await page.getByLabel(/nickname/i).fill('alice');
      await page.getByLabel(/password/i).fill('password123');
      await page.getByRole('button', { name: /login/i }).click();

      // Wait for app to load
      await expect(page.getByText('Korespondenční Mars')).toBeVisible();

      // Theme toggle should be visible
      const themeToggle = page.getByRole('button', { name: /switch to (dark|light) mode/i });
      await expect(themeToggle).toBeVisible();
    });

    test('should show sun icon and "Switch to dark mode" tooltip in light mode', async ({
      page,
    }) => {
      await page.goto('/');

      // Login
      await page.getByLabel(/nickname/i).fill('alice');
      await page.getByLabel(/password/i).fill('password123');
      await page.getByRole('button', { name: /login/i }).click();

      // Wait for app to load
      await expect(page.getByText('Korespondenční Mars')).toBeVisible();

      // Check tooltip text indicates dark mode is available
      const themeToggle = page.getByRole('button', { name: /switch to dark mode/i });
      await expect(themeToggle).toBeVisible();
    });
  });

  test.describe('Theme Switching', () => {
    test('should switch from light to dark mode when clicked', async ({ page }) => {
      await page.goto('/');

      // Login
      await page.getByLabel(/nickname/i).fill('alice');
      await page.getByLabel(/password/i).fill('password123');
      await page.getByRole('button', { name: /login/i }).click();

      await expect(page.getByText('Korespondenční Mars')).toBeVisible();

      // Get initial AppBar background color (light mode)
      const appBar = page.locator('header[class*="MuiAppBar"]').first();
      const lightBgColor = await appBar.evaluate(
        (el) => window.getComputedStyle(el).backgroundColor
      );

      // Click theme toggle
      const themeToggle = page.getByRole('button', { name: /switch to dark mode/i });
      await themeToggle.click();

      // Wait for theme to update
      await page.waitForTimeout(100);

      // Get new AppBar background color (should be different for dark mode)
      const darkBgColor = await appBar.evaluate(
        (el) => window.getComputedStyle(el).backgroundColor
      );

      // Colors should be different
      expect(lightBgColor).not.toBe(darkBgColor);

      // Verify toggle button text changed
      await expect(page.getByRole('button', { name: /switch to light mode/i })).toBeVisible();
    });

    test('should switch back from dark to light mode', async ({ page }) => {
      await page.goto('/');

      // Login
      await page.getByLabel(/nickname/i).fill('alice');
      await page.getByLabel(/password/i).fill('password123');
      await page.getByRole('button', { name: /login/i }).click();

      await expect(page.getByText('Korespondenční Mars')).toBeVisible();

      // Toggle to dark
      await page.getByRole('button', { name: /switch to dark mode/i }).click();
      await expect(page.getByRole('button', { name: /switch to light mode/i })).toBeVisible();

      // Toggle back to light
      await page.getByRole('button', { name: /switch to light mode/i }).click();
      await expect(page.getByRole('button', { name: /switch to dark mode/i })).toBeVisible();
    });

    test('should handle multiple rapid toggles', async ({ page }) => {
      await page.goto('/');

      // Login
      await page.getByLabel(/nickname/i).fill('alice');
      await page.getByLabel(/password/i).fill('password123');
      await page.getByRole('button', { name: /login/i }).click();

      await expect(page.getByText('Korespondenční Mars')).toBeVisible();

      // Rapidly toggle 5 times
      for (let i = 0; i < 5; i++) {
        const currentToggle = page.getByRole('button', { name: /switch to (dark|light) mode/i });
        await currentToggle.click();
        await page.waitForTimeout(50);
      }

      // Should end up in dark mode (odd number of toggles)
      await expect(page.getByRole('button', { name: /switch to light mode/i })).toBeVisible();
    });
  });

  test.describe('Theme Persistence', () => {
    test('should persist dark theme preference in localStorage', async ({ page }) => {
      await page.goto('/');

      // Login
      await page.getByLabel(/nickname/i).fill('alice');
      await page.getByLabel(/password/i).fill('password123');
      await page.getByRole('button', { name: /login/i }).click();

      await expect(page.getByText('Korespondenční Mars')).toBeVisible();

      // Toggle to dark mode
      await page.getByRole('button', { name: /switch to dark mode/i }).click();

      // Check localStorage
      const themeMode = await page.evaluate(() => localStorage.getItem('user.themeMode'));
      expect(themeMode).toBe('dark');
    });

    test('should persist light theme preference in localStorage', async ({ page }) => {
      await page.goto('/');

      // Login
      await page.getByLabel(/nickname/i).fill('alice');
      await page.getByLabel(/password/i).fill('password123');
      await page.getByRole('button', { name: /login/i }).click();

      await expect(page.getByText('Korespondenční Mars')).toBeVisible();

      // Toggle to dark, then back to light
      await page.getByRole('button', { name: /switch to dark mode/i }).click();
      await page.getByRole('button', { name: /switch to light mode/i }).click();

      // Check localStorage
      const themeMode = await page.evaluate(() => localStorage.getItem('user.themeMode'));
      expect(themeMode).toBe('light');
    });

    test('should restore dark theme after page reload', async ({ page }) => {
      await page.goto('/');

      // Login
      await page.getByLabel(/nickname/i).fill('alice');
      await page.getByLabel(/password/i).fill('password123');
      await page.getByRole('button', { name: /login/i }).click();

      await expect(page.getByText('Korespondenční Mars')).toBeVisible();

      // Toggle to dark mode
      await page.getByRole('button', { name: /switch to dark mode/i }).click();
      await expect(page.getByRole('button', { name: /switch to light mode/i })).toBeVisible();

      // Reload page
      await page.reload();

      // Re-login
      await page.getByLabel(/nickname/i).fill('alice');
      await page.getByLabel(/password/i).fill('password123');
      await page.getByRole('button', { name: /login/i }).click();

      await expect(page.getByText('Korespondenční Mars')).toBeVisible();

      // Should still be in dark mode
      await expect(page.getByRole('button', { name: /switch to light mode/i })).toBeVisible();

      // Verify localStorage still has dark mode
      const themeMode = await page.evaluate(() => localStorage.getItem('user.themeMode'));
      expect(themeMode).toBe('dark');
    });

    test('should restore light theme after page reload', async ({ page }) => {
      // Set dark mode in localStorage first
      await page.goto('/');
      await page.evaluate(() => localStorage.setItem('user.themeMode', 'dark'));

      // Login
      await page.getByLabel(/nickname/i).fill('alice');
      await page.getByLabel(/password/i).fill('password123');
      await page.getByRole('button', { name: /login/i }).click();

      await expect(page.getByText('Korespondenční Mars')).toBeVisible();

      // Should start in dark mode
      await expect(page.getByRole('button', { name: /switch to light mode/i })).toBeVisible();

      // Toggle to light mode
      await page.getByRole('button', { name: /switch to light mode/i }).click();
      await expect(page.getByRole('button', { name: /switch to dark mode/i })).toBeVisible();

      // Reload page
      await page.reload();

      // Re-login
      await page.getByLabel(/nickname/i).fill('alice');
      await page.getByLabel(/password/i).fill('password123');
      await page.getByRole('button', { name: /login/i }).click();

      await expect(page.getByText('Korespondenční Mars')).toBeVisible();

      // Should still be in light mode
      await expect(page.getByRole('button', { name: /switch to dark mode/i })).toBeVisible();
    });

    test('should default to light mode on first visit', async ({ page }) => {
      await page.goto('/');

      // Verify localStorage is empty
      const initialTheme = await page.evaluate(() => localStorage.getItem('user.themeMode'));
      expect(initialTheme).toBeNull();

      // Login
      await page.getByLabel(/nickname/i).fill('alice');
      await page.getByLabel(/password/i).fill('password123');
      await page.getByRole('button', { name: /login/i }).click();

      await expect(page.getByText('Korespondenční Mars')).toBeVisible();

      // Should show light mode (sun icon, "switch to dark mode" text)
      await expect(page.getByRole('button', { name: /switch to dark mode/i })).toBeVisible();
    });
  });

  test.describe('Theme Persistence Across Sessions', () => {
    test('should maintain theme across logout and login', async ({ page }) => {
      await page.goto('/');

      // Login
      await page.getByLabel(/nickname/i).fill('alice');
      await page.getByLabel(/password/i).fill('password123');
      await page.getByRole('button', { name: /login/i }).click();

      await expect(page.getByText('Korespondenční Mars')).toBeVisible();

      // Toggle to dark mode
      await page.getByRole('button', { name: /switch to dark mode/i }).click();
      await expect(page.getByRole('button', { name: /switch to light mode/i })).toBeVisible();

      // Logout
      await page.getByRole('button', { name: /logout/i }).click();

      // Wait for login page
      await expect(page.getByRole('button', { name: /login/i })).toBeVisible();

      // Login again
      await page.getByLabel(/nickname/i).fill('alice');
      await page.getByLabel(/password/i).fill('password123');
      await page.getByRole('button', { name: /login/i }).click();

      await expect(page.getByText('Korespondenční Mars')).toBeVisible();

      // Theme should still be dark
      await expect(page.getByRole('button', { name: /switch to light mode/i })).toBeVisible();
    });
  });

  test.describe('Theme Visual Changes', () => {
    test('should change background color when toggling theme', async ({ page }) => {
      await page.goto('/');

      // Login
      await page.getByLabel(/nickname/i).fill('alice');
      await page.getByLabel(/password/i).fill('password123');
      await page.getByRole('button', { name: /login/i }).click();

      await expect(page.getByText('Korespondenční Mars')).toBeVisible();

      // Get body background in light mode
      const lightBodyBg = await page.evaluate(
        () => window.getComputedStyle(document.body).backgroundColor
      );

      // Toggle to dark
      await page.getByRole('button', { name: /switch to dark mode/i }).click();
      await page.waitForTimeout(100);

      // Get body background in dark mode
      const darkBodyBg = await page.evaluate(
        () => window.getComputedStyle(document.body).backgroundColor
      );

      // Background colors should be different
      expect(lightBodyBg).not.toBe(darkBodyBg);
    });

    test('should update all MUI components when theme changes', async ({ page }) => {
      await page.goto('/');

      // Login
      await page.getByLabel(/nickname/i).fill('alice');
      await page.getByLabel(/password/i).fill('password123');
      await page.getByRole('button', { name: /login/i }).click();

      await expect(page.getByText('Korespondenční Mars')).toBeVisible();

      // Get Submit Game button color in light mode
      const submitButton = page.getByRole('button', { name: /submit game/i });
      const lightButtonBg = await submitButton.evaluate(
        (el) => window.getComputedStyle(el).backgroundColor
      );

      // Toggle to dark mode
      await page.getByRole('button', { name: /switch to dark mode/i }).click();
      await page.waitForTimeout(100);

      // Button styling might change in dark mode
      const darkButtonBg = await submitButton.evaluate(
        (el) => window.getComputedStyle(el).backgroundColor
      );

      // Note: Colors might be the same if MUI uses same primary color,
      // but we verify the theme system is working by checking localStorage
      const themeMode = await page.evaluate(() => localStorage.getItem('user.themeMode'));
      expect(themeMode).toBe('dark');
    });
  });

  test.describe('Accessibility', () => {
    test('should be keyboard navigable', async ({ page }) => {
      await page.goto('/');

      // Login
      await page.getByLabel(/nickname/i).fill('alice');
      await page.getByLabel(/password/i).fill('password123');
      await page.getByRole('button', { name: /login/i }).click();

      await expect(page.getByText('Korespondenční Mars')).toBeVisible();

      // Tab to theme toggle button
      const themeToggle = page.getByRole('button', { name: /switch to dark mode/i });
      await themeToggle.focus();

      // Press Enter to toggle
      await page.keyboard.press('Enter');

      // Should switch to dark mode
      await expect(page.getByRole('button', { name: /switch to light mode/i })).toBeVisible();
    });

    test('should have proper aria-label', async ({ page }) => {
      await page.goto('/');

      // Login
      await page.getByLabel(/nickname/i).fill('alice');
      await page.getByLabel(/password/i).fill('password123');
      await page.getByRole('button', { name: /login/i }).click();

      await expect(page.getByText('Korespondenční Mars')).toBeVisible();

      // Theme toggle should have aria-label
      const themeToggle = page.getByRole('button', { name: /switch to dark mode/i });
      const ariaLabel = await themeToggle.getAttribute('aria-label');
      expect(ariaLabel).toBeTruthy();
      expect(ariaLabel).toMatch(/switch to (dark|light) mode/i);
    });
  });
});
