import { Page, Locator, expect } from '@playwright/test';

export class AccountStatusPage {
  readonly page: Page;
  readonly accountCreatedHeader: Locator;
  readonly accountDeletedHeader: Locator;
  readonly continueBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.accountCreatedHeader = page.locator('h2[data-qa="account-created"]');
    this.accountDeletedHeader = page.locator('h2[data-qa="account-deleted"]');
    this.continueBtn = page.locator('a[data-qa="continue-button"]');
  }

  async verifyAccountCreated() {
    await expect(this.accountCreatedHeader).toBeVisible();
  }

  async verifyAccountDeleted() {
    await expect(this.accountDeletedHeader).toBeVisible();
  }

  async clickContinue() {
    await this.continueBtn.click();
  }
}