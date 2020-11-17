const puppeteer = require("puppeteer");
require("dotenv").config();
(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });

  const page = await browser.newPage();

  await page.goto("https://www.dsm-dms.com/");
  await page.setViewport({
    width: 1920,
    height: 700,
  });
  page.waitForNavigation();
  page.click(".header--button");
  page.waitForSelector(".modal--input");
  setTimeout(async () => {
    await page.click(".modal--input:nth-child(1)");
    await page.type(".modal--input:nth-child(1)", process.env.ID);
    await page.click(".modal--input:nth-child(2)");
    await page.type(".modal--input:nth-child(2)", process.env.PASSWORD);
    await page.click(".modal--submit");
    page.on("dialog", async (dialog) => {
      console.log(dialog.message());
      await dialog.dismiss();
    });
    setTimeout(() => {
      page.goto("https://www.dsm-dms.com/apply/extension");
    }, 1000);

    await page.waitForSelector(".apply--content--extension--seat:nth-child(5)");
    setTimeout(async () => {
      await page.click(`.apply--content--extension--seat:nth-child(5)`);
      await page.waitForSelector(".apply--btn");
      await page.click(".apply--btn:nth-child(2)");
    }, 1000);
  }, 1000);
  await page.evaluate(() => {});
})();
