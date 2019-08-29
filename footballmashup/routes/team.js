const express = require("express");
const https = require("https");
const logger = require("morgan");
const router = express.Router();
router.use(logger("tiny"));

router.get("/:team", (req, res) => {
  const options = createSportsDBObj(req.params.team);
});

function createSportsDBObj(query) {
  var id = "";
  //Teams have unique team IDs, it is important to get the correct team idea
  //as we will be able to hit the correct endpoint if the correct team id is in the request

  //The following conditional statements detect the team specified and provide the respective team ID
  if (query == "Arsenal") {
    id = "xxxx";
  } else if (query == "Aston Villa") {
    id = "yyyyy";
  } else if (query == "Bournemouth") {
    id = "yyyyy";
  } else if (query == "Brighton & Hove Albion") {
    id = "yyyyy";
  } else if (query == "Burnley") {
    id = "yyyyy";
  } else if (query == "Chelsea") {
    id = "yyyyy";
  } else if (query == "Crystal Palace") {
    id = "yyyyy";
  } else if (query == "Everton") {
    id = "yyyyy";
  } else if (query == "Leicester City") {
    id = "yyyyy";
  } else if (query == "Liverpool") {
    id = "yyyyy";
  } else if (query == "Manchester City") {
    id = "yyyyy";
  } else if (query == "Manchester United") {
    id = "yyyyy";
  } else if (query == "Newcastle United") {
    id = "yyyyy";
  } else if (query == "Norwich City") {
    id = "yyyyy";
  } else if (query == "Sheffield United") {
    id = "yyyyy";
  } else if (query == "Southampton") {
    id = "yyyyy";
  } else if (query == "Tottenham Hotspur") {
    id = "yyyyy";
  } else if (query == "Watford") {
    id = "yyyyy";
  } else if (query == "West Ham United") {
    id = "yyyyy";
  } else if (query == "Wolverhampton Wanderers") {
    id = "yyyyy";
  }

  //   const options = {
  //     hostname: "api.flickr.com",
  //     port: 443,
  //     path: "/services/rest/?",
  //     method: "GET"
  //   };
  //   const str =
  //     "method=" +
  //     flickr.method +
  //     "&api_key=" +
  //     flickr.api_key +
  //     "&tags=" +
  //     query +
  //     "&per_page=" +
  //     number +
  //     "&format=" +
  //     flickr.format +
  //     "&media=" +
  //     flickr.media +
  //     "&nojsoncallback=" +
  //     flickr.nojsoncallback;
  //   options.path += str;
  //   return options;
}
