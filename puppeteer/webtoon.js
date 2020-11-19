const puppeteer = require("puppeteer");
const fs = require("fs");
(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });

  const page = await browser.newPage();
  await page.goto("https://comic.naver.com/webtoon/weekday.nhn");
  const data = await page.evaluate(() => {
    let webtoonData = [];
    const monday = document.querySelectorAll(
      ".col:nth-child(1) .col_inner ul li a:nth-child(2)"
    );
    console.log(monday.length);
    for (i = 0; i < monday.length; i++)
      webtoonData = webtoonData.concat(monday[i].innerHTML);
    return webtoonData;
  });
  //console.log(data);
  fs.writeFileSync(__dirname + "/webtoon.json", JSON.stringify(data));
})();
