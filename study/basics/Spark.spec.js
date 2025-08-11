const {test,expect}= require('@playwright/test');




test.only('Spark Hover', async({browser})=>
{

    const context = await browser.newContext();
    const page  = await browser.newPage(); 
    

    await page.goto("https://www.spark.co.nz/"); 

    //const hoverElement = (await page).locator(""); 

    //await page.locator(".nav-list").waitFor(); 

    await page.getByRole('link', { name: 'Shop ' }).hover();

await page.waitForTimeout(5000); 

    await page.getByRole('link',{name: 'All phones'}).click(); 

   // page.pause(); 

} ); 
