import { Page, Locator, expect } from "@playwright/test";

export class BrandsPage {
  readonly page: Page;
  readonly brandsSidebar: Locator;
  readonly poloBrandLink: Locator;
  readonly madameBrandLink: Locator;
  readonly brandHeaderTitle: Locator;
  readonly brandProductsList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.brandsSidebar = page.locator(".brands_products");
    this.poloBrandLink = page.locator('a[href="/brand_products/Polo"]');
    this.madameBrandLink = page.locator('a[href="/brand_products/Madame"]');
    this.brandHeaderTitle = page.locator(".features_items .title");
    this.brandProductsList = page.locator(".features_items .single-products");
  }

  // Verify 'Brands' sidebar section is visible
  async verifyBrandsSidebarVisible(): Promise<void> {
    await expect(this.brandsSidebar).toBeVisible();
  }

  // Click on the 'Polo' brand link
  async clickPoloBrand(): Promise<void> {
    await this.poloBrandLink.click();
  }

  // Click on the 'Madame' brand link
  async clickMadameBrand(): Promise<void> {
    await this.madameBrandLink.click();
  }

  // Verify navigation to specific brand page and brand title
  async verifyBrandHeaderTitle(expectedBrandTitle: string): Promise<void> {
    await expect(this.brandHeaderTitle).toBeVisible();
    await expect(this.brandHeaderTitle).toHaveText(
      new RegExp(expectedBrandTitle, "i"),
    );
  }

  // Verify that products for the selected brand are displayed
  async verifyBrandProductsDisplayed(): Promise<void> {
    const count = await this.brandProductsList.count();
    expect(count).toBeGreaterThan(0);
    await expect(this.brandProductsList.first()).toBeVisible();
  }
}
