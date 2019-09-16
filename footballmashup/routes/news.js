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
  res.set("content-type", "text/html");
  //Construct url for manager news
  const url = `https://newsapi.org/v2/everything?qInTitle=${teamNewsData.manager}&apiKey=a995f2849eeb43b099d1a124a2aed9e7&language=en`;

  console.log(url);
  //Begin the request
  //This is request gets trending manager news
  axios
    .get(url)
    .then(response => {
      return response.data;
    })
    .then(rsp => {
      console.log(rsp);
      const x = createNewsPage(rsp);
      res.write(x, function(err) {
        res.end();
      });
    })
    .catch(error => {
      console.error(error);
    });
});

router.get("/stadium", (req, res) => {
  res.set("content-type", "text/html");

  //Construct url for stadium news
  const url = `https://newsapi.org/v2/everything?qInTitle=${teamNewsData.stadium}&apiKey=a995f2849eeb43b099d1a124a2aed9e7&language=en`;

  console.log(url);
  //Begin the request
  //This is request gets trending manager news
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
    <h2><i>${rsp.articles[i].description}</i></h2>
    <p>${rsp.articles[i].publishedAt}</p>
    <a href=  ${rsp.articles[i].url}>  ${rsp.articles[i].url}</a>
    <img src=${rsp.articles[i].urlToImage}>`;
  }
  const str = `<!DOCTYPE html>
  <html><head><title>News Page</title>
  <link rel="stylesheet" href="/styles.css"></head>
  <h1><b>Welcome to the news page<h1></b>
  <body class="team">
  ${newsHeadlines}
  </body></html>`;

  return str;
}

module.exports = router;
