const { ai } = require("@zerostep/playwright"); // Import AI helper
const { test, expect } = require('@playwright/test');
class CustInfoPage {
  constructor(AIvals) {
    this.AIvals = AIvals;
  }

  async fillCustomerInfo() {
    await ai("Fill realistic values in the Form", this.AIvals);
    

    // Verification Steps 
       
    const checkOutOverviewTitle = await ai("What is the Title of the Page", this.AIvals); 
    console.log("Title of the Page is :  " + checkOutOverviewTitle);
   

    // Yes, you can ask for all the values entered in the form like this.
    // To get them as a string array and print them:
    const enteredValues = await ai("Get all the realistic values entered in the form", this.AIvals);
    console.log("Entered values in the form:", enteredValues);
  
    await ai("Click on Continue Button", this.AIvals);
    console.log("Clicked on Continue Button");
  }
}

module.exports = CustInfoPage;
 