let express = require("express");
let app = express();
let https = require("https");
const fs = require("fs");

app.use("/", express.static("build")); // Needed for the HTML and JS files
app.use("/", express.static("public")); // Needed for local assets

app.all("/*", (req, res) => {
  console.log("fits front hit");
  // needed for react router
  res.sendFile(__dirname + "/build/index.html");
});

https
  .createServer(
    {
      key: fs.readFileSync("./compayn.space.key.txt"),
      cert: fs.readFileSync("./compayn.space.crt"),
      passphrase: "enyos"
    },
    app
  )
  .listen(443);
