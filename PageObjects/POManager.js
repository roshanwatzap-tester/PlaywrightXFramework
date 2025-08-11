const {LoginPage} = require('../PageObjects/LoginPage');
const {DashboardPage} = require('../PageObjects/DashboardPage');
const {CheckoutPage} = require('../PageObjects/CheckoutPage');

class POManager
{

    constructor(page)
    {    
        this.page = page;
         this.loginPage = new LoginPage(this.page);
         this.dashboardPage = new DashboardPage(this.page);
         this.checkoutPage = new CheckoutPage(this.page);

    }

    getLoginPage()
    {

        return this.loginPage;
    }

    getDashboardpage()
    {
        return this.dashboardPage;
    }

     getCheckoutPage()
    {
        return this.checkoutPage;
    }

}
module.exports={POManager};