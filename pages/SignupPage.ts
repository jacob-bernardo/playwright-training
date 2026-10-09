import { Page, Locator, expect } from '@playwright/test';

export class SignupPage {
  readonly page: Page;
  readonly pageHeader: Locator;
  readonly titleMrRadio: Locator;
  readonly passwordInput: Locator;
  readonly daysSelect: Locator;
  readonly monthsSelect: Locator;
  readonly yearsSelect: Locator;
  readonly newsletterCheckbox: Locator;
  readonly specialOffersCheckbox: Locator;
  
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly companyInput: Locator;
  readonly address1Input: Locator;
  readonly address2Input: Locator;
  readonly countrySelect: Locator;
  readonly stateInput: Locator;
  readonly cityInput: Locator;
  readonly zipcodeInput: Locator;
  readonly mobileNumberInput: Locator;
  readonly createAccountBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageHeader = page.getByRole('heading', { name: 'ENTER ACCOUNT INFORMATION' });
    this.titleMrRadio = page.locator('input#id_gender1');
    this.passwordInput = page.locator('input[data-qa="password"]');
    this.daysSelect = page.locator('select[data-qa="days"]');
    this.monthsSelect = page.locator('select[data-qa="months"]');
    this.yearsSelect = page.locator('select[data-qa="years"]');
    this.newsletterCheckbox = page.locator('input#newsletter');
    this.specialOffersCheckbox = page.locator('input#optin');

    this.firstNameInput = page.locator('input[data-qa="first_name"]');
    this.lastNameInput = page.locator('input[data-qa="last_name"]');
    this.companyInput = page.locator('input[data-qa="company"]');
    this.address1Input = page.locator('input[data-qa="address"]');
    this.address2Input = page.locator('input[data-qa="address2"]');
    this.countrySelect = page.locator('select[data-qa="country"]');
    this.stateInput = page.locator('input[data-qa="state"]');
    this.cityInput = page.locator('input[data-qa="city"]');
    this.zipcodeInput = page.locator('input[data-qa="zipcode"]');
    this.mobileNumberInput = page.locator('input[data-qa="mobile_number"]');
    this.createAccountBtn = page.locator('button[data-qa="create-account"]');
  }

  async verifyPageHeader() {
    await expect(this.pageHeader).toBeVisible();
  }

  async fillAccountInfo(user: any) {
    await this.titleMrRadio.check();
    await this.passwordInput.fill(user.password);
    await this.daysSelect.selectOption(user.day);
    await this.monthsSelect.selectOption(user.month);
    await this.yearsSelect.selectOption(user.year);
    await this.newsletterCheckbox.check();
    await this.specialOffersCheckbox.check();
  }

  async fillAddressInfo(user: any) {
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.companyInput.fill(user.company);
    await this.address1Input.fill(user.address1);
    await this.address2Input.fill(user.address2);
    await this.countrySelect.selectOption(user.country);
    await this.stateInput.fill(user.state);
    await this.cityInput.fill(user.city);
    await this.zipcodeInput.fill(user.zipcode);
    await this.mobileNumberInput.fill(user.mobileNumber);
  }

  async clickCreateAccount() {
    await this.createAccountBtn.click();
  }
}