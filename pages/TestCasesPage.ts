import { Page, Locator, expect } from "@playwright/test";

export class TestCasesPage {
  readonly page: Page;
  readonly testCasesHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.testCasesHeader = page.locator(
      "//h2[@class='title text-center']/b[text()='Test Cases']",
    );
  }

  async verifyTestCasesPageHeader() {
    await expect(this.testCasesHeader).toBeVisible();
    await expect(this.page).toHaveURL(/.*test_cases/);
  }
}
