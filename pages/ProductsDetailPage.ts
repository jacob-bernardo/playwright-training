import { Page, Locator, expect } from "@playwright/test";

export class ProductsDetailPage {
  readonly page: Page;
  readonly productName: Locator;
  readonly productCategory: Locator;
  readonly productPrice: Locator;
  readonly productAvailability: Locator;
  readonly productCondition: Locator;
  readonly productBrand: Locator;

  // Test Case 13 Locators
  readonly quantityInput: Locator;
  readonly addToCartBtn: Locator;
  readonly viewCartModalBtn: Locator;

  // Test Case 21 Locators
  readonly writeReviewHeader: Locator;
  readonly reviewNameInput: Locator;
  readonly reviewEmailInput: Locator;
  readonly reviewTextArea: Locator;
  readonly reviewSubmitBtn: Locator;
  readonly reviewSuccessAlert: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productName = page.locator(".product-information h2");
    this.productCategory = page.locator(".product-information p", {
      hasText: "Category:",
    });
    this.productPrice = page.locator(".product-information span span");
    this.productAvailability = page.locator(".product-information p", {
      hasText: "Availability:",
    });
    this.productCondition = page.locator(".product-information p", {
      hasText: "Condition:",
    });
    this.productBrand = page.locator(".product-information p", {
      hasText: "Brand:",
    });

    // Test Case 13
    this.quantityInput = page.locator("#quantity");
    this.addToCartBtn = page.locator("button.cart");
    this.viewCartModalBtn = page.locator('.modal-content a[href="/view_cart"]');

    // Test Case 21
    this.writeReviewHeader = page.locator('a[href="#reviews"]');
    this.reviewNameInput = page.locator("#name");
    this.reviewEmailInput = page.locator("#email");
    this.reviewTextArea = page.locator("#review");
    this.reviewSubmitBtn = page.locator("#button-review");
    this.reviewSuccessAlert = page.locator(
      "#review-section .alert-success, .category-tab .alert-success",
    );
  }

  async verifyProductDetailsVisible(): Promise<void> {
    await expect(this.productName).toBeVisible();
    await expect(this.productCategory).toBeVisible();
    await expect(this.productPrice).toBeVisible();
    await expect(this.productAvailability).toBeVisible();
    await expect(this.productCondition).toBeVisible();
    await expect(this.productBrand).toBeVisible();
  }

  // --- Test Case 13 Methods ---

  async setQuantity(quantity: string): Promise<void> {
    await this.quantityInput.fill(quantity);
  }

  async clickAddToCart(): Promise<void> {
    await this.addToCartBtn.click();
  }

  async clickModalViewCart(): Promise<void> {
    await this.viewCartModalBtn.click();
  }

  // --- Test Case 21 Methods ---

  async verifyWriteReviewHeaderVisible(): Promise<void> {
    await expect(this.writeReviewHeader).toBeVisible();
  }

  async submitReview(
    name: string,
    email: string,
    reviewText: string,
  ): Promise<void> {
    await this.reviewNameInput.fill(name);
    await this.reviewEmailInput.fill(email);
    await this.reviewTextArea.fill(reviewText);
    await this.reviewSubmitBtn.click({ force: true });
  }

  async verifyReviewSuccessMessage(): Promise<void> {
    await expect(this.reviewSuccessAlert).toBeVisible();
    await expect(this.reviewSuccessAlert).toHaveText(
      /Thank you for your review/i,
    );
  }
}
