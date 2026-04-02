import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('Login with correct credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goToHomepage();
  //console.log('USER:', process.env.STANDARD_USER_EMAIL);
  //console.log('PASS:', process.env.STANDARD_USER_PASSWORD);
  await loginPage.login(process.env.STANDARD_USER_EMAIL ?? '', process.env.STANDARD_USER_PASSWORD ?? '');
});

test('Login problem user error appears', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goToHomepage();
  await loginPage.login(process.env.PROBLEM_USER ?? '', process.env.STANDARD_USER_PASSWORD ?? '');
  const container = page.locator('.error-message-container.error');
  await expect(container).toBeVisible();
  await expect(container).toHaveText('Epic sadface: Username and password do not match any user in this service');
});

test('Login with only username entered', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goToHomepage();
  await loginPage.login(process.env.PROBLEM_USER ?? '', '');
  const container = page.locator('.error-message-container.error');
  await expect(container).toHaveText('Epic sadface: Password is required');
});

test('Login with only password entered', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goToHomepage();
  await loginPage.login('', process.env.STANDARD_USER_PASSWORD ?? '');
  const container = page.locator('.error-message-container.error');
  await expect(container).toHaveText('Epic sadface: Username is required')
});