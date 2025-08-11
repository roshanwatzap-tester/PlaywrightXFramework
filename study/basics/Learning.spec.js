const {test,expect} = require ('@playwright/test');

test('PlaywrightPractice_RoshanThomas', async ({browser})=>
{
     const context = await browser.newContext();
     const   page  = await context.newPage();  

     // Loading page and entering username and password

     await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
     await page.locator("#username").fill("rahulshettyacademy"); 
     await page.locator("#password").fill("learning"); 

     // HANDLING RADIO BUTTONS

     // radio button click - User 
     await  page.locator("span.checkmark").last().click(); 

     // click ok in popup menu 
     await  page.locator("#okayBtn").click(); 

     //to verify if the radio button is selected

     console.log("Verification Result if User Radio buttn is selected :: "+await page.locator("span.checkmark").last().isChecked());
     
     //Assertion to vefify if the same "User radio bttn" is selected
     await expect(page.locator("span.checkmark").last()).toBeChecked();

     
     

    
    
    //Assertion to vefify if the same "User radio bttn" is selected
    await expect(page.locator("span.checkmark").last()).toBeChecked();



     // HANDLING STATIC DROPDOWN

     // Locate the dropdown

     const dropdown1 = page.locator("select.form-control"); 

     // print on console
     
     const options =await dropdown1.locator('option').allTextContents(); 

     console.log(options); 

     // to select a value from dropdown - select consult 

     dropdown1.selectOption("consult");   

     // checkbox Agreement checked

      await page.locator("input[id='terms']").click(); 

      await expect(page.locator("input[id='terms']")).toBeChecked(); 

      // Verify if the blinking text is displayed

      //const blink = await page.locator(".blinkingText"); 
      const blink = await page.locator("[href*='documents-request']"); 
      await expect(blink).toHaveAttribute("class","blinkingText");

      // click on the blinking text and ensure the new page is opened and check text

     const [newpage1] = await Promise.all 
     ( 
           [  context.waitForEvent("page"),      
             blink.click(), 


           ]


     ); 
         // extract the text in red color  and display in console 

     const redtext =  await newpage1.locator(".red").textContent();

     console.log("Using textcontent : "+redtext); 

     const innerstext =  await newpage1.locator(".red").innerText(); 

     console.log("Using innertext : "+innerstext); 

     const redarray = redtext.split("@");

     const emailIDarray = redarray[1].split(" "); 

     console.log("Extracted Email ID is >>>> "+emailIDarray[0]); 






     // CLICK SIGNIN to signin 
     
     await page.locator("[value = 'Sign In']").click(); 

     // wait until Product page is loaded successfully 
    
      await page.waitForLoadState("networkidle"); 

      console.log(">>network idle over ! ")

      await page.waitForTimeout(5000);
      console.log(">> 5 seconds of wait also  over ! ")
     


     
  





} ) ;  