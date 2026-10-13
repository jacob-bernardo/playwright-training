import { Page, Locator, expect } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly signupLoginBtn: Locator;
  readonly contactUsBtn: Locator;
  readonly testCasesBtn: Locator;
  readonly productsBtn: Locator;
  readonly loggedInAsUser: Locator;
  readonly logoutBtn: Locator;
  readonly deleteAccountBtn: Locator;
  readonly firstViewProductBtn: Locator;
  readonly cartHeaderBtn: Locator;
  readonly subscriptionHeader: Locator;
  readonly scrollUpArrow: Locator;
  readonly mainHeader: Locator;

  // Recommended Items Locators
  readonly recommendedItemsHeader: Locator;
  readonly recommendedAddToCartBtn: Locator;
  readonly viewCartModalBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signupLoginBtn = page.locator('.shop-menu a[href="/login"]');
    this.contactUsBtn = page.locator('a[href="/contact_us"]');
    this.testCasesBtn = page.locator('a[href="/test_cases"]').first();
    this.productsBtn = page.locator('a[href="/products"]');
    this.loggedInAsUser = page.getByText(/Logged in as/i);
    this.logoutBtn = page.locator('a[href="/logout"]');
    this.deleteAccountBtn = page.locator('a[href="/delete_account"]');

    // TC25 & TC26
    this.subscriptionHeader = page.getByRole("heading", {
      name: "SUBSCRIPTION",
    });
    this.scrollUpArrow = page.locator("#scrollUp");
    this.mainHeader = page
      .getByText("Full-Fledged practice website for Automation Engineers")
      .first();

    // Product & Cart Locators
    this.firstViewProductBtn = page
      .locator('a[href^="/product_details/"]')
      .first();
    this.cartHeaderBtn = page.locator('header#header a[href="/view_cart"]');

    // Recommended Items Locators
    this.recommendedItemsHeader = page.getByRole("heading", {
      name: "recommended items",
    });
    this.recommendedAddToCartBtn = page
      .locator("#recommended-item-carousel .item.active .add-to-cart")
      .first();
    this.viewCartModalBtn = page.locator('.modal-content a[href="/view_cart"]');
  }

  async navigate(): Promise<void> {
    await this.page.goto("https://automationexercise.com/", {
      waitUntil: "domcontentloaded",
    });
    await expect(this.page).toHaveTitle(/Automation Exercise/);
  }

  async clickSignupLogin(): Promise<void> {
    await this.signupLoginBtn.click();
  }

  async clickContactUs(): Promise<void> {
    await this.contactUsBtn.click();
  }

  async clickTestCases(): Promise<void> {
    await this.testCasesBtn.click();
  }

  async clickProducts(): Promise<void> {
    await this.productsBtn.click();
  }

  async verifyLoggedInUser(username: string): Promise<void> {
    await expect(this.loggedInAsUser).toBeVisible();
    await expect(this.page.locator("li a b")).toHaveText(username);
  }

  async clickLogout(): Promise<void> {
    await this.logoutBtn.click();
  }

  async clickDeleteAccount(): Promise<void> {
    await this.deleteAccountBtn.click();
  }

  // --- Scrolling Methods (TC25 & TC26) ---

  async scrollToBottom(): Promise<void> {
    await this.page.evaluate(() =>
      window.scrollTo(0, document.body.scrollHeight),
    );
  }

  async scrollToTop(): Promise<void> {
    await this.page.evaluate(() => window.scrollTo(0, 0));
  }

  async verifySubscriptionHeader(): Promise<void> {
    await expect(this.subscriptionHeader).toBeVisible();
  }

  async clickScrollUpArrow(): Promise<void> {
    await this.scrollUpArrow.click();
  }

  async verifyMainHeaderVisible(): Promise<void> {
    await expect(this.mainHeader).toBeVisible();
  }

  async clickFirstViewProduct(): Promise<void> {
    await this.firstViewProductBtn.click();
  }

  async clickCart(): Promise<void> {
    await this.cartHeaderBtn.click();
  }

  // --- Recommended Items Methods (TC22) ---

  async scrollToRecommendedItems(): Promise<void> {
    await this.recommendedItemsHeader.scrollIntoViewIfNeeded();
    await expect(this.recommendedItemsHeader).toBeVisible();
  }

  async clickAddRecommendedProductToCart(): Promise<void> {
    await this.recommendedAddToCartBtn.scrollIntoViewIfNeeded();
    await expect(this.recommendedAddToCartBtn).toBeVisible();
    await this.recommendedAddToCartBtn.click({ force: true });
  }

  async clickModalViewCart(): Promise<void> {
    await expect(this.viewCartModalBtn).toBeVisible();
    await this.viewCartModalBtn.click({ force: true });
  }
}
