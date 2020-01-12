let express = require("express");
let app = express();

let multer = require("multer");
const upload = multer();
const cors = require("cors");

const MongoClient = require("mongodb").MongoClient;
const dbLogin = require("./secrets/databaseURL.js");
let mongo = undefined;
MongoClient.connect(dbLogin, (err, dbRef) => {
  if (err) {
    console.log(err);
  }
  console.log("DB connected");
  mongo = dbRef.db("doctrines");
  console.log("Database connection initialized");
});

app.use(cors());
app.use("/", express.static("build")); // Needed for the HTML and JS files
app.use("/", express.static("public")); // Needed for local assets

const generateId = length => {
  const base = "abcdefghijklmnopqrstuvqxyz";
  let id = "";
  for (let i = 0; i <= length; i++) {
    let index = Math.floor(Math.random() * 26);
    id = id + base[index];
  }
  return id;
};

// Your endpoints go after this line

app.post("/add-fit", upload.none(), (req, res) => {
  console.log("POST/add-fit");
  let newFit = {
    id: generateId(10),
    title: req.body.name,
    fit: req.body.fitStr
  };
  mongo.collection("fits").insertOne(newFit, (err, result) => {
    if (err) {
      console.log(err);
      res.send(JSON.stringify({ success: false }));
      return;
    }
    console.log("fit written to db");
    res.send(JSON.stringify({ success: true }));
  });
});
app.get("/fits", (req, res) => {
  mongo
    .collection("fits")
    .find()
    .toArray((err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(JSON.stringify({ success: true, fitList: result }));
    });
});
app.get("/fit-single", (req, res) => {
  console.log("GET/fit-single:" + req.query.id);
  let query = { id: req.query.id };
  mongo
    .collection("fits")
    .find(query)
    .toArray((err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      res.send(JSON.stringify({ success: true, fit: result[0] }));
    });
});
app.post("/add-doctrine", upload.none(), (req, res) => {
  console.log("POST/add-doctrine");
  console.log(req.body);
  let newDoc = {
    id: generateId(8),
    fits: JSON.parse(req.body.fits),
    name: req.body.name
  };
  mongo.collection("doctrines").insertOne(newDoc, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    res.send(JSON.stringify({ success: true }));
  });
});
app.post("/doctrine-update", upload.none(), (req, res) => {
  mongo.collection("doctrines");
});
app.get("/doctrines", (req, res) => {
  console.log("GET/doctrines");
  console.log("docId " + req.query.id);
  let docId = req.query.id;
  let query = {};
  if (docId) {
    query.id = docId;
  }
  mongo
    .collection("doctrines")
    .find(query)
    .toArray((err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(JSON.stringify({ success: true, docList: result }));
    });
});

// Your endpoints go before this line

app.all("/*", (req, res, next) => {
  // needed for react router
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(4000, "0.0.0.0", () => {
  console.log("Server running on port 4000");
});
