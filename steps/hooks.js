// steps/hooks.js
const { BeforeAll } = require('@cucumber/cucumber');

BeforeAll(function () {
    if (!process.env.GLOBAL_RUN_ID) 
        {
        const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
        process.env.GLOBAL_RUN_ID = "RUNID_CUCUMBER_BDD_" + timestamp;
        }  
    console.log("🌟 Using PXF Cucumber Run ID:", process.env.GLOBAL_RUN_ID);
});
