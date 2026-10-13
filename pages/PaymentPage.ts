import { Page, Locator, expect } from "@playwright/test";

export class PaymentPage {
  readonly page: Page;
  readonly nameOnCardInput: Locator;
  readonly cardNumberInput: Locator;
  readonly cvcInput: Locator;
  readonly expiryMonthInput: Locator;
  readonly expiryYearInput: Locator;
  readonly payAndConfirmBtn: Locator;
  readonly successMessage: Locator;

  // Test Case 24 Locators
  readonly downloadInvoiceBtn: Locator;
  readonly continueBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameOnCardInput = page.locator('input[data-qa="name-on-card"]');
    this.cardNumberInput = page.locator('input[data-qa="card-number"]');
    this.cvcInput = page.locator('input[data-qa="cvc"]');
    this.expiryMonthInput = page.locator('input[data-qa="expiry-month"]');
    this.expiryYearInput = page.locator('input[data-qa="expiry-year"]');
    this.payAndConfirmBtn = page.locator('button[data-qa="pay-button"]');
    this.successMessage = page.locator("p", {
      hasText: "Congratulations! Your order has been confirmed!",
    });

    // Test Case 24
    this.downloadInvoiceBtn = page.locator("a.check_out", {
      hasText: "Download Invoice",
    });
    this.continueBtn = page.locator('a[data-qa="continue-button"]');
  }

  async enterPaymentDetails(
    name: string,
    cardNumber: string,
    cvc: string,
    month: string,
    year: string,
  ): Promise<void> {
    await this.nameOnCardInput.fill(name);
    await this.cardNumberInput.fill(cardNumber);
    await this.cvcInput.fill(cvc);
    await this.expiryMonthInput.fill(month);
    await this.expiryYearInput.fill(year);
  }

  async clickPayAndConfirmOrder(): Promise<void> {
    await this.payAndConfirmBtn.click({ force: true });
  }

  async verifySuccessMessage(): Promise<void> {
    await expect(this.successMessage).toBeVisible();
  }

  // --- Test Case 24 Methods ---

  async downloadInvoiceAndVerify(): Promise<string> {
    // Wait for the download event when clicking the button
    const downloadPromise = this.page.waitForEvent("download");
    await this.downloadInvoiceBtn.click({ force: true });
    const download = await downloadPromise;

    // Verify suggested filename
    const fileName = download.suggestedFilename();
    expect(fileName).toContain("invoice");

    return fileName;
  }

  async clickContinue(): Promise<void> {
    await this.continueBtn.click({ force: true });
  }
}
