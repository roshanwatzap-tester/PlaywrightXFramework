// PXF- roshanwatzap-tester 
// Step definitions for order placement using Playwright and Cucumber

const { Given, When, Then } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const { POManager } = require('../PageObjects/POManager');
const env_config = require('../Config/config');
const { getRecord, putRecord } = require("../utils/dbUtil");
const TestDataSet= JSON.parse(JSON.stringify(require('../testData/TestData_E2E_PO.json'))); // Test data JSON file

let browser, context, page, POManagerObj, dbRecord, dbOrderLog;
const country = TestDataSet.testCountry;  // -not using DB for this field JSON data from TestData_E2E_PO.json

Given('On website {string}', { timeout: 80 * 1000 }, async function (url) 
{
  browser = await chromium.launch({ headless: true });
  context = await browser.newContext();
  page = await context.newPage();

  POManagerObj = new POManager(page);

  dbRecord = await getRecord();
  if (!dbRecord) throw new Error("❌ No record found in DB table test_data");

  await page.goto(url || env_config.baseURL);
});

When('I login with DB credentials from DB',{ timeout: 80 * 1000 },  async function () {
  const loginPage = POManagerObj.getLoginPage();
  await loginPage.validLogin(dbRecord.username, dbRecord.password);
});

When('I search and add product {string} to cart',{ timeout: 80 * 1000 },  async function (testProduct) {
  const dashboardPage = POManagerObj.getDashboardpage();
  await dashboardPage.searchProduct(testProduct);
  await page.waitForLoadState('networkidle');
  await dashboardPage.navigateToCart();
});

When('I checkout with country {string}', { timeout: 80 * 1000 }, async function (testCountry) {

    const checkoutPage = POManagerObj.getCheckoutPage();

    console.log("The country in Feature file is:", testCountry);
    console.log("The country from JSON file is one with space:", country); 
    // Verify product in cart and place order with country from JSON
    await checkoutPage.verifyProductInCart(dbRecord.testProduct);
    // Perform Checkout operations and get order log details
  dbOrderLog = await checkoutPage.CheckoutOperations(dbRecord.username, country, dbRecord.logPath);

  console.log("🌟 Order placed successfully →", dbOrderLog);

 

});

Then('The order should be logged in DB', async function () {
  const runId = process.env.GLOBAL_RUN_ID;
  const TC_name = "PXF-E2E_" + dbRecord.testProduct;
  console.log("🌟 Using Run ID in Then step:", runId);
   console.log("runId before DB insert:", runId);
  console.log("TC_name before DB insert:", TC_name);
  await putRecord(dbOrderLog.orderIdformatted, dbOrderLog.timestamps, dbOrderLog.username, "chromium", TC_name, runId);

  console.log("💽🚀 Order logged successfully →", dbOrderLog);
  await context.close();
});
