// Bypasing the Captcha
const puppeteer = require('puppeteer');
const chromeOptions = {
  headless: false,
  defaultViewPort: null,
};


(async function main() {
  const browser = await puppeteer.launch(chromeOptions);
  const page = await browser.newPage();
  await page.goto('https://www.zillow.com/');
})

