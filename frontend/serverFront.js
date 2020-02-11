let express = require("express");
let app = express();
let https = require("https");
const fs = require("fs");

app.use("/", express.static("build")); // Needed for the HTML and JS files
app.use("/", express.static("public")); // Needed for local assets
app.use((req, res) => {
  console.log("check");
  console.log(req.protocol);
  if (!req.secure) {
    console.log("unsecure hit");
    res.redirect("https://" + req.headers.host + req.url);
  }
});

app.all("/*", (req, res) => {
  console.log("hit");
  if (!req.secure) {
    res.redirect("https://" + req.headers.host + req.url);
    return;
  }
  console.log("fits front hit");
  // needed for react router
  res.sendFile(__dirname + "/build/index.html");
});
app.get("*", (req, res) => {
  console.log("wheuuu");
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
