const {test,expect} = require ('@playwright/test');

test('UI_TC01', async ({page})=>
    {
        // const context = browser.newContext(); 
        //const page = await context.newPage();

        await page.goto('https://www.google.com/');

        console.log("Title is:: " + await page.title());
        await expect(page).toHaveTitle('Google'); 

        const usernameField = page.locator("[id='username']");

        await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

        await usernameField.fill('rahulshettyacademy');

        await page.waitForTimeout(5000); 

        //const value = await usernameField.inputValue();

        expect(usernameField).toHaveValue('rahulshettyacademy'); 
        
        await page.locator("#signInBtn").click(); 
       
       const errmessage = await page.locator("[style ='display: block;']").textContent(); 

       await expect(errmessage).toContain('Empty'); 

       console.log("The Error message text displayed is:" + errmessage);

        console.log("Done"); 








    });

    test.only('TC02', async ({page})=>
    { const TestProduct = "Sauce Labs Onesie"; 
      await page.goto("https://www.saucedemo.com/"); 
      await page.waitForLoadState("networkidle"); 
      await page.locator("#user-name").fill('standard_user');
      await page.locator("#password").fill('secret_sauce');
      await page.locator("#login-button").click(); 
      await page.waitForLoadState("networkidle");
      //wait for first product name
      await page.locator(".inventory_item_description a").first().waitFor();
      // item list 
      const ItemsList = await page.locator(".inventory_item_description a");
      const ProductNamesList = await ItemsList.allTextContents();
      console.log(ProductNamesList);
      const prodCount = await ItemsList.count(); 
      console.log("The Product count is :  "+prodCount); 

      for(let i=0; i <prodCount; i++)
      { // Sauce Labs Onesie is Test Product
        if(await page.locator(".inventory_item_description a").nth(i).textContent() === TestProduct)
            {  
               const  j = i+1;  // just for display purpose
                console.log("Matched / Found Test Product:  "+TestProduct+ "  at : "+j );
               
                // Add to cart button click 
                await page.locator(".inventory_item_description").nth(i).locator("button").click(); 
                console.log("add to cart button clicked"); 

                break; 
            }
    
      }


      // click on Shopping cart at top right to go to shopping cart page

      await page.locator(".shopping_cart_link").click(); 

      await page.waitForLoadState("networkidle");

      const chkpageName = await page.locator(".inventory_item_name").textContent(); 

      expect(chkpageName).toBe(TestProduct); 


      // Click Checkout on Checkout page

      await page.locator("[name = 'checkout']").click(); 
      await page.waitForLoadState("networkidle"); 






      page.pause(); 

    });