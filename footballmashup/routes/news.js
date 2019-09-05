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
  res.send(`Welcome to Manager News ${teamNewsData.name}`);
});
module.exports = router;
