const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");

(async () => {
  //   try {
  //     fs.readdirSync(`${__dirname}/img`);
  //   } catch (err) {
  //     fs.mkdirSync(`${__dirname}/img`);
  //   }

  const res = await axios.get("https://www.premierleague.com/tables");
  const { data } = res;
  const res2 = await axios.get(
    "https://www.scoreboard.com/kr/soccer/england/premier-league/standings/"
  );
  const { data2 } = res2;
  const $ = cheerio.load(data);
  console.log(data2);

  const ranking = $('.tableBodyContainer tr[data-compseason="363"]');
  const rankObj = Array.from(ranking).map((now) => {
    const $$ = cheerio.load($(now).html());
    //console.log($$(":nth-child(5)").text());
    return {
      ranking: $$("span.value").text(),
      name: $$("span.long").text(),
      win: $$(">td:nth-of-type(5)").text(),
      drawn: $$(">td:nth-child(6)").text(),
      lose: $$(">td:nth-child(7)").text(),
    };
  });
  //console.log(rankObj);
  rankObj.forEach(({ win, drawn, lose, name, ranking }) => {
    //console.log("ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ");
    //console.log(`${ranking}등`);
    //console.log(`${name}의 전적 : ${win}승 ${drawn}무 ${lose}패`);
    //console.log("ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ");
  });

  /*const promiseArr = imgSrcArr.map(async (now, i) => {
    const res = await axios.get(now, {
      responseType: "arraybuffer",
    });

    fs.writeFile(`${__dirname}/img/${i}.jpg`, res.data, function (err) {
      if (err) {
        console.log(`${i + 1}번째에서 에러 발생`);
      }
    });
  });

  Promise.all(promiseArr);*/
})();
