import { Page } from "@playwright/test";

export class InventoryPage {
  private inventoryList;
  private inventoryItems;
  private cartBadge;
  private cartButton;
  private sortContainer;

  constructor(private page: Page) {
    this.inventoryList = page.locator('.inventory_list');
    this.inventoryItems = page.locator('.inventory_item');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartButton = page.locator('.shopping_cart_link');
    this.sortContainer = page.locator('.product_sort_container');
  }

  async waitForInventoryPage() {
    await this.page.waitForURL('**/inventory.html');
    await this.inventoryList.waitFor({ state: 'visible' });
  }

  async addItemToCartByName(name: string) {
    const item = this.page.locator('.inventory_item', { hasText: name });
    await item.locator('button.btn_inventory').click();
  }

  async getItemNames() {
    return this.inventoryItems.locator('.inventory_item_name').allTextContents();
  }

  async getItemPrices() {
    return this.inventoryItems.locator('.inventory_item_price').allTextContents();
  }

  async sortByPriceLowToHigh() {
    await this.sortContainer.selectOption('lohi');
  }

  async sortByPriceHighToLow() {
    await this.sortContainer.selectOption('hilo');
  }

  async getCartItemCount() {
    const badgeText = await this.cartBadge.textContent();
    return badgeText ? Number(badgeText.trim()) : 0;
  }

  async openCart() {
    await this.cartButton.click();
  }

  async isItemInCart(itemName: string) {
    const itemId = itemName.toLowerCase().replace(/\s+/g, '-');
    const removeButton = this.page.locator(`#remove-${itemId}`);
    return await removeButton.isVisible();
  }

  async getItemButtonText(itemName: string) {
    const item = this.page.locator('.inventory_item', { hasText: itemName });
    return await item.locator('button.btn_inventory').textContent();
  }
}