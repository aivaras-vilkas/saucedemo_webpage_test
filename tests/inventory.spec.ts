import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test('Inventory page shows products after login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goToHomepage();
  await loginPage.successfulLogin();

  const inventoryPage = new InventoryPage(page);
  await inventoryPage.waitForInventoryPage();

  const itemNames = await inventoryPage.getItemNames();
  expect(itemNames.length).toBeGreaterThan(0);
  expect(itemNames[0]).toContain('Sauce Labs');

  await inventoryPage.addItemToCartByName('Sauce Labs Backpack');
  expect(await inventoryPage.getCartItemCount()).toBe(1);
});

test('Inventory unit button "Add to cart" changes and changes back after clicking', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goToHomepage();
  await loginPage.successfulLogin();

  const inventoryPage = new InventoryPage(page);
  await inventoryPage.waitForInventoryPage();

  await inventoryPage.addItemToCartByName('Sauce Labs Backpack');
  expect(await inventoryPage.isItemInCart('Sauce Labs Backpack')).toBe(true);
  expect(await inventoryPage.getItemButtonText('Sauce Labs Backpack')).toContain('Remove');
});