const { test, expect } = require('@playwright/test');
const POManager = require('./AI_PageObjects/POManager');
const { ai } = require("@zerostep/playwright"); // Import AI helper
// ================================================================
// Test Scenario: E2E Checkout using ZeroStep AI NLP
// This test performs a full end-to-end flow on SauceDemo:
// without using any  locators—AI NLP handles all page interactions
// 1. Navigate to login page
// 2. Login with a user
// 3. Add first product to cart
// 4. Verify cart contents
// 5. Fill customer info
// 6. Complete checkout
// 7. Verify order confirmation
// ================================================================
test('Roshan_SauceDemo_E2E:1 - Place Order End-to-End using ZeroStep AI @AI', async ({ browser, browserName }) => {

  const context = await browser.newContext();
  const page = await context.newPage();
 
  const POManagerObj = new POManager(page, test);

  console.log("\n==========================================================================");
  console.log("💽🚀 Starting E2E Test with Browser :: " + browserName + " !!");
  console.log("==========================================================================\n");

  //  Login Page
  const loginPage = POManagerObj.getLoginPage();
  await loginPage.navigateToLogin();
  await loginPage.login("standard_user", "secret_sauce"); // Using standard user credentials

  //  Product Page
  const productPage = POManagerObj.getProductPage();
  await productPage.addFirstProductToCart();

  //  Cart Page
  const cartPage = POManagerObj.getCartPage();
  await cartPage.verifyCart();

  //  Customer Info Page
  const custInfoPage = POManagerObj.getCustInfoPage();
  await custInfoPage.fillCustomerInfo();

  //  Checkout Page
  const checkoutPage = POManagerObj.getCheckoutPage();
  await checkoutPage.finishCheckout();

  //  Order Confirmation Page
  const orderConfirmationPage = POManagerObj.getOrderConfirmationPage();
  await orderConfirmationPage.verifyOrderConfirmation();

  await context.close();
});
