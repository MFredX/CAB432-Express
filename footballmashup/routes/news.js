const express = require("express");
const https = require("https");
const logger = require("morgan");
const router = express.Router();
const axios = require("axios");
router.use(logger("tiny"));

router.get("/manager", (req, res) => {
  res.send(`Welcome to Manager News`);
});
module.exports = router;
