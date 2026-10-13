import { Page, Locator, expect } from "@playwright/test";

export class CheckoutPage {
  readonly page: Page;
  readonly addressDetailsHeader: Locator;
  readonly orderReviewHeader: Locator;
  readonly commentTextArea: Locator;
  readonly placeOrderBtn: Locator;

  // Test Case 23 Locators
  readonly deliveryAddressList: Locator;
  readonly billingAddressList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addressDetailsHeader = page.getByRole("heading", {
      name: "Address Details",
    });
    this.orderReviewHeader = page.getByRole("heading", {
      name: "Review Your Order",
    });
    this.commentTextArea = page.locator('textarea[name="message"]');
    this.placeOrderBtn = page.locator('a[href="/payment"]');

    // Test Case 23
    this.deliveryAddressList = page.locator("#address_delivery");
    this.billingAddressList = page.locator("#address_invoice");
  }

  async verifyCheckoutPageDisplayed(): Promise<void> {
    await expect(this.addressDetailsHeader).toBeVisible();
    await expect(this.orderReviewHeader).toBeVisible();
  }

  async enterCommentAndPlaceOrder(comment: string): Promise<void> {
    await this.commentTextArea.fill(comment);
    await this.placeOrderBtn.click({ force: true });
  }

  // --- Test Case 23 Methods ---

  async verifyDeliveryAddressDetails(expectedAddress: {
    fullName: string;
    address1: string;
    cityStateZip: string;
    country: string;
    mobile: string;
  }): Promise<void> {
    await expect(this.deliveryAddressList).toContainText(
      expectedAddress.fullName,
    );
    await expect(this.deliveryAddressList).toContainText(
      expectedAddress.address1,
    );
    await expect(this.deliveryAddressList).toContainText(
      expectedAddress.cityStateZip,
    );
    await expect(this.deliveryAddressList).toContainText(
      expectedAddress.country,
    );
    await expect(this.deliveryAddressList).toContainText(
      expectedAddress.mobile,
    );
  }

  async verifyBillingAddressDetails(expectedAddress: {
    fullName: string;
    address1: string;
    cityStateZip: string;
    country: string;
    mobile: string;
  }): Promise<void> {
    await expect(this.billingAddressList).toContainText(
      expectedAddress.fullName,
    );
    await expect(this.billingAddressList).toContainText(
      expectedAddress.address1,
    );
    await expect(this.billingAddressList).toContainText(
      expectedAddress.cityStateZip,
    );
    await expect(this.billingAddressList).toContainText(
      expectedAddress.country,
    );
    await expect(this.billingAddressList).toContainText(expectedAddress.mobile);
  }
}
