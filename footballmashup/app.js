const express = require("express");
const teamRouter = require("./routes/team");
const newsRouter = require("./routes/news");
const playerRouter = require("./routes/players");
const helmet = require("helmet");

const app = express();

const hostname = "127.0.0.1";
const port = 3000;
app.use(express.static("public"));

app.get("/", (req, res) => {
  const str = `<!DOCTYPE html> 
    <html><head><title>Football Mashup</title>
    <link rel="stylesheet" href="/styles.css">
    </head>
    <div class="bg">
    <body class="body"> <h1 class="head">Get news and team information about your favourite EPL team</h1>

    <p class="p">Please click you team to start</p>
    <li class="li"><a href="/teams/Arsenal">Arsenal</a></li>
    <li class="li"><a href="/teams/Aston%20Villa">Aston Villa</a></li>
    <li class="li"><a href="/teams/Bournemouth">Bournemouth</a></li>
    <li class="li"><a href="/teams/Brighton%20&%20Hove%20Albion">Brighton & Hove Albion</a></li>
    <li class="li"><a href="/teams/Burnley">Burnley</a></li>
    <li class="li"><a href="/teams/Chelsea">Chelsea</a></li>
    <li class="li"><a href="/teams/Crystal%20Palace">Crystal Palace</a></li>
    <li class="li"><a href="/teams/Everton">Everton</a></li>
    <li class="li"><a href="/teams/Leicester%20City">Leicester City</a></li>
    <li class="li"><a href="/teams/Liverpool">Liverpool</a></li>
    <li class="li"><a href="/teams/Manchester%20City">Manchester City</a></li>
    <li class="li"><a href="/teams/Manchester%20United">Manchester United</a></li>
    <li class="li"><a href="/teams/Newcastle%20United">Newcastle United</a></li>
    <li class="li"><a href="/teams/Norwich%20City">Norwich City</a></li>
    <li class="li"><a href="/teams/Sheffield%20United">Sheffield United</a></li>
    <li class="li"><a href="/teams/Southampton">Southampton</a></li>
    <li class="li"><a href="/teams/Tottenham%20Hotspur">Tottenham Hotspur</a></li>
    <li class="li"><a href="/teams/Watford">Watford</a></li>
    <li class="li"><a href="/teams/West%20Ham%20United">West Ham United</a></li>
    <li class="li"><a href="/teams/Wolverhampton%20Wanderers">Wolverhampton Wanderers</a></li>
    </ul></body></div></html>`;

  // res.writeHead(200, { "content-type": "text/html" });
  res.write(str);
  res.end();
});

app.use("/teams?", teamRouter.router);
app.use("/news?", newsRouter);
app.use("/player?", playerRouter);
app.listen(port, function() {
  console.log(`Express app listening at http://${hostname}:${port}/`);
});
