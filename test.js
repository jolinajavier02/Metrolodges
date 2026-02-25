const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('CONSOLE:', msg.text()));
  page.on('pageerror', error => console.error('JS ERROR:', error));
  await page.goto('file:///Users/abhijeetanand/Documents/Metrolodges/Metrolodges/index.html');
  await page.waitForTimeout(1000);
  console.log('Main file loaded');
  await browser.close();
})();
