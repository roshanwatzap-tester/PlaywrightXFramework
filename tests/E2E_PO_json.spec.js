const {test, expect} = require ('@playwright/test');
const {POManager} = require('../PageObjects/POManager');
const env_config = require('../Config/config');
const { readFile, writeOrder } = require("../utils/fileUtil");
const TestDataSet= JSON.parse(JSON.stringify(require('../testData/TestData_E2E_PO.json')));

 
const runId = process.env.GLOBAL_RUN_ID;
console.log("Using Run ID:", runId);

//Test Scenario : 1 
test('Roshan_E2E_Web_Scenario:1 - Complete E2E Placing Order with data fetched from JSON @Web',async({browser,browserName}) => {

   const context = await browser.newContext();
   const page    = await context.newPage(); 

   const POManagerObj = new POManager(page); 
   
   if(TestDataSet)
   {
      console.log("\n==========================================================================");
      console.log("💽🚀 Data fetched from JSON File → Starting Test with ::"+ browserName+" !!");
      console.log("==========================================================================\n");
   }

   else
   {
      console
      return;
   }
   const testProduct =TestDataSet.testProduct; // JSON data from TestData_E2E_PO.json 
   const testCountry =TestDataSet.testCountry; 
   const logPath = TestDataSet.logPath;
   
    // Login - POM 
   const loginPage = POManagerObj.getLoginPage();  
   await loginPage.goTo(env_config.baseURL);
   await loginPage.validLogin(env_config.username,env_config.password);
     
   // DashboardPage - POM 
   const dashboardPage = POManagerObj.getDashboardpage(); 
   await dashboardPage.searchProduct(testProduct);     // search the Product and add to Cart
   await dashboardPage.navigateToCart(); // click on Cart button on top right - navigate to cart page

   // CheckoutPage - POM 
   const checkoutPage = POManagerObj.getCheckoutPage();  
   await checkoutPage.verifyProductInCart(testProduct);
   await checkoutPage.CheckoutOperations(env_config.username,testCountry,logPath); 

  await context.close();
});
//Test Scenario : 2 
test('Roshan_E2E_Web_Scenario:2-Verfiy navigation till Cart @Web',async({browser,browserName}) => {

   const context = await browser.newContext();
   const page    = await context.newPage(); 
   const testProduct ="ZARA COAT 3";
   const testCountry =" India"; 
   const POManagerObj1 = new POManager(page);
    // Login - POM 
   const loginPage = POManagerObj1.getLoginPage();
   await loginPage.goTo(env_config.baseURL);
   await loginPage.validLogin(env_config.username,env_config.password);
   
   // DashboardPage - POM 
   const dashboardPage = POManagerObj1.getDashboardpage();
   await dashboardPage.searchProduct(testProduct);     // search the Product and add to Cart
   await dashboardPage.navigateToCart(); // click on Cart button on top right - navigate to cart page
    
   await context.close();
   
  
});