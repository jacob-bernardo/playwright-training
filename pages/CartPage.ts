import { Page, Locator, expect } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly productPrices: Locator;
  readonly productQuantities: Locator;
  readonly productTotals: Locator;
  readonly proceedToCheckoutBtn: Locator;
  readonly registerLoginModalBtn: Locator;

  // Test Case 17 Locators
  readonly cartDeleteBtn: Locator;
  readonly emptyCartSpan: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator("#cart_info_table tbody tr");
    this.productPrices = page.locator(".cart_price p");
    this.productQuantities = page.locator(".cart_quantity button");
    this.productTotals = page.locator(".cart_total .cart_total_price");

    // Test Case 17
    this.cartDeleteBtn = page.locator(".cart_quantity_delete");
    this.emptyCartSpan = page.locator("#empty_cart");

    this.proceedToCheckoutBtn = page.locator("a.check_out");
    this.registerLoginModalBtn = page.locator(
      '.modal-content a[href="/login"]',
    );
  }

  // Verify number of products in cart
  async verifyCartItemCount(expectedCount: number): Promise<void> {
    await expect(this.cartItems).toHaveCount(expectedCount);
  }

  // Verify details for a product row by index (0-based)
  async verifyProductDetails(
    index: number,
    expectedPrice: string,
    expectedQuantity: string,
    expectedTotal: string,
  ): Promise<void> {
    const price = await this.productPrices.nth(index).innerText();
    const quantity = await this.productQuantities.nth(index).innerText();
    const total = await this.productTotals.nth(index).innerText();

    expect(price.trim()).toBe(expectedPrice);
    expect(quantity.trim()).toBe(expectedQuantity);
    expect(total.trim()).toBe(expectedTotal);
  }

  // Verify exact quantity for a specific product index
  async verifyProductQuantity(
    index: number,
    expectedQuantity: string,
  ): Promise<void> {
    const quantity = await this.productQuantities.nth(index).innerText();
    expect(quantity.trim()).toBe(expectedQuantity);
  }

  // --- Test Case 17 Methods ---

  async verifyCartPageDisplayed(): Promise<void> {
    await expect(this.page).toHaveURL(/\/view_cart/);
  }

  async removeProductFromCart(index: number = 0): Promise<void> {
    await this.cartDeleteBtn.nth(index).click();
  }

  async verifyProductRemoved(): Promise<void> {
    // Wait for row count to reach 0 or empty cart text to be visible
    await expect(this.cartItems).toHaveCount(0);
  }

  async clickProceedToCheckout(): Promise<void> {
    await this.proceedToCheckoutBtn.click();
  }

  async clickRegisterLoginFromModal(): Promise<void> {
    await this.registerLoginModalBtn.click();
  }
}
