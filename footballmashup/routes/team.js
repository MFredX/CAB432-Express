const express = require("express");
const https = require("https");
const logger = require("morgan");
const router = express.Router();
const axios = require("axios");
router.use(logger("tiny"));

router.get("/:team", (req, res) => {
  const options = createSportsDBObj(req.params.team);
  //Construct url
  const url = `https://www.${options.hostname}${options.path}${options.lookup}${options.id}`;
  console.log(url);
  //Begin the request
  axios
    .get(url)
    .then(response => {
      res.writeHead(response.status, { "content-type": "text/html" });
      return response.data;
    })
    .then(rsp => {
      console.log(rsp);
      const s = createPage(rsp);
      res.write(s);
      res.end();
    })
    .catch(error => {
      console.error(error);
    });
});

function createSportsDBObj(query) {
  //https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id={TEAMID}
  const sportsDBObj = {
    hostname: "thesportsdb.com/api/",
    path: "v1/json/1/",
    lookup: "lookupteam.php?id=",
    id: "0000"
  };
  //Teams have unique team IDs, it is important to get the correct team idea
  //as we will be able to hit the correct endpoint if the correct team id is in the request

  //The following conditional statements detect the team specified and provide the respective team ID
  //%20??? for spaces
  if (query == "Arsenal") {
    sportsDBObj.id = "133604";
  } else if (query == "Aston Villa") {
    sportsDBObj.id = "133601";
  } else if (query == "Bournemouth") {
    sportsDBObj.id = "134301";
  } else if (query == "Brighton & Hove Albion") {
    sportsDBObj.id = "133619";
  } else if (query == "Burnley") {
    sportsDBObj.id = "133623";
  } else if (query == "Chelsea") {
    sportsDBObj.id = "133610";
  } else if (query == "Crystal Palace") {
    sportsDBObj.id = "133632";
  } else if (query == "Everton") {
    sportsDBObj.id = "133615";
  } else if (query == "Leicester City") {
    sportsDBObj.id = "133626";
  } else if (query == "Liverpool") {
    sportsDBObj.id = "133602";
  } else if (query == "Manchester City") {
    sportsDBObj.id = "133613";
  } else if (query == "Manchester United") {
    sportsDBObj.id = "133612";
  } else if (query == "Newcastle United") {
    sportsDBObj.id = "134777";
  } else if (query == "Norwich City") {
    sportsDBObj.id = "133608";
  } else if (query == "Sheffield United") {
    sportsDBObj.id = "133837";
  } else if (query == "Southampton") {
    sportsDBObj.id = "134778";
  } else if (query == "Tottenham Hotspur") {
    sportsDBObj.id = "133616";
  } else if (query == "Watford") {
    sportsDBObj.id = "133624";
  } else if (query == "West Ham United") {
    sportsDBObj.id = "133636";
  } else if (query == "Wolverhampton Wanderers") {
    sportsDBObj.id = "133599";
  } else {
    sportsDBObj.id = "0000";
  }
  return sportsDBObj;
}

// function createPage(title, rsp) {
//   const number = rsp.photos.photo.length;
//   const imageString = parsePhotoRsp(rsp);
//   //Headers and opening body, then main content and close
//   const str =
//     "<!DOCTYPE html>" +
//     "<html><head><title>Flickr JSON</title></head>" +
//     "<body>" +
//     "<h1>" +
//     title +
//     "</h1>" +
//     "Total number of entries is: " +
//     number +
//     "</br>" +
//     imageString +
//     "</body></html>";
//   return str;
// }

function createPage(rsp) {
  //const imageString = parsePhotoRsp(rsp);
  //Headers and opening body, then main content and close
  const str = `<!DOCTYPE html>
    <html><head><title>Sports DB</title></head>
    <body>
    <img src= ${rsp.teams[0].strTeamBadge} >
    <img src= ${rsp.teams[0].strTeamJersey} >

    <h1>${rsp.teams[0].strTeam}</h1>
    <p>${rsp.teams[0].strDescriptionEN}</p> 
    <li>Stadium Name:${rsp.teams[0].strStadium}</li>
   
    <img src= ${rsp.teams[0].strStadiumThumb} >

    </body></html>`;
  return str;
}

// function parsePhotoRsp(rsp) {
//     let s = "";
//     for (let i = 0; i < rsp.photos.photo.length; i++) {
//       photo = rsp.photos.photo[i];
//       t_url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_t.jpg`;
//       p_url = `https://www.flickr.com/photos/${photo.owner}/${photo.id}`;
//       s += `<a href="${p_url}"><img alt="${photo.title}" src="${t_url}"/></a>`;
//     }
//     return s;
//   }
module.exports = router;
