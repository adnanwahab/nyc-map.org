// // An example that does not work
const puppeteer = require('puppeteer');
// console.log('What is in the variable? ', puppeteer);


(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // Not working because I need to verify I am human
  await page.goto('https://www.zillow.com/', { waitUntil: 'networkidle2' })
  // networkidle2 - consider navigation to be
  // finished when there are no more than 2 network connections for at least 500 ms.
  await page.pdf({ path: 'ZillowPDF.pdf', format: 'A4' });

  await browser.close();

})();
///////////////////////////////////////

// // //
// // const puppeteer = require('puppeteer');
// // // console.log('What is in the variable? ', puppeteer);

// // // (async () => {
// // //   const browser = await puppeteer.launch({ headless: false });

// // // 	const url = 'https://www.zillow.com/new-york-ny/rentals/?searchQueryState=%7B%22pagination%22%3A%7B%7D%2C%22usersSearchTerm%22%3A%22New%20York%2C%20NY%22%2C%22mapBounds%22%3A%7B%22west%22%3A-74.142751421875%2C%22east%22%3A-73.73488399023438%2C%22south%22%3A40.60328112729083%2C%22north%22%3A40.868627649966214%7D%2C%22regionSelection%22%3A%5B%7B%22regionId%22%3A6181%2C%22regionType%22%3A6%7D%5D%2C%22isMapVisible%22%3Atrue%2C%22filterState%22%3A%7B%22price%22%3A%7B%22min%22%3A400000%7D%2C%22mp%22%3A%7B%22min%22%3A1308%7D%2C%22fsba%22%3A%7B%22value%22%3Afalse%7D%2C%22fsbo%22%3A%7B%22value%22%3Afalse%7D%2C%22nc%22%3A%7B%22value%22%3Afalse%7D%2C%22fore%22%3A%7B%22value%22%3Afalse%7D%2C%22cmsn%22%3A%7B%22value%22%3Afalse%7D%2C%22auc%22%3A%7B%22value%22%3Afalse%7D%2C%22pmf%22%3A%7B%22value%22%3Afalse%7D%2C%22pf%22%3A%7B%22value%22%3Afalse%7D%2C%22fr%22%3A%7B%22value%22%3Atrue%7D%2C%22ah%22%3A%7B%22value%22%3Atrue%7D%2C%22mf%22%3A%7B%22value%22%3Afalse%7D%7D%2C%22isListVisible%22%3Atrue%2C%22mapZoom%22%3A11%7D';

// // // 	for (let i = 0; i < 3; i++) {
// // // 		const page = await browser.newPage();

// // // 		await page.goto(url);

// // // 		await page.waitFor(1500);

// // // 		await page.close();
// // // 	}

// // // 	await browser.close();

// // // })();
