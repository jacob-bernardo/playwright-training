import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { ContactUsPage } from '../../pages/ContactUsPage';

test('Test Case 6: Contact Us Form', async ({ page }) => {
  const homePage = new HomePage(page);
  const contactUsPage = new ContactUsPage(page);

  // Path to dummy file for upload step
  const filePath = 'tests/playwright.png';

  // 1–3. Launch browser, navigate to URL & verify home page
  await homePage.navigate();

  // 4. Click on 'Contact Us' button
  await homePage.clickContactUs();

  // 5. Verify 'GET IN TOUCH' is visible
  await contactUsPage.verifyHeader();

  // 6. Enter name, email, subject and message
  await contactUsPage.fillContactForm(
    'Automation Tester',
    'tester@example.com',
    'Inquiry regarding E2E suite',
    'Hello, this is an automated test message.'
  );

  // 7. Upload file
  await contactUsPage.uploadFile(filePath);

  // 8–9. Click 'Submit' button and click OK on dialog prompt
  await contactUsPage.submitFormWithDialogAccept();

  // 10. Verify success message 'Success! Your details have been submitted successfully.' is visible
  await contactUsPage.verifySuccessMessage();

  // 11. Click 'Home' button and verify landed to home page successfully
  await contactUsPage.clickHome();
  await expect(page).toHaveURL('https://automationexercise.com/');
});