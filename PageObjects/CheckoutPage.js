const { expect } = require('@playwright/test');
const { readFile, writeOrder } = require("../utils/fileUtil");


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
           if(bool)
            {
              console.log("Verified that Product present in Cart: "+testProduct);
            } 


    }

     async CheckoutOperations(username,testCountry,logPath)
    {
          
           // click Checkout button
        
           await this.page.locator("button:has-text('Checkout')").click();
           console.log("Clicked on Checkout button");
        
          // enter IND in search and select india from typeahead
        
          // await page.waitForLoadState('networkidle'); 
          await this.page.locator("[placeholder*='Country']").waitFor(); 
        
                 await this.page
                       .locator("[placeholder*='Country']")
                       .pressSequentially("ind");
          console.log("Entered in Country text box : ind");
          const nationdropdown = await this.page
                                         .locator("[class='ta-results list-group ng-star-inserted']"); 
        
          await nationdropdown.waitFor();  // important step - I missed to add await 
        
          // hence count was shown as 0   ******************
        
          
        
          //const nationList = await nationdropdown.locator("button"); 
        
          //console.log(nationList); 
        
          const nationcount = await nationdropdown
                                      .locator("button")
                                      .count(); 
        console.log("Nation count retrieved from dropdown: "+nationcount);
          
        
          for(let j=0; j<nationcount; ++j ) 
          {
           //console.log("entered for loop");
                  if(await nationdropdown
                    .locator("button")
                    .nth(j)
                    .textContent() === testCountry) //  enter >> " India"
        
                  {   console.log("Selecting the TestCountry:"+testCountry);
                                      await nationdropdown
                                      .locator("button")
                                      .nth(j)
                                      .click(); 
        
                      console.log("Selected the Country from dropdown: "+testCountry);
                      break; 
        
                   }
            
        
          }
        
          // verify if the email is autopopulated in the email text field
        
          const textFieldd =  await this.page.locator("input[type='text']").last();
        
          const value = await textFieldd.inputValue(); 
          
          console.log("Email field value is : "+value);

          await  expect(value).toBe(username);
         if(value === username)
          {
              console.log("Verified that Email field is autopopulated with username: "+username);
          }
         else
         {
          console.log("Email field is NOT autopopulated with username: "+username);
         }
        // clicking on Place Order Button 
        
        await this.page.locator("a:has-text('Place Order ')").waitFor(); 
        
          await this.page.locator("a:has-text('Place Order ')").click(); 
          console.log("Clicked on Place Order button");
           
         await this.page.waitForLoadState('networkidle'); 
        
          /// Grabbing the Order ID : label[class='ng-star-inserted']#
        
          await  this.page.locator("label[class='ng-star-inserted']").waitFor(); 
          
          const OrderId = await  this.page.locator("label[class='ng-star-inserted']").textContent();
          
          let orderIdformatted="";

          if(OrderId)
            {
                console.log("Order ID is captured from UI: "+OrderId);

                orderIdformatted = OrderId.split('|')[1].trim();


                console.log("Order Number(formatted) is : "+orderIdformatted);
            }
          else
            {
            console.log("Order ID is NOT found in UI");
          }

          // Write Order ID to file
          await  writeOrder(logPath, orderIdformatted,username); 
          console.log("Order details logged to file: "+logPath);
          
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
                  console.log("🌟 Test Completed – E2E Journey Successful and Verified! ✅");
                  
        
                  break;
                  
              }
        
        
           }
        
           
        
           // Go to the Order Summary page
           
           await this.page.waitForLoadState('networkidle');

           // NZ timezone is UTC+12 or UTC+13 during daylight saving
           const timestamps =  new Date().toLocaleString("en-NZ", { timeZone: "Pacific/Auckland" });
          
           
         return {orderIdformatted, timestamps, username}; // CheckoutOperations returns an object
        
    }

    

}
module.exports = {CheckoutPage};