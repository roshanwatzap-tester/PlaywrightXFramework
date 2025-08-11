const {test,expect} = require ('@playwright/test');

test('@Child windows hadl', async ({browser})=>
    {
       const context = await browser.newContext();
       const page =  await context.newPage();
       const userName = page.locator('#username');
       await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
       const documentLink = page.locator("[href*='documents-request']");
    
       const [newPage]=await Promise.all(
      [
         context.waitForEvent('page'),//listen for any new page pending,rejected,fulfilled
         documentLink.click(),
         console.log("Inside Promise"), // these 3 lines are run simultaneously
      
      ])//new page is opened
      
    
      const  text = await newPage.locator(".red").textContent();
       const arrayText = text.split("@")
       const domain =  arrayText[1].split(" ")[0]
       console.log(domain);
       await page.locator("#username").fill(domain);
       console.log(await page.locator("#username").textContent());
    
    })