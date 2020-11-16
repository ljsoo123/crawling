const axios = require("axios");
const fs = require("fs");
const cheerio = require("cheerio");
require("dotenv").config();

(async () => {
  const res = await axios.get(process.env.URL);
  //const res = await axios.get(
  //  "http://dsmhs.djsch.kr/boardCnts/list.do?boardID=54793&m=0201&lev=0&s=dsmhs"
  //);
  const { data } = res;

  const $ = cheerio.load(data);
  const info = $(".mb td:not([class])");
  const info2 = $(".mb td.link a");

  const infoObj = Array.from(info2).map((now, i) => {
    return {
      listTitle: $(info2[i]).text(),
      date: $(info[i]).text(),
    };
  });

  const jsonData = infoObj.map(({ date, listTitle }) => {
    const [year, month, date1] = date.split("-");
    return {
      year,
      month,
      date: date1,
      title: listTitle.replace(/\n/g, ""),
    };
  });

  fs.writeFileSync(__dirname + "/data.json", JSON.stringify(jsonData));
})();
