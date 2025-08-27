class DashboardPage
{


  constructor(page)
  {
        // List of Products 
        this.actualProdList = page.locator(".card-body"); 
        this.cartbutton     = page.locator("button[routerlink*=cart]")
        this.page = page;
  }

/*
 async printproductcount()
   {          
        //count of products 
        this.productCount = await this.actualProdList.count();
        console.log("***POM****The count of products is :: " + this.productCount); 

   }

  */ 

   async searchProduct(productName)
   {
        await this.actualProdList.first().waitFor();  

        await 
             this.actualProdList
                  .filter({hasText:productName})
                  .getByRole("button",{name:" Add To Cart"})
                  .click(); 
   console.log("Product Found ! Add To Cart Button clicked ");
   

   }


   // click on Cart button on top right
   async navigateToCart()
   {

     await this.cartbutton.click();
      console.log("Clicked on Cart button on top right");

      await this.page.waitForLoadState('networkidle');
          console.log("Navigated to Cart Page");
   }



}

module.exports = {DashboardPage};