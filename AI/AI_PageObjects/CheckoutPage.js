const { ai } = require("@zerostep/playwright"); // Import AI helper
const { test, expect } = require('@playwright/test');
class CheckoutPage {
  constructor(AIvals) {
    this.AIvals = AIvals;
  }

  async finishCheckout() {
    await ai("Click on Finish Button", this.AIvals);
    console.log("Clicked on Finish Button");

    // Verification Steps 
    await ai("Verify that user is navigated to Order Confirmation page by checking the presence of ThankYou message on the screen", this.AIvals);
    await ai("Get the ThankYou message on the screen", this.AIvals);
    console.log("User is on Order Confirmation Page");
  }
}

module.exports = CheckoutPage;
