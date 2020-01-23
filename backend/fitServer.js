let express = require("express");
let app = express();
let cookieParser = require("cookie-parser");
app.use(cookieParser({}));
let request = require("request");

let multer = require("multer");
const upload = multer();
const cors = require("cors");

const proxyBuilder = require("./proxy.ts");
const proxy = proxyBuilder("dev");

const MongoClient = require("mongodb").MongoClient;
const dbLogin = require("../../secrets/mcav-fits/databaseURL.js");
let mongo = undefined;
MongoClient.connect(dbLogin, (err, dbRef) => {
  if (err) {
    console.log(err);
  }
  console.log("DB connected");
  mongo = dbRef.db("doctrines");
  console.log("Database connection initialized");
});

const ssoLogin = require("../../secrets/mcav-fits/sso-login.js");

app.use(cors({ origin: true, credentials: true }));
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

const getUIDbySID = sid => {
  let userLookup = new Promise((resolve, reject) => {
    mongo.collection("sessions").findOne({ sid }, (err, result) => {
      console.log(result);
      if (err) {
        console.log(err);
        reject("db error");
        return;
      }
      if (result === null) {
        console.log("no user found");
        resolve(undefined);
      }
      resolve(result.uid);
    });
  });
  return userLookup;
};

// Your endpoints go after this line

app.get("/auth", async (req, res) => {
  console.log("GET/auth");
  console.log(req.cookies.sid);
  let uid = await getUIDbySID(req.cookies.sid);
  console.log(uid);
  if (uid === undefined) {
    res.send(JSON.stringify({ success: false }));
  } else {
    res.send(JSON.stringify({ success: true }));
  }
});
app.get("/sso-auth", (req, res) => {
  console.log(req.query.code);
  console.log(req.query.state);
  let tokenBod = {
    grant_type: "authorization_code",
    code: req.query.code
  };
  let ssoAuthStr = ssoLogin.clientId + ":" + ssoLogin.key;
  let buff = new Buffer(ssoAuthStr);
  let ssoAuthStr64 = buff.toString("base64");
  ssoAuthStr64 = "Basic " + ssoAuthStr64;
  request.post(
    "https://login.eveonline.com/oauth/token",
    {
      headers: { Authorization: ssoAuthStr64 },
      body: tokenBod,
      json: true
    },
    (err, resp, bod) => {
      //console.log("auth-response");
      if (err) {
        console.log(err);
        return;
      }
      if (bod === undefined) {
        res.json({ success: false });
        return;
      }
      console.log(bod);
      request.get(
        "https://esi.evetech.net/verify/?datasource=tranquility",
        {
          headers: { Authorization: "Bearer " + bod.access_token }
        },
        (err, vRes, vBod) => {
          console.log("verification back");
          console.log(vRes.statusCode);
          if (err) {
            console.log(err);
          }
          if (bod === undefined) {
            console.log("verification failed");
            console.trace(vRes.toJSON());
            res.json({ success: false });
            return;
          }
          //console.log(vBod);
          vBod = JSON.parse(vBod);
          console.log(vBod);
          let userToken = {
            access: bod.access_token,
            refresh: bod.refresh_token
          };
          mongo
            .collection("users")
            .findOne({ charId: vBod.CharacterID }, (err, dbRes) => {
              if (err) {
                console.log(err);
              }
              if (dbRes === null) {
                userToken.charId = vBod.CharacterID;
                var uid = generateId(8);
                mongo
                  .collection("users")
                  .insertOne(
                    { uid, charId: vBod.CharacterID, altIDs: [] },
                    err => {
                      if (err) {
                        console.log(err);
                      }
                    }
                  );
                userToken.uid = uid;
              } else {
                var uid = dbRes.uid;
              }
              mongo.collection("tokens").insertOne(userToken, err => {
                console.log(err);
              });
              let newSid = generateId(16);
              mongo
                .collection("sessions")
                .insertOne({ uid, sid: newSid }, err => {
                  if (err) {
                    console.log(err);
                    throw err;
                  }
                  console.log("session added: " + newSid);
                });
              console.log(proxy);
              res.cookie("sid", newSid, { domain: proxy });
              console.log(newSid);
              res.json({ success: true, charId: vBod.CharacterID });
            });
        }
      );
      //mongo.collection("tokens").insertOne({})
    }
  );
});

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

app.listen(8080, "0.0.0.0", () => {
  console.log("Server running on port 4000");
});
