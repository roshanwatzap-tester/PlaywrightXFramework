// globalSetup.js
module.exports = async () => {
  // Generate a unique alphanumeric string in uppercase (letters + numbers only)
  var uniqueCode = Math.random().toString(36).replace(/[^a-z0-9]/gi, '').slice(2, 10).toUpperCase();
  
  // Construct the run ID using string concatenation
  var runId = "RUN_ID_PXF_" + uniqueCode;
  
  // Set it as an environment variable
  process.env.GLOBAL_RUN_ID = runId;
  
  console.log("💽🚀 Global Run ID (set in globalSetup):", runId);
};
/*
How this works? 
It is called once before all tests start, 
as specified in playwright.config.js as shown below:
  globalSetup: require.resolve('./globalSetup.js'), // for RunID Global setup file to set runID env variable
How its generated?
The generated unique code is a random alphanumeric 
string of 8 characters (letters and numbers only) in uppercase, prefixed with "RUN_ID_PXF_".
PXF stands for PlaywrightXFramework. developed by Roshan Thomas roshanwapzap-tester 

Why use it?
When working with parallel tests across multiple browsers, this Run ID helps to uniquely identify 
and correlate test runs and their results.
*/