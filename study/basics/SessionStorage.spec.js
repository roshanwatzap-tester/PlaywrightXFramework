const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    // Navigate to the desired URL
    await page.goto('https://yourwebsite.com');

    // Inject session storage
    await page.evaluate(() => {
        sessionStorage.setItem('key', 'value');
        // Add more items as needed
    });

    // Verify the session storage item
    const value = await page.evaluate(() => sessionStorage.getItem('key'));
    console.log(value); // Should log 'value'

    await browser.close();
})();