import { Page, Locator, expect } from '@playwright/test';

export class ContactUsPage {
  readonly page: Page;
  readonly contactHeader: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly subjectInput: Locator;
  readonly messageInput: Locator;
  readonly fileUploadInput: Locator;
  readonly submitBtn: Locator;
  readonly successMessage: Locator;
  readonly homeBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.contactHeader = page.getByRole('heading', { name: 'GET IN TOUCH' });
    this.nameInput = page.locator('input[data-qa="name"]');
    this.emailInput = page.locator('input[data-qa="email"]');
    this.subjectInput = page.locator('input[data-qa="subject"]');
    this.messageInput = page.locator('textarea[data-qa="message"]');
    this.fileUploadInput = page.locator('input[name="upload_file"]');
    this.submitBtn = page.locator('input[data-qa="submit-button"]');
    this.successMessage = page.locator('.status.alert-success');
    this.homeBtn = page.locator('#form-section a.btn-success');
  }

  // Verify 'GET IN TOUCH' header is visible
  async verifyHeader() {
    await expect(this.contactHeader).toBeVisible();
  }

  // Enter name, email, subject, and message
  async fillContactForm(name: string, email: string, subject: string, message: string) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.subjectInput.fill(subject);
    await this.messageInput.fill(message);
  }

  // Upload file
  async uploadFile(filePath: string) {
    await this.fileUploadInput.setInputFiles(filePath);
  }

  // Click 'Submit' and handle browser alert dialog ('OK' button)
  async submitFormWithDialogAccept() {
    // Set up dialog handler BEFORE clicking submit
    this.page.once('dialog', async (dialog) => {
      await dialog.accept();
    });
    await this.submitBtn.click();
  }

  // Verify success message
  async verifySuccessMessage() {
    await expect(this.successMessage).toBeVisible();
    await expect(this.successMessage).toHaveText(
      'Success! Your details have been submitted successfully.'
    );
  }

  // Click 'Home' button
  async clickHome() {
    await this.homeBtn.click();
  }
}