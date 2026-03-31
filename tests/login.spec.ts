import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('Login with correct credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goToHomepage();
  //console.log('USER:', process.env.STANDARD_USER_EMAIL);
  //console.log('PASS:', process.env.STANDARD_USER_PASSWORD);
  await loginPage.login(process.env.STANDARD_USER_EMAIL ?? '', process.env.STANDARD_USER_PASSWORD ?? '');
});