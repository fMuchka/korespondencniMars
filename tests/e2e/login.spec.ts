import { test, expect } from '@playwright/test';

test.describe('Korespondenční Mars App', () => {
  test('should display login page on initial load', async ({ page }) => {
    await page.goto('/');

    // Check for login page elements
    await expect(page.getByRole('heading', { name: /login/i })).toBeVisible();
    await expect(page.getByLabel(/nickname/i)).toBeVisible();
    await expect(page.getByLabel(/password/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /submit/i })).toBeVisible();
  });

  test('should show login heading', async ({ page }) => {
    await page.goto('/');

    // Verify the login heading is present
    const heading = page.getByRole('heading', { name: /login/i });
    await expect(heading).toBeVisible();
  });

  test('login form should have required fields', async ({ page }) => {
    await page.goto('/');

    // Check that nickname and password fields exist
    const nicknameInput = page.getByLabel(/nickname/i);
    const passwordInput = page.getByLabel(/password/i);

    await expect(nicknameInput).toBeVisible();
    await expect(passwordInput).toBeVisible();

    // Verify password field has correct type
    await expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('should have a submit button', async ({ page }) => {
    await page.goto('/');

    const submitButton = page.getByRole('button', { name: /submit/i });
    await expect(submitButton).toBeVisible();
    await expect(submitButton).toBeEnabled();
  });
});
