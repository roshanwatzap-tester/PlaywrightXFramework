const { ai } = require("@zerostep/playwright"); // External Library for NLP-based AI processing
const { test, expect } = require('@playwright/test');
// Import all Page Objects from AI PageObjects folder
const LoginPage = require('C:\\PlaywrightAutomationGITHUB\\PlaywrightXFramework\\AI\\AI_PageObjects\\LoginPage.js');
const ProductPage = require('C:\\PlaywrightAutomationGITHUB\\PlaywrightXFramework\\AI\\AI_PageObjects\\ProductPage.js');
const CartPage = require('C:\\PlaywrightAutomationGITHUB\\PlaywrightXFramework\\AI\\AI_PageObjects\\CartPage.js');
const CustInfoPage = require('C:\\PlaywrightAutomationGITHUB\\PlaywrightXFramework\\AI\\AI_PageObjects\\CustInfoPage.js');
const CheckoutPage = require('C:\\PlaywrightAutomationGITHUB\\PlaywrightXFramework\\AI\\AI_PageObjects\\CheckoutPage.js');
const OrderConfirmationPage = require('C:\\PlaywrightAutomationGITHUB\\PlaywrightXFramework\\AI\\AI_PageObjects\\OrderConfirmationPage.js');

class POManager {
  constructor(page, test) {
    this.page = page;
    this.test = test;

    const AIvals = { page: this.page, test: this.test };
    this.AIvals = AIvals;

    // Initialize page objects
    this.loginPage = new LoginPage(AIvals);
    this.productPage = new ProductPage(AIvals);
    this.cartPage = new CartPage(AIvals);
    this.custInfoPage = new CustInfoPage(AIvals);
    this.checkoutPage = new CheckoutPage(AIvals);
    this.orderConfirmationPage = new OrderConfirmationPage(AIvals);
  }  // <-- close constructor here
     
  getLoginPage() {
    return this.loginPage;
  }     
  getProductPage() {
    return this.productPage;
  } 
  getCartPage() {
    return this.cartPage;
  }
  getCustInfoPage() {
    return this.custInfoPage;
  } 
  getCheckoutPage() {
    return this.checkoutPage;
  }
  getOrderConfirmationPage() {
    return this.orderConfirmationPage;
  }   
}

module.exports = POManager;