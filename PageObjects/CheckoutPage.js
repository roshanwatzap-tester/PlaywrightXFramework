const { expect } = require('@playwright/test');
class CheckoutPage
{    
    constructor(page) 
    {   
        this.page = page;
        this.tproductlist= page.locator("div div ul li div div h3");


    }

    async verifyProductInCart(testProduct)
    {
         await this.tproductlist.first().waitFor();  // waitfor product list in Cart
        
                                   const bool = await this.page
                                   .locator('h3:has-text("'+testProduct+'")')
                                   .isVisible(); 
        
           await expect(bool).toBeTruthy();

    }

    async CheckoutOperations(username,testCountry)
    {

         
           // click Checkout button
        
           await this.page.locator("button:has-text('Checkout')").click();
        
          // enter IND in search and select india from typeahead
        
          // await page.waitForLoadState('networkidle'); 
          await this.page.locator("[placeholder*='Country']").waitFor(); 
        
                 await this.page
                       .locator("[placeholder*='Country']")
                       .pressSequentially("ind");
        
          const nationdropdown = await this.page
                                         .locator("[class='ta-results list-group ng-star-inserted']"); 
        
          await nationdropdown.waitFor();  // important step - I missed to add await 
        
          // hence count was shown as 0   ******************
        
          
        
          //const nationList = await nationdropdown.locator("button"); 
        
          //console.log(nationList); 
        
          const nationcount = await nationdropdown
                                      .locator("button")
                                      .count(); 
        
          console.log("The nation count is : "+nationcount); 
        
          for(let j=0; j<nationcount; ++j ) 
          {
           //console.log("entered for loop");
                  if(await nationdropdown
                    .locator("button")
                    .nth(j)
                    .textContent() === testCountry) //  enter >> " India"
        
                  {   console.log("Selecting the TestCountry");
                                      await nationdropdown
                                      .locator("button")
                                      .nth(j)
                                      .click(); 
        
                      //console.log("clicked India");
                      break; 
        
                   }
            
        
          }
        
          // verify if the email is autopopulated in the email text field
        
          const textFieldd =  await this.page.locator("input[type='text']").last();
        
          const value = await textFieldd.inputValue(); 
        
          console.log("The Email field autopopulated value extracted is : "+value);
        
          await  expect(value).toBe(username);
        
        // clicking on Place Order Button 
        
        await this.page.locator("a:has-text('Place Order ')").waitFor(); 
        
          await this.page.locator("a:has-text('Place Order ')").click(); 
        
         
        
         console.log("Place Order Button clicked");
        
         this.page.waitForLoadState('networkidle'); 
        
          /// Grabbing the Order ID : label[class='ng-star-inserted']#
        
          await  this.page.locator("label[class='ng-star-inserted']").waitFor(); 
          
          const OrderId = await  this.page.locator("label[class='ng-star-inserted']").textContent(); 
        
          console.log("Order Number is : "+OrderId);
        
          // Click on Order History Page Link 
          
          
          await this.page.locator("label[routerlink*='myorders']").click(); 
        
          await this.page.waitForLoadState('networkidle'); 
        
          // Order history page actions to check for the order and click on View
        
          await this.page.locator("tbody tr").first().waitFor(); 
        
          const rows = await this.page.locator("tbody tr"); 
        
          const counter = await rows.count(); 
        
          console.log("Count in Order History Page is :"+counter); 
        
          // not working from here below onwards 
        
          for( let k=0; k<counter ; ++k)
           {
              const iterOrderID = await rows.nth(k).locator("th").textContent(); 
        
              if(await OrderId.includes(iterOrderID) )
              {
                 console.log("Order ID found in Order History page on ROW NUMBER: " +k ); 
        
                  // click on View button
        
                  await rows.locator("button").first().click(); 
        
                  console.log("View Clicked");
        
                  
        
                  break;
                  
              }
        
        
           }
        
           
        
           // Go to the Order Summary page
           
           await this.page.waitForLoadState('networkidle');
        
    }

}
module.exports = {CheckoutPage};