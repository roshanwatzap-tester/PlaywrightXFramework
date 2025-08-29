const {test, expect} = require ('@playwright/test');
const {POManager} = require('../PageObjects/POManager');
const env_config = require('../Config/config');
const { readFile, writeOrder } = require("../utils/fileUtil");
const TestDataSet= JSON.parse(JSON.stringify(require('../testData/TestData_E2E_PO.json')));
const { readExcel } = require("../utils/excelUtil");



 const runId = process.env.GLOBAL_RUN_ID;
 console.log("Using Run ID:", runId);
 
//Test Scenario : 3 
test('Roshan_E2E_Web_Scenario:3 - Complete E2E Placing Order fetched data from Excel @Web',async({browser,browserName}) => {

   // Read excel data
   const excelData = await readExcel('./testData/TestData.xlsx');
   
   if(excelData)
   {
      console.log("\n==========================================================================");
      console.log("💽🚀 Data fetched from Excel File → Starting Test with ::"+ browserName+"!!");
      console.log("===========================================================================\n");
   }

   else
   {
      console.log("❌ No data found in Excel file");
      return;
   }
   const context = await browser.newContext();
   const page    = await context.newPage(); 

   const POManagerObj = new POManager(page); 

   // Data from Excel file
   const testProduct = excelData.testProduct; // Data from Excel file
   const testCountry =excelData.testCountry; // Data from Excel file
   const logpath = excelData.logPath; // Data from Excel file
    
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
   await checkoutPage.CheckoutOperations(env_config.username,testCountry,logpath); 

  await context.close();
});
