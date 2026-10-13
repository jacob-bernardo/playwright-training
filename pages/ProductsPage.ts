import { Page, Locator, expect } from "@playwright/test";

export class ProductsPage {
  readonly page: Page;
  readonly allProductsHeader: Locator;
  readonly productsList: Locator;
  readonly firstViewProductBtn: Locator;

  // Test Case 9 Locators
  readonly searchInput: Locator;
  readonly searchBtn: Locator;
  readonly searchedProductsHeader: Locator;
  readonly searchedProductsList: Locator;

  // Test Case 12 & 17 Locators
  readonly firstAddToCartBtn: Locator;
  readonly secondAddToCartBtn: Locator;
  readonly modalContent: Locator;
  readonly continueShoppingBtn: Locator;
  readonly viewCartModalBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.allProductsHeader = page.locator(".features_items .title");
    this.productsList = page.locator(".features_items");
    this.firstViewProductBtn = page
      .locator('a[href^="/product_details/"]')
      .first();

    // Test Case 9 Locators
    this.searchInput = page.locator("#search_product");
    this.searchBtn = page.locator("#submit_search");
    this.searchedProductsHeader = page.locator(".features_items .title");
    this.searchedProductsList = page.locator(
      ".features_items .single-products",
    );

    // Test Case 12 & 17 Locators (Targeting .productinfo visible card buttons)
    this.firstAddToCartBtn = page.locator(".productinfo .add-to-cart").first();
    this.secondAddToCartBtn = page.locator(".productinfo .add-to-cart").nth(1);
    this.modalContent = page.locator("#cartModal");
    this.continueShoppingBtn = page.locator(".modal-footer button.btn-success");
    this.viewCartModalBtn = page.locator('.modal-content a[href="/view_cart"]');
  }

  async verifyAllProductsPageLoaded(): Promise<void> {
    await expect(this.allProductsHeader).toBeVisible();
    await expect(this.allProductsHeader).toHaveText(/ALL PRODUCTS/i);
  }

  async verifyProductsListVisible(): Promise<void> {
    await expect(this.productsList).toBeVisible();
  }

  async clickFirstViewProduct(): Promise<void> {
    await this.firstViewProductBtn.click();
  }

  // --- Test Case 9 Methods ---

  async searchProduct(productName: string): Promise<void> {
    await this.searchInput.fill(productName);
    await this.searchBtn.click();
  }

  async verifySearchedProductsHeaderVisible(): Promise<void> {
    await expect(this.searchedProductsHeader).toBeVisible();
    await expect(this.searchedProductsHeader).toHaveText(/SEARCHED PRODUCTS/i);
  }

  async verifySearchedProductsVisible(): Promise<void> {
    const count = await this.searchedProductsList.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      await expect(this.searchedProductsList.nth(i)).toBeVisible();
    }
  }

  // --- Test Case 12 & 17 Methods ---

  async hoverAndAddFirstProductToCart(): Promise<void> {
    await this.firstAddToCartBtn.scrollIntoViewIfNeeded();
    await this.firstAddToCartBtn.click({ force: true });
  }

  async clickContinueShopping(): Promise<void> {
    await expect(this.modalContent).toBeVisible();
    await this.continueShoppingBtn.click({ force: true });
  }

  async hoverAndAddSecondProductToCart(): Promise<void> {
    await this.secondAddToCartBtn.scrollIntoViewIfNeeded();
    await this.secondAddToCartBtn.click({ force: true });
  }

  async clickModalViewCart(): Promise<void> {
    await expect(this.modalContent).toBeVisible();
    await this.viewCartModalBtn.click({ force: true });
  }

  async addAllSearchedProductsToCart(): Promise<void> {
    const count = await this.searchedProductsList.count();
    for (let i = 0; i < count; i++) {
      const addBtn = this.page.locator(".productinfo .add-to-cart").nth(i);
      await addBtn.scrollIntoViewIfNeeded();
      await addBtn.click({ force: true });

      if (i < count - 1) {
        await this.clickContinueShopping();
      }
    }
  }
}
