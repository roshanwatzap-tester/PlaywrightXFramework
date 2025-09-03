const { ai } = require("@zerostep/playwright"); // Import AI helper
const { test, expect } = require('@playwright/test');
class LoginPage {
  constructor(AIvals) {
    this.AIvals = AIvals;
  }

  async navigateToLogin() {
    await this.AIvals.page.goto("https://www.saucedemo.com/");
  }

  async login(username, password) {
    const headerText = await ai("Get the header text", this.AIvals);
    console.log("Header Text : " + headerText);

    await ai(`Type ${username} in the username field`, this.AIvals);
    await ai(`Type ${password} in the password field`, this.AIvals);
    await ai("Click on the Login Button", this.AIvals);
    console.log("Login Button Clicked");  
    
    await ai("Verify that user is logged in by checking the presence of Products text on the landing page", this.AIvals);
    await ai("Get the Products text on the landing page", this.AIvals);
      
    console.log("Login Completed");
  }
}

module.exports = LoginPage;
