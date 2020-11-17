const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });

  const page = await browser.newPage();
  await page.goto("https://www.dsm-dms.com/");

  const a = await page.evaluate(() => {
    const data = document.querySelectorAll(".meal--card--content--wrapper");
    data[0] = data[0].innerText;
    console.log(data[0]);
    return {
      breakfast: data[0].innerText.replace(/\n/g, " "),
      lunch: data[1].innerText.replace(/\n/g, " "),
      dinner: data[2].innerText.replace(/\n/g, " "),
    };
  });

  console.log(`아침\n---------------\n${a.breakfast}\n---------------\n\n\n`);
  console.log(`점심\n---------------\n${a.lunch}\n---------------\n\n\n`);
  console.log(`저녁\n---------------\n${a.dinner}\n---------------\n\n\n`);

  fs.writeFileSync(__dirname + "/meal.json", JSON.stringify(a));
  await browser.close();
})();
