import { Page, Locator, expect } from "@playwright/test";

export class AuthPage {
  readonly page: Page;

  // Signup Locators
  readonly signupHeader: Locator;
  readonly signupNameInput: Locator;
  readonly signupEmailInput: Locator;
  readonly signupBtn: Locator;
  readonly signupErrorMessage: Locator;

  // Login Locators
  readonly loginHeader: Locator;
  readonly loginEmailInput: Locator;
  readonly loginPasswordInput: Locator;
  readonly loginBtn: Locator;
  readonly loginErrorMessage: Locator;

  // Registration Form Locators (Test Case 14 & Checkout Flows)
  readonly titleMrRadio: Locator;
  readonly passwordInput: Locator;
  readonly daysSelect: Locator;
  readonly monthsSelect: Locator;
  readonly yearsSelect: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly addressInput: Locator;
  readonly countrySelect: Locator;
  readonly stateInput: Locator;
  readonly cityInput: Locator;
  readonly zipcodeInput: Locator;
  readonly mobileInput: Locator;
  readonly createAccountBtn: Locator;
  readonly accountCreatedHeader: Locator;
  readonly continueBtn: Locator;
  readonly accountDeletedHeader: Locator;

  constructor(page: Page) {
    this.page = page;

    // Signup
    this.signupHeader = page.getByRole("heading", { name: "New User Signup!" });
    this.signupNameInput = page.locator('input[data-qa="signup-name"]');
    this.signupEmailInput = page.locator('input[data-qa="signup-email"]');
    this.signupBtn = page.locator('button[data-qa="signup-button"]');
    this.signupErrorMessage = page.locator('form[action="/signup"] p');

    // Login
    this.loginHeader = page.getByRole("heading", {
      name: "Login to your account",
    });
    this.loginEmailInput = page.locator('input[data-qa="login-email"]');
    this.loginPasswordInput = page.locator('input[data-qa="login-password"]');
    this.loginBtn = page.locator('button[data-qa="login-button"]');
    this.loginErrorMessage = page.locator('form[action="/login"] p');

    // Account Creation Form Details
    this.titleMrRadio = page.locator("#id_gender1");
    this.passwordInput = page.locator('input[data-qa="password"]');
    this.daysSelect = page.locator("#days");
    this.monthsSelect = page.locator("#months");
    this.yearsSelect = page.locator("#years");
    this.firstNameInput = page.locator('input[data-qa="first_name"]');
    this.lastNameInput = page.locator('input[data-qa="last_name"]');
    this.addressInput = page.locator('input[data-qa="address"]');
    this.countrySelect = page.locator("#country");
    this.stateInput = page.locator('input[data-qa="state"]');
    this.cityInput = page.locator('input[data-qa="city"]');
    this.zipcodeInput = page.locator('input[data-qa="zipcode"]');
    this.mobileInput = page.locator('input[data-qa="mobile_number"]');
    this.createAccountBtn = page.locator('button[data-qa="create-account"]');
    this.accountCreatedHeader = page.getByRole("heading", {
      name: "Account Created!",
    });
    this.continueBtn = page.locator('a[data-qa="continue-button"]');
    this.accountDeletedHeader = page.getByRole("heading", {
      name: "Account Deleted!",
    });
  }

  // --- Signup Actions ---
  async verifySignupHeader() {
    await expect(this.signupHeader).toBeVisible();
  }

  async enterSignupDetails(name: string, email: string) {
    await this.signupNameInput.fill(name);
    await this.signupEmailInput.fill(email);
  }

  async clickSignup() {
    await this.signupBtn.click();
  }

  // --- Signup Error Assertion ---
  async verifySignupError() {
    await expect(this.signupErrorMessage).toBeVisible();
    await expect(this.signupErrorMessage).toHaveText(
      "Email Address already exist!",
    );
  }

  // --- Account Registration Form Actions ---
  async fillAccountRegistrationDetails(details: {
    pass: string;
    firstName: string;
    lastName: string;
    address: string;
    country: string;
    state: string;
    city: string;
    zipcode: string;
    mobile: string;
  }) {
    await this.titleMrRadio.check();
    await this.passwordInput.fill(details.pass);
    await this.daysSelect.selectOption("1");
    await this.monthsSelect.selectOption("1");
    await this.yearsSelect.selectOption("1990");
    await this.firstNameInput.fill(details.firstName);
    await this.lastNameInput.fill(details.lastName);
    await this.addressInput.fill(details.address);
    await this.countrySelect.selectOption(details.country);
    await this.stateInput.fill(details.state);
    await this.cityInput.fill(details.city);
    await this.zipcodeInput.fill(details.zipcode);
    await this.mobileInput.fill(details.mobile);
    await this.createAccountBtn.click();
  }

  async verifyAccountCreated() {
    await expect(this.accountCreatedHeader).toBeVisible();
    await this.continueBtn.click();
  }

  async verifyAccountDeleted() {
    await expect(this.accountDeletedHeader).toBeVisible();
    await this.continueBtn.click();
  }

  // --- Login Actions ---
  async verifyLoginHeader() {
    await expect(this.loginHeader).toBeVisible();
  }

  async login(email: string, pass: string) {
    await this.loginEmailInput.fill(email);
    await this.loginPasswordInput.fill(pass);
    await this.loginBtn.click();
  }

  async verifyLoginError() {
    await expect(this.loginErrorMessage).toBeVisible();
    await expect(this.loginErrorMessage).toHaveText(
      "Your email or password is incorrect!",
    );
  }
}
