// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',       // Directory where your test files live
  timeout: 60 * 1000,       // Maximum time per test (40 seconds)

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 0 : 0,

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
    video : 'on',         
    
  },

  /* Define projects to run tests on different browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

   // --> 
   /*  hiding FF and Webkit 
    
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
*/
    
  ],

});