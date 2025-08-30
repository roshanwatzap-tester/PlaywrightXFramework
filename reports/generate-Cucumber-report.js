// Generate Cucumber HTML report from JSON files 
// reports/generate-report.js
const report = require('multiple-cucumber-html-reporter');

report.generate({
    jsonDir: './reports',           // input JSON folder
    reportPath: './reports/html',   // output HTML folder
    metadata:{
        browser: {name: 'chrome', version: 'latest'},
        device: 'Local Machine',
        platform: {name: 'windows'}
    }

    
}



);
