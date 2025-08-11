const {test, expect} = require ('@playwright/test');
const { text } = require('stream/consumers');

test('E2E_WebAutomation',async({browser}) => {

   const context = await browser.newContext();
   const page    = await context.newPage(); 

   await page.goto("https://rahulshettyacademy.com/client");
   await page.waitForLoadState("networkidle"); 
   

   const usernameLoc = await page.locator("#userEmail");
   const passwordLoc = await page.locator("input[type='password']"); 
   const loginButtonLoc = await page.locator ("#login"); 


   // Login Page Actions 
   await usernameLoc.fill("roshan.thomas@test.com");
   await passwordLoc.fill("Password2."); 
   await loginButtonLoc.click(); 
   await page.waitForLoadState("networkidle");

   // Select the Product 
   
   const expectedProduct ="ZARA COAT 3";

               await page
               .locator(".card-body")
               .first()
               .waitFor(); // this helped solve the errors of not getting element

   const actualProdList = await page.locator(".card-body"); 

   const productCount = await actualProdList.count(); 

   console.log("The count of products is :: " +productCount ); 
  

   // Just a verfication step 
   // await page.locator(".card-body").first().waitFor();
   //console.log("Products are   :  "+  await actualProdList.allTextContents()); 

   
                 // Method 2  : 
                  await page
                  .locator(".card-body")
                  .filter({hasText:"ZARA COAT 3"})
                  .getByRole("button",{name:" Add To Cart"})
                  .click(); 
   console.log("Add To Cart Button clicked ");
   /*  
         Method  1: The Loop Approach: Using a for loop with CSS locators to iterate over products, identify matches, 
         and click "Add to Cart."  This method works well but involves writing multiple lines of code.

         Method  2: Playwright Locators: Leveraging the power of Playwright's .locator with filter and 
         getByRole for a more concise and efficient solution. With just a few lines, 
         I can achieve the same functionality seamlessly. 

Method 1 : 
   for ( let i=0; i <productCount; i++)

    {
       if( await actualProdList.nth(i).locator("b").textContent()  ===  expectedProduct )

                  {    
                     //console.log ("Product matched. Proceed to click Add to Cart");

                          await actualProdList.nth(i).locator("text= Add To Cart").click(); 

                          await page.waitForLoadState("networkidle");

                          console.log("Add To Cart Button clicked");
                          
                          break; 
                  }
                     
    } // for loop ended 
    */    



    // click on Cart button on top right

    await page.locator("button[routerlink*=cart]").click();

// Next verifying if the product name is the same across cart page  
    // div div ul li div div h3   

    await page.locator("div div ul li div div h3").first().waitFor(); 

                           const bool = await page
                           .locator("h3:has-text('ZARA COAT 3')")
                           .isVisible(); 

   await expect(bool).toBeTruthy(); 

   // click Checkout button

   await page.locator("button:has-text('Checkout')").click();

  // enter IND in search and select india from typeahead

  // await page.waitForLoadState('networkidle'); 
  await page.locator("[placeholder*='Country']").waitFor(); 

         await page
               .locator("[placeholder*='Country']")
               .pressSequentially("ind");

  const nationdropdown = await page
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
            .textContent() === " India")

          {   console.log("b4 click");
                              await nationdropdown
                              .locator("button")
                              .nth(j)
                              .click(); 

              //console.log("clicked India");
              break; 

           }
    

  }

  // verify if the email is autopopulated in the email text field

  const textFieldd =  await page.locator("input[type='text']").last();

  const value = await textFieldd.inputValue(); 

  console.log("The Email field autopopulated value extracted is : "+value);

  await  expect(value).toBe("roshan.thomas@test.com");

// clicking on Place Order Button 

await page.locator("a:has-text('Place Order ')").waitFor(); 

  await page.locator("a:has-text('Place Order ')").click(); 

 

 console.log("Place Order Button clicked");

 page.waitForLoadState('networkidle'); 

  /// Grabbing the Order ID : label[class='ng-star-inserted']#

  await  page.locator("label[class='ng-star-inserted']").waitFor(); 
  
  const OrderId = await  page.locator("label[class='ng-star-inserted']").textContent(); 

  console.log("Order Number is : "+OrderId);

  // Click on Order History Page Link 
  
  
  await page.locator("label[routerlink*='myorders']").click(); 

  await page.waitForLoadState('networkidle'); 

  // Order history page actions to check for the order and click on View

  await page.locator("tbody tr").first().waitFor(); 

  const rows = await page.locator("tbody tr"); 

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
   
   await page.waitForLoadState('networkidle');

   //page.locator(".email-title").waitFor(); // Order Summary Text
  // page.locator(".-teal").waitFor(); // View Orders Button
   
   
  //page.pause(); 

  

  // console.log("Checkout clicked")

   //page.pause();  
     

});