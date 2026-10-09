import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { AuthPage } from '../../pages/AuthPage';

test('Test Case 3: Login User with incorrect email and password', async ({ page }) => {
  const homePage = new HomePage(page);
  const authPage = new AuthPage(page);

  // 1–3. Launch browser, navigate to URL & verify home page
  await homePage.navigate();

  // 4. Click on 'Signup / Login' button
  await homePage.clickSignupLogin();

  // 5. Verify 'Login to your account' is visible
  await authPage.verifyLoginHeader();

  // 6–7. Enter incorrect email address and password, then click 'login'
  await authPage.login('invalid_user_999@nonexistent.com', 'WrongPassword123!');

  // 8. Verify error 'Your email or password is incorrect!' is visible
  await authPage.verifyLoginError();
});