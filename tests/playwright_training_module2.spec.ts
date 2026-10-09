import { test, expect } from '@playwright/test';

//Module Basic Navigation:
//TC7
test('Verify Test Cases Page', async ({ page }) => {
  await page.goto('https://automationexercise.com/', { waitUntil: 'domcontentloaded' });

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Automation Exercise/);

  await page.getByRole('link', { name: 'Test Cases', exact: true }).click();

  await expect(page.getByRole('heading', { name: 'Test Cases', exact: true })).toBeVisible();
});

//TC25
test('Verify Scroll Up using "Arrow" button and Scroll Down functionality', async ({ page }) => {
  await page.goto('https://automationexercise.com/', { waitUntil: 'domcontentloaded' });

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Automation Exercise/);

  // Move to the bottom element (forces visual scrolling)
  await page.locator('footer').scrollIntoViewIfNeeded();

  await page.waitForTimeout(2000);

  await expect(page.getByRole('heading', { name: 'Subscription', exact: true })).toBeVisible();

  await page.locator('#scrollUp').click();

  await page.waitForTimeout(2000);

  await expect(page.getByRole('heading', { name: 'Full-Fledged practice website for Automation Engineers' })).toBeVisible();
});

//TC2
test('Login User with correct email and password', async ({ page }) => {
  await page.goto('https://automationexercise.com/', { waitUntil: 'domcontentloaded' });

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Automation Exercise/);

  await page.locator('a[href="/login"]').click();

  await expect(page.getByRole('heading', { name: 'Login to your account', exact: true })).toBeVisible();

  await page.locator('input[data-qa="login-email"]').fill('jacob.bernardo@test.com');
  await page.locator('input[data-qa="login-password"]').fill('test123');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText(/Logged in as/i)).toBeVisible();

  await expect(page.locator('a[href="/logout"]')).toBeVisible();

  await page.locator('a[href="/logout"]').click();
  await expect(page.getByRole('heading', { name: 'Login to your account', exact: true })).toBeVisible();
});

//TC6
test('Contact Us Form', async ({ page }) => {
  await page.goto('https://automationexercise.com/', { waitUntil: 'domcontentloaded' });

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Automation Exercise/);

  await page.locator('a[href="/contact_us"]').click();

  await expect(page.getByRole('heading', { name: 'Get In Touch' })).toBeVisible();

  await page.locator('input[data-qa="name"]').fill('Jacob Bernardo');
  await page.locator('input[data-qa="email"]').fill('jacob.bernardo@test.com');
  await page.locator('textarea[data-qa="message"]').fill('This is a test message.');
  await page.locator('input[name="upload_file"]').setInputFiles(
    'D:/Playwright/playwright-training/tests/playwright.png'
  );

  page.once('dialog', async (dialog) => {
    await dialog.accept(); // Clicks "OK" on the alert modal
  });

  await page.locator('input[data-qa="submit-button"]').click();

//   await page.waitForTimeout(2000);
//   await expect(page.locator('.status.alert-success')).toBeVisible();
// `  await expect(page.locator('.status.alert-success')).toHaveText(
//     'Success! Your details have been submitted successfully.'
//   );

//   await page.waitForTimeout(2000);`

  await page.locator('ul.nav a[href="/"]').filter({ hasText: 'Home' }).click();

  await expect(page.getByRole('heading', { name: 'Full-Fledged practice website for Automation Engineers' })).toBeVisible();
});

//TC8
test('Verify All Products and product detail page', async ({ page }) => {
  await page.goto('https://automationexercise.com/', { waitUntil: 'domcontentloaded' });

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Automation Exercise/);

  await page.locator('a[href="/products"]').click();

  await expect(page.getByRole('heading', { name: 'All Products' })).toBeVisible();

  await expect(page.locator('div[class="features_items"]')).toBeVisible();

  await page.locator('a[href="/product_details/1"]').click();

  await expect(page.getByRole('heading', { name: 'Blue Top' })).toBeVisible();

  await expect(page.locator('//p[contains(text(),"Category: Women > Tops")]')).toBeVisible();

  await expect(page.locator('//span[contains(text(),"Rs. 500")]')).toBeVisible();
  
  await expect(page.locator('//b[contains(text(),"Availability")]')).toBeVisible();

  await expect(page.locator('//b[contains(text(),"Condition")]')).toBeVisible();

  await expect(page.locator('//b[contains(text(),"Brand")]')).toBeVisible();
});

//TC9
test('Search Product', async ({ page }) => {
  await page.goto('https://automationexercise.com/', { waitUntil: 'domcontentloaded' });

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Automation Exercise/);

  await page.locator('a[href="/products"]').click();

  await expect(page.getByRole('heading', { name: 'All Products' })).toBeVisible();
  
  await page.locator('input[id="search_product"]').fill('Blue Top');
  await page.locator('button[id="submit_search"]').click();

  await expect(page.getByRole('heading', { name: 'Searched Products' })).toBeVisible();
  await expect(page.locator('div[class="features_items"]')).toBeVisible();
});

//TC18
test('View Category Products', async ({ page }) => {
  await page.goto('https://automationexercise.com/', { waitUntil: 'domcontentloaded' });

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Automation Exercise/);

  await expect(page.getByRole('heading', { name: 'Category' })).toBeVisible();

  await page.locator('a[href="#Women"]').click();

  await page.locator('a[href="/category_products/2"]').click();

  await expect(page.getByRole('heading', { name: 'WOMEN - TOPS PRODUCTS' })).toBeVisible();

  await page.locator('a[href="#Men"]').click();

  await page.locator('a[href="/category_products/3"]').click();

  await expect(page.locator('h2[class="title text-center"]')).toBeVisible();
});

//TC12
test('Add Products in Cart', async ({ page }) => {
  await page.goto('https://automationexercise.com/', { waitUntil: 'domcontentloaded' });

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Automation Exercise/);

  await page.locator('a[href="/products"]').click();
  await page.waitForLoadState('domcontentloaded');

  await page.locator('.single-products').nth(0).hover();
  await page.locator('a[data-product-id="1"].add-to-cart').first().click();

  const continueShoppingBtn = page.locator('button[data-dismiss="modal"]');
  await continueShoppingBtn.click();
  await expect(continueShoppingBtn).toBeHidden();

  await page.locator('.single-products').nth(1).hover();
  await page.locator('a[data-product-id="2"].add-to-cart').first().click();

  await page.locator('#cartModal a[href="/view_cart"]').click();
  
  await expect(page).toHaveURL(/.*view_cart/);

  await expect(page.locator('tr[id="product-1"]')).toBeVisible();
  await expect(page.locator('tr[id="product-2"]')).toBeVisible();

  await expect(page.locator('tr[id="product-1"] td[class="cart_price"]')).toBeVisible();
  await expect(page.locator('tr[id="product-2"] td[class="cart_price"]')).toBeVisible();
  await expect(page.locator('tr[id="product-1"] td[class="cart_quantity"]')).toHaveText('1');
  await expect(page.locator('tr[id="product-2"] td[class="cart_quantity"]')).toHaveText('1');
  await expect(page.locator('tr[id="product-1"] td[class="cart_total"]')).toBeVisible();
  await expect(page.locator('tr[id="product-2"] td[class="cart_total"]')).toBeVisible();
});

//TC17
test('Remove Products From Cart', async ({ page }) => {
  await page.goto('https://automationexercise.com/', { waitUntil: 'domcontentloaded' });

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Automation Exercise/);

  await page.locator('a[href="/products"]').click();

  await page.locator('.single-products').nth(0).hover();
  await page.locator('a[data-product-id="1"].add-to-cart').first().click();

  const continueShoppingBtn = page.locator('button[data-dismiss="modal"]');
  await continueShoppingBtn.click();
  await expect(continueShoppingBtn).toBeHidden();

  await page.locator('.single-products').nth(1).hover();
  await page.locator('a[data-product-id="2"].add-to-cart').first().click();

  await page.locator('#cartModal a[href="/view_cart"]').click();
  
  await expect(page).toHaveURL(/.*view_cart/);

  await expect(page.locator('tr[id="product-1"]')).toBeVisible();
  await expect(page.locator('tr[id="product-2"]')).toBeVisible();


await page.locator('a.cart_quantity_delete[data-product-id="1"]').click();

await expect(page.locator('tr#product-1')).toBeHidden();

await page.locator('a.cart_quantity_delete[data-product-id="2"]').click();

await expect(page.locator('tr#product-2')).toBeHidden();
});

//TC24
test('Download Invoice after purchase order', async ({ page }) => {
  await page.goto('https://automationexercise.com/', { waitUntil: 'domcontentloaded' });

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Automation Exercise/);

  await page.locator('a[href="/login"]').click();

  await page.locator('input[data-qa="login-email"]').fill('jacob.bernardo@test.com');
  await page.locator('input[data-qa="login-password"]').fill('test123');
  await page.locator('button[data-qa="login-button"]').click();

  await page.locator('a[href="/products"]').click();

  const firstProduct = page.locator('.single-products').first();
  await firstProduct.waitFor({ state: 'visible' });

  await firstProduct.hover();
  await page.locator('a[data-product-id="1"].add-to-cart').first().click();

  const continueShoppingBtn = page.locator('button[data-dismiss="modal"]');
  await continueShoppingBtn.waitFor({ state: 'visible' });
  await continueShoppingBtn.click();
  await expect(continueShoppingBtn).toBeHidden();

  await page.locator('.single-products').nth(1).hover();
  await page.locator('a[data-product-id="2"].add-to-cart').first().click();

  const viewCartLink = page.locator('#cartModal a[href="/view_cart"]');
  await viewCartLink.waitFor({ state: 'visible' });
  await viewCartLink.click();
  
  await expect(page).toHaveURL(/.*view_cart/);

  await expect(page.locator('tr[id="product-1"]')).toBeVisible();
  await expect(page.locator('tr[id="product-2"]')).toBeVisible();

  await page.getByText('Proceed To Checkout').click();

  await expect(page.getByRole('heading', { name: 'Address Details' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Review Your Order' })).toBeVisible();

  await page.locator('textarea[name="message"]').fill('Please deliver between 9 AM and 5 PM.');

  await page.getByText('Place Order').click();

  await expect(page.locator('heading', { hasText: 'Payment' })).toBeVisible();

  await page.locator('input[data-qa="name-on-card"]').fill('Jacob Bernardo');

  await page.locator('input[data-qa="card-number"]').fill('4111111111111111');

  await page.locator('input[data-qa="cvc"]').fill('311');

  await page.locator('input[data-qa="expiry-month"]').fill('12');

  await page.locator('input[data-qa="expiry-year"]').fill('2028');

  await page.locator('button[data-qa="pay-button"]').click();

  await expect(page.locator('[data-qa="order-placed"]')).toBeVisible();

  await page.locator('a[data-qa="download-invoice"]').click();
  await expect(page.locator('a[data-qa="download-invoice"]')).toBeHidden();
});