const express = require("express");
const https = require("https");
const logger = require("morgan");
const router = express.Router();
const axios = require("axios");
router.use(logger("tiny"));

router.get("/:playername", (req, res) => {
  res.set("content-type", "text/html");
  const url = `https://newsapi.org/v2/everything?qInTitle=${req.params.playername}&apiKey=a995f2849eeb43b099d1a124a2aed9e7&language=en`;

  //Begin the request
  //This is request gets the trending player news
  axios
    .get(url)
    .then(response => {
      return response.data;
    })
    .then(rsp => {
      const x = createNewsPage(rsp);
      res.write(x, function(err) {
        res.end();
      });
    })
    .catch(error => {
      console.error(error);
    });
});

function createNewsPage(rsp) {
  let newsHeadlines = "";
  for (let i = 0; i < rsp.articles.length; i++) {
    newsHeadlines += `<h2 class="newsHead">${rsp.articles[i].title}</h2>
      <h3><i>${rsp.articles[i].description}</i></h3>
      <p>${rsp.articles[i].publishedAt}</p>
      <a href=  ${rsp.articles[i].url}>  ${rsp.articles[i].url}</a>
      <img src=${rsp.articles[i].urlToImage}>`;
  }
  const str = `<!DOCTYPE html>
    <html><head><title>Player News </title>
    <link rel="stylesheet" href="/styles.css"></head></head>
    <h1>Welcome to the player specific news page</h1>
    <body class="team">
    ${newsHeadlines}
    </body></html>`;

  return str;
}

module.exports = router;
