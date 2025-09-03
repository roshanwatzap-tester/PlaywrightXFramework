const { ai } = require("@zerostep/playwright"); // Import AI helper
class ProductPage {
  constructor(AIvals) {
    this.AIvals = AIvals;
  }

  async addFirstProductToCart() {
    const firstProductName = await ai("What is the name of the first product displayed", this.AIvals);
    console.log("First Product Displayed is :  " + firstProductName+" : In Product Page : Adding it to the Cart");

    await ai("Click on Add to Cart for the first product displayed", this.AIvals);
  }
}

module.exports = ProductPage;
