const {test,expect,request} = require('@playwright/test');
const { Util } = require('./Util');

const link ="https://www.google.co.in/";

test('Navigation', async ({page})=> 
    {
      

        const utilInstance = new Util(page,link); 

        const page1 = await utilInstance.Navigate(); 


    })