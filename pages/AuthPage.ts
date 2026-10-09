import { Page, Locator, expect } from '@playwright/test';

export class AuthPage {
  readonly page: Page;

  // Signup Locators
  readonly signupHeader: Locator;
  readonly signupNameInput: Locator;
  readonly signupEmailInput: Locator;
  readonly signupBtn: Locator;
  readonly signupErrorMessage: Locator; // Added for Test Case 5

  // Login Locators
  readonly loginHeader: Locator;
  readonly loginEmailInput: Locator;
  readonly loginPasswordInput: Locator;
  readonly loginBtn: Locator;
  readonly loginErrorMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    // Signup
    this.signupHeader = page.getByRole('heading', { name: 'New User Signup!' });
    this.signupNameInput = page.locator('input[data-qa="signup-name"]');
    this.signupEmailInput = page.locator('input[data-qa="signup-email"]');
    this.signupBtn = page.locator('button[data-qa="signup-button"]');
    this.signupErrorMessage = page.locator('form[action="/signup"] p'); // Target signup error paragraph

    // Login
    this.loginHeader = page.getByRole('heading', { name: 'Login to your account' });
    this.loginEmailInput = page.locator('input[data-qa="login-email"]');
    this.loginPasswordInput = page.locator('input[data-qa="login-password"]');
    this.loginBtn = page.locator('button[data-qa="login-button"]');
    this.loginErrorMessage = page.locator('form[action="/login"] p');
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

  // --- Signup Error Assertion (Added for Test Case 5) ---
  async verifySignupError() {
    await expect(this.signupErrorMessage).toBeVisible();
    await expect(this.signupErrorMessage).toHaveText('Email Address already exist!');
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
    await expect(this.loginErrorMessage).toHaveText('Your email or password is incorrect!');
  }
}