const express = require("express");
const https = require("https");
const logger = require("morgan");
const router = express.Router();
const axios = require("axios");
var teamObj = require("./team");

const teamNewsData = teamObj.teamNewsData;
console.log(teamNewsData);
router.use(logger("tiny"));

router.get("/manager", (req, res) => {
  res.send(`Welcome to Manager News of ${teamNewsData.manager}`);
  //Construct url
  //   const url = `https://www.${options.hostname}${options.path}${options.lookup}${options.id}`;
  //   const url = `https://newsapi.org/v2/everything?q=Frank%20Lampard&qInTitle=Frank%20Lampard&apiKey=a995f2849eeb43b099d1a124a2aed9e7`;
  const url = `https://newsapi.org/v2/everything?q=${teamNewsData.manager}&qInTitle=${teamNewsData.manager}&apiKey=a995f2849eeb43b099d1a124a2aed9e7`;

  console.log(url);
  //Begin the request
  //This is request gets trending manager news
  axios
    .get(url)
    .then(response => {
      //   res.writeHead(response.status, { "content-type": "text/html" });
      return response.data;
    })
    .then(rsp => {
      console.log(rsp);
      const x = createNewsPage(rsp);
      console.log(x);
      res.write(x, function(err) {
        res.end();
      });
      //   res.end();
    })
    .catch(error => {
      console.error(error);
    });
});

function createNewsPage(rsp) {
  let newsHeadlines = "";
  for (let i = 0; i < rsp.articles.length; i++) {
    newsHeadlines += rsp.articles[i].title;
  }
  const str = `<!DOCTYPE html>
  <html><head><title>Sports DB</title></head>
  <body>
  ${newsHeadlines}
  </body></html>`;

  return str;
}
module.exports = router;
