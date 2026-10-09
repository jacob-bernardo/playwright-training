import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly signupLoginBtn: Locator;
  readonly contactUsBtn: Locator;
  readonly testCasesBtn: Locator;
  readonly loggedInAsUser: Locator;
  readonly logoutBtn: Locator;
  readonly deleteAccountBtn: Locator;

  // Test Case 25 & 26 Locators
  readonly subscriptionHeader: Locator;
  readonly scrollUpArrow: Locator;
  readonly mainHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signupLoginBtn = page.locator('a[href="/login"]');
    this.contactUsBtn = page.locator('a[href="/contact_us"]');
    this.testCasesBtn = page.locator('a[href="/test_cases"]').first();
    this.loggedInAsUser = page.getByText(/Logged in as/i);
    this.logoutBtn = page.locator('a[href="/logout"]');
    this.deleteAccountBtn = page.locator('a[href="/delete_account"]');

    // Test Case 25 & 26
    this.subscriptionHeader = page.getByRole('heading', { name: 'SUBSCRIPTION' });
    this.scrollUpArrow = page.locator('#scrollUp');
    this.mainHeader = page.getByText('Full-Fledged practice website for Automation Engineers').first();
  }

  async navigate() {
    await this.page.goto('https://automationexercise.com/', { waitUntil: 'domcontentloaded' });
    await expect(this.page).toHaveTitle(/Automation Exercise/);
  }

  async clickSignupLogin() {
    await this.signupLoginBtn.click();
  }

  async clickContactUs() {
    await this.contactUsBtn.click();
  }

  async clickTestCases() {
    await this.testCasesBtn.click();
  }

  async verifyLoggedInUser(username: string) {
    await expect(this.loggedInAsUser).toBeVisible();
    await expect(this.page.locator('li a b')).toHaveText(username);
  }

  async clickLogout() {
    await this.logoutBtn.click();
  }

  async clickDeleteAccount() {
    await this.deleteAccountBtn.click();
  }

  // --- Scrolling Methods (TC25 & TC26) ---

  // Scroll down to the bottom of the page
  async scrollToBottom() {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  }

  // Scroll up to the top of the page (Added for TC26)
  async scrollToTop() {
    await this.page.evaluate(() => window.scrollTo(0, 0));
  }

  // Verify 'SUBSCRIPTION' section is visible
  async verifySubscriptionHeader() {
    await expect(this.subscriptionHeader).toBeVisible();
  }

  // Click on the bottom-right upward arrow button
  async clickScrollUpArrow() {
    await this.scrollUpArrow.click();
  }

  // Verify main header text is visible on screen
  async verifyMainHeaderVisible() {
    await expect(this.mainHeader).toBeVisible();
  }
}