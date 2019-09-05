const express = require("express");
const flickrRouter = require("./routes/flickr");
const teamRouter = require("./routes/team");
const newsRouter = require("./routes/news");
const helmet = require("helmet");

const app = express();

const hostname = "127.0.0.1";
const port = 3000;

app.get("/", (req, res) => {
  const str = `<!DOCTYPE html> 
    <html><head><title>Football Mashup</title></head>
    <body> <h1>Get news and team information about your favourite EPL team</h1>
    Usage: http://localhost:3000/team <br>
     <br><ul><li>team - corresponds to the team that is selected</li>
    <li>Example: <a href="http://localhost:3000/teams/Arsenal">http://localhost:3000/teams/Arsenal</a></li>
    <p>Please click you team to start</p>
    <li><a href="http://localhost:3000/teams/Arsenal">Arsenal</a></li>
    <li><a href="http://localhost:3000/teams/Aston%20Villa">Aston Villa</a></li>
    <li><a href="http://localhost:3000/teams/Bournemouth">Bournemouth</a></li>
    <li><a href="http://localhost:3000/teams/Brighton%20&%20Hove%20Albion">Brighton & Hove Albion</a></li>
    <li><a href="http://localhost:3000/teams/Burnley">Burnley</a></li>
    <li><a href="http://localhost:3000/teams/Chelsea">Chelsea</a></li>
    <li><a href="http://localhost:3000/teams/Crystal%20Palace">Crystal Palace</a></li>
    <li><a href="http://localhost:3000/teams/Everton">Everton</a></li>
    <li><a href="http://localhost:3000/teams/Leicester%20City">Leicester City</a></li>
    <li><a href="http://localhost:3000/teams/Liverpool">Liverpool</a></li>
    <li><a href="http://localhost:3000/teams/Manchester%20City">Manchester City</a></li>
    <li><a href="http://localhost:3000/teams/Manchester%20United">Manchester United</a></li>
    <li><a href="http://localhost:3000/teams/Newcastle%20United">Newcastle United</a></li>
    <li><a href="http://localhost:3000/teams/Norwich%20City">Norwich City</a></li>
    <li><a href="http://localhost:3000/teams/Sheffield%20United">Sheffield United</a></li>
    <li><a href="http://localhost:3000/teams/Southampton">Southampton</a></li>
    <li><a href="http://localhost:3000/teams/Tottenham%20Hotspur">Tottenham Hotspur</a></li>
    <li><a href="http://localhost:3000/teams/Watford">Watford</a></li>
    <li><a href="http://localhost:3000/teams/West%20Ham%20United">West Ham United</a></li>
    <li><a href="http://localhost:3000/teams/Wolverhampton%20Wanderers">Wolverhampton Wanderers</a></li>
    </ul></body></html>`;

  res.writeHead(200, { "content-type": "text/html" });
  res.write(str);
  res.end();
});

app.use("/search?", flickrRouter);
app.use("/teams?", teamRouter.router);
app.use("/news?", newsRouter);
app.listen(port, function() {
  console.log(`Express app listening at http://${hostname}:${port}/`);
});
