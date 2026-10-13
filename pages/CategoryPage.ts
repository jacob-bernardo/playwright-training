import { Page, Locator, expect } from "@playwright/test";

export class CategoryPage {
  readonly page: Page;
  readonly categorySidebar: Locator;
  readonly womenCategoryBtn: Locator;
  readonly womenDressLink: Locator;
  readonly categoryTitleHeader: Locator;
  readonly menCategoryBtn: Locator;
  readonly menTshirtsLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.categorySidebar = page.locator(".left-sidebar");
    this.womenCategoryBtn = page.locator('a[href="#Women"]');
    this.womenDressLink = page.locator('a[href="/category_products/1"]'); // Dress sub-category
    this.categoryTitleHeader = page.locator(".features_items .title");
    this.menCategoryBtn = page.locator('a[href="#Men"]');
    this.menTshirtsLink = page.locator('a[href="/category_products/3"]'); // Tshirts sub-category
  }

  // Verify categories are visible on left sidebar
  async verifyCategoriesSidebarVisible(): Promise<void> {
    await expect(this.categorySidebar).toBeVisible();
  }

  // Expand Women Category
  async clickWomenCategory(): Promise<void> {
    await this.womenCategoryBtn.click();
  }

  // Click sub-category under Women (e.g. Dress)
  async clickWomenDressCategory(): Promise<void> {
    await this.womenDressLink.click();
  }

  // Verify category page title header
  async verifyCategoryHeaderTitle(expectedTitle: string): Promise<void> {
    await expect(this.categoryTitleHeader).toBeVisible();
    await expect(this.categoryTitleHeader).toHaveText(
      new RegExp(expectedTitle, "i"),
    );
  }

  // Expand Men Category
  async clickMenCategory(): Promise<void> {
    await this.menCategoryBtn.click();
  }

  // Click sub-category under Men (e.g. Tshirts)
  async clickMenTshirtsCategory(): Promise<void> {
    await this.menTshirtsLink.click();
  }
}
