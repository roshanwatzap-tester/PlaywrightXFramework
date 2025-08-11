const {test, expect} = require ('@playwright/test');
const {POManager} = require('../PageObjects/POManager');
const env_config = require('../Config/env_config');
const TestDataSet= JSON.parse(JSON.stringify(require('../utils/TestData_E2E_PO.json')));

 

//Test Scenario : 1 
test('Roshan_E2E_Web_Scenario:1',async({browser}) => {

   const context = await browser.newContext();
   const page    = await context.newPage(); 

   const POManagerObj = new POManager(page); 

   const testProduct =TestDataSet.testProduct;
   const testCountry =TestDataSet.testCountry; 
   
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
   await checkoutPage.CheckoutOperations(env_config.username,testCountry); 

  
});
//Test Scenario : 2 
test('Roshan_E2E_Web_Scenario:2',async({browser}) => {

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

   
  
});