let express = require("express");
let app = express();

const MongoClient = require("mongodb").MongoClient;
const dbLogin = require("./databaseURL.js");
let mongoDb = undefined;
MongoClient.connect(dbLogin, (err, dbRef) => {
  if (err) {
    console.log(err);
  }
  console.log("DB connected");
  mongoDb = dbRef.db("witf");
  console.log("Database connection initialized");
});

app.use("/", express.static("build")); // Needed for the HTML and JS files
app.use("/", express.static("public")); // Needed for local assets

// Your endpoints go after this line

app.post("/add-fit", upload.none(), (req, res) => {});

// Your endpoints go before this line

app.all("/*", (req, res, next) => {
  // needed for react router
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(4000, "0.0.0.0", () => {
  console.log("Server running on port 4000");
});
