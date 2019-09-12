const express = require("express");
const https = require("https");
const logger = require("morgan");
const router = express.Router();
const axios = require("axios");
router.use(logger("tiny"));
//Object to store team information
const teamNewsData = {
  id: null,
  name: null,
  stadium: null,
  manager: null,
  players: [],
  selectedPlayer: null
};
//Object to store response from each get request
const getResponse = {
  first: null,
  second: null
};
router.get("/:team", (req, res) => {
  res.set("content-type", "text/html");
  const options = createSportsDBObj(req.params.team);
  //Construct url
  const url = `https://www.${options.hostname}${options.path}${options.lookup}${options.id}`;
  console.log(url);
  //Begin the request
  //This is request gets basic team information
  axios
    .get(url)
    .then(response => {
      // res.writeHead(response.status, { "content-type": "text/html" });
      return response.data;
    })
    .then(rsp => {
      //console.log(rsp);
      // const s = createPage(rsp);
      getResponse.first = rsp;

      // res.write();
      // res.end();
      return getResponse.first;
    })
    .catch(error => {
      console.error(error);
    });
  //Team URL
  //This is another get request which gets the squad roster
  const teamURL = `https://www.thesportsdb.com/api/v1/json/1/lookup_all_players.php?id=${options.id}`;
  axios
    .get(teamURL)
    .then(response => {
      return response.data;
    })
    .then(rsp => {
      //console.log(rsp);
      const s = addtoPage(getResponse.first, rsp);
      res.write(s, function(err) {
        res.end();
      });
      // res.send(s);
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
//This function creates the page containing team basic info and the team roster
function addtoPage(first, second) {
  //Saving information to the teamNewsDataObject
  //Adding Team name from get results
  teamNewsData.name = first.teams[0].strTeam;
  //Adding team stadium name from get results
  teamNewsData.stadium = first.teams[0].strStadium;

  let squadList = "";
  for (let i = 0; i < second.player.length; i++) {
    onePlayerName = second.player[i].strPlayer;
    onePlayerPosition = second.player[i].strPosition;
    if (second.player[i].strPosition == "Manager") {
      // Storing team manager infromation
      teamNewsData.manager = onePlayerName;
      squadList += `${onePlayerName}  <b><i>${onePlayerPosition}</i></b>  </br>`;
    } else {
      teamNewsData.players.push(onePlayerName);
      squadList += `${onePlayerName}  <i>${onePlayerPosition}</i> <li><a href="http://localhost:3000/player/${onePlayerName}">Click here for player news</a></li>  </br>`;
    }
  }
  // let dropList = `<select id="players" name="players">`;
  // for (let i = 0; i < teamNewsData.players.length; i++) {
  //   dropList += `<option value=${teamNewsData.players[i]}>${teamNewsData.players[i]}</option>`;
  // }

  console.log(teamNewsData);
  const str = `<!DOCTYPE html>
    <html>
    
    <head><title>Sports DB</title>
    <link rel="stylesheet" href="/styles.css">
    </head>
    <body>


    <h1 class="title">${first.teams[0].strTeam}</h1>
    <img class="badge" src= ${first.teams[0].strTeamBadge} >
    <img class="kit" src= ${first.teams[0].strTeamJersey} >
    <p class="text">${first.teams[0].strDescriptionEN}</p> 
    <li>Stadium Name:${first.teams[0].strStadium}</li>
   
    <img src= ${first.teams[0].strStadiumThumb} >
    </br>
    <li><a href="http://localhost:3000/news/manager">Click here to get manager news</a></li>
    <li><a href="http://localhost:3000/news/stadium">Click here to get stadium news</a></li>

    <h3>Squad List</h3>
    ${squadList}
  
    </body></html>`;
  return str;
}
//Exporting required models
module.exports = {
  router: router,
  teamNewsData: teamNewsData
};
