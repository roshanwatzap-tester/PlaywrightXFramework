const { ai } = require("@zerostep/playwright"); // Import AI helper
const { test, expect } = require('@playwright/test');




class OrderConfirmationPage {
  constructor(AIvals) {
    this.AIvals = AIvals;
  }

  async verifyOrderConfirmation() {
    await ai("Verify a ThankYou message on the screen", this.AIvals);
    
    const ThankYouMessage = await ai("What is the ThankYou message on the screen", this.AIvals);
    console.log("ThankYou Message on the screen is : " + ThankYouMessage);  
    console.log("Order Placed Successfully");
  }
}

module.exports = OrderConfirmationPage;
