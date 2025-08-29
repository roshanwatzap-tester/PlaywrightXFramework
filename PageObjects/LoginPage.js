// Using Microsoft Code Copilot below

//I want a Microsoft Playwright Page Object Model for Login Page with AI Self-Healing Locators and Verification for Unconfirmed Login
//Give me a Page Object file for LoginPage.js in PlaywrightXFramework/PageObjects folder. 
// The page object should have methods to interact with the login page of a web application. 
// Include methods for entering username, entering password, clicking the login button, 
// and verifying successful login. 
// Use appropriate selectors and ensure the code follows best practices for maintainability and readability.
// can you please add self healing locators using AI locators for the elements in the page object file.
//can you please add a verification method for unconfirmed login
// if the wrong password is entered or any other invalid credentials are entered.
// Incorrect email or password  -   this is the error message shown on the UI
// The verification method should check for the presence of this error message and return a boolean value indicating whether 
// the login was unsuccessful.                   
//this error message appears and disappears quickly, so please add appropriate wait or timeout to check for the error message
// Also, please ensure that the code is compatible with the existing structure of the PlaywrightXFramework project.

class LoginPage
{    
    constructor(page) 
    {   this.page = page;
        this.signInButton = page.locator ("#login").or(this.page.getByRole('button', { name: 'Sign In' })).or(this.page.locator("button:has-text('Sign In')"));
        this.userName = page.locator("#userEmail").or(this.page.getByPlaceholder('Enter your email')).or(this.page.locator("input[type='email']"));
        this.password = page.locator("input[type='password']").or(this.page.getByPlaceholder('Enter your password')).or(this.page.locator("input[placeholder*='password']")); 
        this.errorMessage = page.locator("text=Incorrect email or password").or(this.page.getByText('Incorrect email or password')).or(this.page.locator("div:has-text('Incorrect email or password')"));
    }

    async goTo(url)
    {
          //this.url = url; 
          await this.page.goto(url);
          await this.page.waitForLoadState("networkidle");
          
    }

   async validLogin (userName,password)
   {
      await this.userName.fill(userName);
      await this.password.fill(password); 
      
      await this.signInButton.click(); 
      await this.page.waitForLoadState("networkidle");
      console.log("Login Successful with User: "+userName);
   }

   async isLoginUnsuccessful() {
      try {
          // Wait for the error message to appear with a timeout of 5 seconds
          await this.errorMessage.waitFor({ state: 'visible', timeout: 5000 });
          console.log("Login unsuccessful: Error message displayed.");
          return true; // Login was unsuccessful
      } catch (error) {
          console.log("Login successful: No error message displayed.");
          return false; // Login was successful
      }
  }

}
module.exports = {LoginPage};