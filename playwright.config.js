// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',       // Directory where your test files live
  timeout: 940 * 1000,       // Maximum time per test (940 seconds)
  globalSetup: require.resolve('./globalSetup.js'), // for RunID Global setup file to set runID env variable

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 1 : 1,

  /* Opt out of parallel tests on CI */
  workers: process.env.CI ? 1 : undefined,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',

  /* Shared settings for all projects */
  use: {
    headless: true,          // Run browser in headless mode
    timeout: 30000,           // timeout after 30 seconds(30000milliseconds)
    screenshot: 'on',         // Capture screenshots on failure
    trace: 'on',              // Capture trace on failure
    viewport: null,          // Use full screen viewport
    video : 'retain-on-failure', // Record video only when test fails        
    
  },

  /* Define projects to run tests on different browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

   // --> 
    // /*  hiding FF and Webkit 
    
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    
    //*/--> 
    
  ],

});