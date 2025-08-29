

class LoginPage
{    
    constructor(page) 
    {   this.page = page;
        this.signInButton = page.locator ("#login");
        this.userName = page.locator("#userEmail");
        this.password = page.locator("input[type='password']"); 
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

}
module.exports = {LoginPage};