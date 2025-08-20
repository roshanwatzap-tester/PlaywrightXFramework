| Section                    | Details                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Author**                 | **Roshan Thomas - Auckland, New Zealand** <br> GitHub: [roshanwatzap-tester](https://github.com/roshanwatzap-tester)                                                                                                                                                                                                                                                                                                                                                                                                                     |
| **Overview**               | **PlaywrightXFramework** is a robust, modular, maintainable end-to-end UI automation framework built in **JavaScript**. <br> - Async handling and modularity <br> - Page Object Manager (POManager) using Factory + Facade patterns <br> - JSON-driven test data <br> - CI/CD via GitHub Actions <br> - Comprehensive reporting (Allure + Playwright HTML) <br> - Supports Chromium, Firefox, WebKit with parallel execution <br> - Clear separation of concerns <br> - Study folder for JavaScript fundamentals |
| **Framework Architecture** | **POManager (Page Object Manager)** implements **Factory + Facade design patterns**: <br> - **Factory:** Instantiates page objects (`LoginPage`, `DashboardPage`, `CheckoutPage`) dynamically <br> - **Facade:** Provides unified API for multiple page objects <br> - Single-point access via `poManager.getLoginPage()` <br> - Separates test scripts from UI locators and actions                                                                                                                             |
| **Example Usage**          | `javascript <br> const poManager = new POManager(page); <br> await poManager.getLoginPage().validLogin(username, password); <br> await poManager.getDashboardPage().selectProduct("ZARA COAT 3"); <br> await poManager.getCheckoutPage().completeCheckout(); <br> `                                                                                                                                                                                                                                              |
| **Page Objects**           | Encapsulate locators and actions per page. <br> - Example: LoginPage handles username, password fields, login button <br> - Uses Playwright auto-waits and network idle checks for stability                                                                                                                                                                                                                                                                                                                     |
| **Test Data Management**   | - JSON files store environment configurations and scenario data <br> - Switch easily: `const env = 'test'` <br> - Centralized for portability, maintainability, reusability <br> - Example `testData.json`: <br> `json <br> { "testProduct": "ZARA COAT 3", "testCountry": "India", "username": "roshan.thomas@test.com", "password": "Password2." } <br> `                                                                                                                                                      |
| **Built with JavaScript**  | - Seamless Playwright integration <br> - Async/await handling <br> - Modular and fast execution <br> - **Study Folder**: <br> ArrayBasics.js, BubbleSortArray.js, Palindrome.js, Promise.spec.js, SessionStorage.spec.js <br> - Demonstrates loops, functions, async behavior, data structures, algorithmic thinking <br> 💡 Mastering fundamentals improves framework design and problem-solving                                                                                                                |
| **Reporting**              | **Playwright HTML Reporter**: <br> - Captures screenshots, videos, traces <br> - Quick debugging and failure analysis <br> **Allure Reporting**: <br> - CI/CD integration <br> - Rich dashboards with trends, history, step-wise details <br> **Commands**: <br> `npx playwright test --reporter=line,allure-playwright` <br> `npx allure generate ./allure-results -o ./allure-report` <br> `allure open ./allure-report`                                                                                       |
| **CI/CD Integration**      | - GitHub Actions workflow in `.github/workflows/playwright.yml` <br> - Triggers: push or PR to master <br> - Steps: Checkout → Setup Node.js → Install dependencies → Install Playwright browsers → Run tests → Generate & upload Allure reports <br> - Ensures continuous validation on every commit                                                                                                                                                                                                            |
| **Browser Compatibility**  | - Chromium ✅ <br> - Firefox <br> - WebKit (Safari) <br> - Configured in `playwright.config.js` with parallel execution                                                                                                                                                                                                                                                                                                                                                                     |
| **Project Structure**      | `/tests` – Test scenarios <br> `/pages` – Page Objects <br> `/components` – Reusable UI components <br> `/helpers` – Utility modules <br> `/workflows` – Business workflows <br> `/config` – JSON environment configs <br> `/study/basics` – JS exercises <br> `/reports` – HTML & Allure reports <br> `/.github/workflows` – CI/CD YAML files                                                                                                                                                                   |
| **Git Workflow**           | **Initial Setup:** <br> `bash <br> git init <br> git add . <br> git commit -m "Initial commit" <br> git remote add origin https://github.com/roshanwatzap-tester/PlaywrightXFramework.git <br> git push -u origin master <br> ` <br> **Daily Workflow:** <br> `bash <br> git clone <repo-url> <br> git checkout -b ROSHAN_BRANCH <br> git add . <br> git commit -m "Changes in Env Config" <br> git push -u origin ROSHAN_BRANCH <br> git branch -d ROSHAN_BRANCH <br> `                                         |
| **Getting Started**        | `bash <br> git clone https://github.com/roshanwatzap-tester/PlaywrightXFramework.git <br> npm install <br> cp .env.example .env <br> npx playwright test <br> npx allure generate ./allure-results -o ./allure-report <br> allure open ./allure-report <br> `                                                                                                                                                                                                                                                    |
| **Key Benefits**           | - **Separation of Concerns:** Test logic decoupled from locators <br> - **Reusability:** Factory + Facade patterns <br> - **Scalability:** Add new pages/components/workflows easily <br> - **Reliability:** Auto-waits, reports, traces, retries <br> - **CI/CD Ready:** GitHub Actions <br> - **Flexible Test Data:** JSON-driven <br> - **Enterprise-Ready:** Professional structure, rich reporting, deep programming proficiency                                                                            |
| License         | Description                                                                                                   | Key Points       
| **MIT License** | A permissive open-source license allowing free use, modification, distribution, and sublicensing of software. | - Must include original copyright notice <br> - No warranty, authors not liable <br> - Can be used commercially or personally |
**Playwright Configuration (playwright.config.js) Explained**
| Configuration Key  | Current Value                                             | Description                                                                         | Setup / Change Examples                                                                                     |
| ------------------ | --------------------------------------------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| **testDir**        | `'./tests'`                                               | Directory where all test files reside.                                              | Default is `./tests`. Can be changed to `./e2e-tests` or any folder where your test scripts live.           |
| **timeout**        | `80 * 1000` (80 seconds)                                  | Maximum time allowed for a single test before failing.                              | Increase for slow tests: `120 * 1000` (120s).                                                               |
| **fullyParallel**  | `true`                                                    | Allows tests in different files to run in parallel.                                 | Set to `false` if tests must run sequentially due to shared state or resources.                             |
| **forbidOnly**     | `!!process.env.CI`                                        | Fails the build if a `test.only` is left in the code during CI runs.                | Usually `true` in CI. Can be disabled locally: `false`.                                                     |
| **retries**        | `process.env.CI ? 0 : 0`                                  | Number of retry attempts for failed tests.                                          | Example: `retries: 2` retries failed tests twice. Often higher in CI for flakiness.                         |
| **workers**        | `process.env.CI ? 1 : undefined`                          | Number of parallel worker processes.                                                | Can set manually: `workers: 4`. Using `1` in CI ensures sequential execution.                               |
| **reporter**       | `'html'`                                                  | Test reporter type. Options: `html`, `list`, `dot`, `allure-playwright`, etc.       | Example: `reporter: [['allure-playwright']]` for Allure reports.                                            |
| **use.headless**   | `false`                                                   | Whether the browser runs in headless mode.                                          | `true` for CI; `false` for local debugging to see browser actions.                                          |
| **use.timeout**    | `30000` (30 seconds)                                      | Maximum time for actions like click, type, waitForSelector.                         | Increase if some UI actions take longer: `60000`.                                                           |
| **use.screenshot** | `'on'`                                                    | Capture screenshots automatically. Options: `'on'`, `'off'`, `'only-on-failure'`.   | `'only-on-failure'` reduces storage use.                                                                    |
| **use.trace**      | `'on'`                                                    | Captures trace of browser actions. Options: `'on'`, `'retain-on-failure'`, `'off'`. | `'retain-on-failure'` is recommended for CI.                                                                |
| **use.viewport**   | `null`                                                    | Browser viewport size. `null` uses full screen.                                     | Can set `viewport: { width: 1280, height: 720 }` for fixed resolution testing.                              |
| **use.video**      | `'on'`                                                    | Records video of test runs. Options: `'on'`, `'off'`, `'retain-on-failure'`.        | `'retain-on-failure'` recommended to save space.                                                            |
| **projects**       | `{name: 'chromium', use: {...devices['Desktop Chrome']}}` | Defines browser(s) for running tests.                                               | Can add `firefox`, `webkit`: <br> `js <br> { name: 'firefox', use: {...devices['Desktop Firefox']} } <br> ` |
| **devices**        | `devices['Desktop Chrome']`                               | Predefined device/browser configuration from Playwright.                            | Can use mobile devices: <br> `devices['Pixel 5']` for mobile emulation.                                     |
|
Setup Notes
+++++++++++
Defaults are safe for local development.
Uncomment multiple projects to run tests on multiple browsers.
Adjust screenshots, trace, and video for storage efficiency in large suites.

Creating Custom scripts to trigger the tests from package.json
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
To run few selected tests in local (Like Smoke/Sanity/Regression)>
or you want to run for a particular config alone in Safari etc.
Example: 
npm run webtests  will trigger the below command::
> npx playwright test --grep @Web

Pacakge.Json set as below:

scripts": {
     "webtests" : "npx playwright test --grep @Web",
     "AItests"  : "npx playwright test --grep @AI",
     "SafariNewConfig" : "npx playwright test --config playwright.config1.js --project=safari"
  }

![Framework Overview](images/framework-overview.png)
![TerminalOutput](images/Terminal Output.png)
![Test Screenshot](images/screenshot1.png)
![Test Screenshot](images/screenshot2.png)
![Test Screenshot](images/screenshot3.png)
![HTML_Report](images/HTML_Report.png)
![Pipeline_Dashboard](images/Pipeline_Dashboard.png)
![Allure Report](images/AllureReport1.png)
![Trace](images/Trace.png)
![File_Operations](images/File_Operations.png)
![Pipeline(CISetup)](images/Pipeline(CISetup).png)
![Scripts](images/scripts.png)











  
