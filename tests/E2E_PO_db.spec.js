const { test, expect } = require('@playwright/test'); // Playwright test library
const { POManager } = require('../PageObjects/POManager'); // POM Manager
const env_config = require('../Config/config'); // Import environment-specific config
const { getRecord,putRecord } = require("../utils/dbUtil");   // DB util to read and write to DB
const TestDataSet= JSON.parse(JSON.stringify(require('../testData/TestData_E2E_PO.json'))); // Test data JSON file


const runId = process.env.GLOBAL_RUN_ID; // Get Run ID from environment variable set in globalSetup.js run at the start of test suite from package.config.json
//console.log("Using Run ID:", runId);

//Test Scenario : 4
test('Roshan_E2E_Web_Scenario:4 - Complete E2E Placing Order with data fetched from Database @Web', async ({ browser,browserName }) => {

   // Get Test Case name
      const TC_name = test.info().title;
      console.log("\n===========================");
      console.log("💽🚀 Starting Test Case ::"+ TC_name+" with :: "+ browserName+" !!");

   // ✅ Read DB data
      const dbRecord = await getRecord();
      if(dbRecord)
      {
      console.log("\n=========================================================================");
      console.log("💽🚀 Data fetched from MySQL DB → Starting Test with ::"+ browserName+" !!");
      console.log("=========================================================================\n");
      }
      else
      {
         console.log("❌ No record found in DB table test_data");
         return;
      }
   
   const context = await browser.newContext();
   const page = await context.newPage();

   const POManagerObj = new POManager(page);

   // ✅ Data from DB
   const testProduct = dbRecord.testProduct;
   const username    = dbRecord.username;
   const password    = dbRecord.password;
   const logPath     = dbRecord.logPath;

   const testCountry =TestDataSet.testCountry;  // -not using DB for this field JSON data from TestData_E2E_PO.json  
   
   // Login - POM 
   const loginPage = POManagerObj.getLoginPage();  
   await loginPage.goTo(env_config.baseURL);
   await loginPage.validLogin(username, password);

   // DashboardPage - POM 
   const dashboardPage = POManagerObj.getDashboardpage(); 
   await dashboardPage.searchProduct(testProduct);  // search the Product and add to Cart
   
   await page.waitForLoadState('networkidle');
   
   await dashboardPage.navigateToCart();  // click on Cart button on top right - navigate to cart page

   // CheckoutPage - POM 
   const checkoutPage = POManagerObj.getCheckoutPage();  
   await checkoutPage.verifyProductInCart(testProduct);
   let dbOrderLog =await checkoutPage.CheckoutOperations(username, testCountry, logPath);

    

   //Insert Order ID to DB table named order_logs     
         await putRecord(dbOrderLog.orderIdformatted, dbOrderLog.timestamps, dbOrderLog.username,browserName, TC_name, runId);
         console.log("💽🚀 Order successfully logged with RunID"+ runId +"to MySQL DB →", dbOrderLog);
   
         await context.close();
});
