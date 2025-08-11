const {test} = require ('@playwright/test');
const {expect} = require('@playwright/test');

let Webcontext ;

test.beforeAll(async({browser})=>
  {
    const context = await browser.newContext();
    const page = await context.newPage(); 

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.locator('#username').fill("rahulshettyacademy"); 
    await page.locator("[name='password']").fill("learning");
    await page.locator("[name='signin']").click(); 
    await page.waitForLoadState('networkidle');
    await context.storageState({path: 'state.json'});
    Webcontext=  await browser.newContext({storageState: 'state.json'});
  })

test('TC01', async ()=>
{
      const page1=  await Webcontext.newPage(); 

      await page1.goto("https://rahulshettyacademy.com/loginpagePractise/");

          

     //const errorElement = page.locator("[style*='block']");

     const pagetitle = await page1.title(); 

     const cardTitles = await page1.locator('.card-body a');

     await console.log('Title is :'+ pagetitle);

/*

     await page.locator('#username').fill("rahulshetty"); 

     await console.log('Username entered successfully');



     await console.log('Password entered successfully');

     await page.locator("[name='signin']").click(); 
     
     // read the error message text content

    const ErrorMessg = await errorElement.textContent();

    console.log("Error message displayed is :" +ErrorMessg );

    await expect(errorElement).toHaveText('Incorrect username/password.');

*/
    

    const iphnxElmnt = await cardTitles.first().waitFor();

   // console.log("First device on page is :" +await iphnxElmnt.textContent()); 

    const alltitles = await cardTitles.allTextContents();

    console.log("All Card Titles:"+alltitles);

     
    //await page.waitForTimeout(5000);
           
    // await console.log(await page.title()); 

     //await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");


     /*
     let isTitleCorrect;

try 
{
  await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
  isTitleCorrect = true;  // If assertion passes, set to true
} 

catch (error) 
{
  isTitleCorrect = false; // If assertion fails, set to false
}

console.log("Title assertion is:", isTitleCorrect);
  
*/





} ) ;  