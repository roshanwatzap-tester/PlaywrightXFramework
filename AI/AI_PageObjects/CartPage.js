// Import AI helper from ZeroStep (NLP-driven locators)
const { ai } = require("@zerostep/playwright"); 

// Import Playwright test & assertions
const { test, expect } = require('@playwright/test');

/**
 * CartPage - Page Object for Cart functionality
 * 
 * This Page Object demonstrates ZeroStep AI-based NLP commands 
 * for end-to-end cart operations such as:
 *  - Adding a product to the cart
 *  - Verifying product details (name, qty, price)
 *  - Navigating to checkout
 * 
 * AI-driven selectors (ZeroStep) replace traditional CSS/XPath locators,
 * making tests more resilient and human-readable.
 */
class CartPage {
  constructor(AIvals) {
    // Dependency injection of AI context (page, browser, etc.)
    this.AIvals = AIvals;
  }

  /**
   * verifyCart - End-to-end flow to validate cart functionality
   * 
   * Steps covered:
   * 1. Identify first product & add to cart
   * 2. Navigate to Cart page
   * 3. Verify URL, product details, and cart metadata
   * 4. Proceed to Checkout
   */
  async verifyCart() {
    // Step 1: Identify product details from the product listing
    const firstProductName = await ai("What is the name of the first product displayed", this.AIvals);
    console.log("First Product Displayed is: " + firstProductName + " (In Cart Page)");

    // Step 2: Add product to cart
    await ai("Click on Add to Cart for the first product displayed", this.AIvals);

    // Step 3: Navigate to cart
    await ai("Click on Cart Button available on top right", this.AIvals);
    console.log("Clicked on Cart Button (Top Right)");

    // Step 4: Validate that the Cart page is displayed
    const cartTitle = await ai("What is the Title of the Page", this.AIvals);
    console.log("Cart Page Title is: " + cartTitle);

    // Verify the cart page URL contains 'cart.html'
    expect(this.AIvals.page.url().includes("cart.html")).toBeTruthy();
    
    console.log("Verified that the URL ends with cart.html");
    console.log("Cart Page URL is: " + this.AIvals.page.url());

    // Step 5: Verify product details in Cart
    const qtyInCart = await ai("What is the QTY of the product", this.AIvals);
    expect(qtyInCart).toBe("1"); // Expect default quantity as 1
    console.log("Product Quantity in Cart: " + qtyInCart);

    const ProdNameInCart = await ai("What is the name of the product", this.AIvals);
    // Example assertion (commented, can be enabled if product is fixed)
    // expect(ProdNameInCart.trim()).toBe("Sauce Labs Backpack");
    console.log("Product Name in Cart: " + ProdNameInCart);

    const PriceInCart = await ai("What is the Price of the product", this.AIvals);
    // Example assertion (commented, can be enabled if product is fixed)
    // expect(PriceInCart.trim()).toBe("$29.99");
    console.log("Product Price in Cart: " + PriceInCart);

    // Step 6: Proceed to checkout
    await ai("Click on Checkout Button", this.AIvals);
  }
}

// Export CartPage object for reuse
module.exports = CartPage;
