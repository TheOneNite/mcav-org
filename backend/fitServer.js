let express = require('express')
let app = express()
const https = require('https')
let cookieParser = require('cookie-parser')
app.use(cookieParser({}))
let request = require('request')
const fs = require('fs')
let multer = require('multer')
const upload = multer()
const cors = require('cors')

const PROD_BUILD = true
const BUILD_CONFIG = 'prod'
const ESI_URI = 'https://esi.evetech.net/verify/?datasource=tranquility'

const proxyBuilder = require('./proxy.ts')
const proxy = proxyBuilder(PROD_BUILD ? 'beta' : 'dev')

// db custom modules import
const migratePermissions = require('./db_modules/migratePermissions')

const MongoClient = require('mongodb').MongoClient
const dbLogin = require('../../secrets/mcav-fits/databaseURL.js')
const dbToUse = PROD_BUILD ? 'doctrines' : 'mcav-test'

var mongo = undefined
MongoClient.connect(dbLogin, (err, dbRef) => {
  if (err) {
    console.log(err)
    return
  }
  console.log('DB connected')
  mongo = dbRef.db(dbToUse)
  console.log(`${dbToUse} database connection initialized`)
})
const dbFetchUser = require('./db_modules/getUserData.js')

const ssoLoginGenerator = require('../../secrets/mcav-fits/sso-login.js')
const ssoLogin = ssoLoginGenerator(BUILD_CONFIG)

app.use(cors({ origin: true, credentials: true }))
app.use('/', express.static('build')) // Needed for the HTML and JS files
app.use('/', express.static('public')) // Needed for local assets
const generateId = (length) => {
  const base = 'abcdefghijklmnopqrstuvqxyz'
  let id = ''
  for (let i = 0; i <= length; i++) {
    let index = Math.floor(Math.random() * 26)
    id = id + base[index]
  }
  return id
}

const getUIDbySID = (sid) => {
  let userLookup = new Promise((resolve, reject) => {
    mongo.collection('sessions').findOne({ sid }, (err, result) => {
      console.log(result)
      if (err) {
        console.log(err)
        reject('db error')
        return
      }
      if (result === null) {
        console.log('no user found')
        resolve(undefined)
        return
      }
      resolve(result.uid)
    })
  })
  return userLookup
}

// Your endpoints go after this line

app.get('/auth', async (req, res) => {
  console.log('GET/auth')
  let uid = await getUIDbySID(req.cookies.sid)
  if (!uid) {
    res.send(JSON.stringify({ success: false }))
  } else {
    userData = await dbFetchUser(uid, mongo)
    if (!userData.permissions) {
      console.log(`updating permissions for user ${userData.uid}`)
      let newPermissions = migratePermissions(userData)
      mongo
        .collection('users')
        .updateOne(
          { charId: vBod.CharacterID },
          { $set: { permissions: newPermissions } }
        )
    }
    res.send(JSON.stringify({ success: true, payload: userData }))
  }
})

app.get('/sso-auth', (req, res) => {
  let tokenBod = {
    grant_type: 'authorization_code',
    code: req.query.code,
  }
  let ssoAuthStr = ssoLogin.clientId + ':' + ssoLogin.key
  let buff = new Buffer(ssoAuthStr)
  let ssoAuthStr64 = buff.toString('base64')
  ssoAuthStr64 = 'Basic ' + ssoAuthStr64
  request.post(
    'https://login.eveonline.com/oauth/token',
    {
      headers: { Authorization: ssoAuthStr64 },
      body: tokenBod,
      json: true,
    },
    (err, resp, bod) => {
      //console.log("auth-response");
      if (err) {
        console.log(err)
        return
      }
      if (bod === undefined) {
        res.json({ success: false })
        return
      }
      request.get(
        'https://esi.evetech.net/verify/?datasource=tranquility',
        {
          headers: { Authorization: 'Bearer ' + bod.access_token },
        },
        (err, vRes, vBod) => {
          if (err) {
            console.log(err)
          }
          if (bod === undefined) {
            console.log('verification failed')
            console.trace(vRes.toJSON())
            res.json({ success: false })
            return
          }
          vBod = JSON.parse(vBod)
          console.log('verification back')
          console.log(vBod)
          let userToken = {
            access: bod.access_token,
            refresh: bod.refresh_token,
          }
          mongo
            .collection('users')
            .findOne({ charId: vBod.CharacterID }, async (err, dbRes) => {
              if (err) {
                console.log(err)
              }
              if (dbRes === null) {
                userToken.charId = vBod.CharacterID
                var uid = generateId(8)
                let permissions = await migratePermissions({
                  token: userToken,
                  charId: vBod.CharacterID,
                })
                mongo.collection('users').insertOne(
                  {
                    uid,
                    charId: vBod.CharacterID,
                    permissions,
                    tokens: userToken,
                    altIDs: [],
                  },
                  (err) => {
                    if (err) {
                      console.log(err)
                    }
                  }
                )
                userToken.uid = uid
              }
              if (dbRes) {
                mongo
                  .collection('users')
                  .updateOne(
                    { charId: vBod.CharacterID },
                    { $set: { token: userToken } }
                  )
                var uid = dbRes.uid
                // if (!dbRes.permissions) {
                let newPermissions = await migratePermissions(dbRes)
                console.log('permissions back', newPermissions)
                mongo
                  .collection('users')
                  .updateOne(
                    { charId: vBod.CharacterID },
                    { $set: { permissions: newPermissions } }
                  )
                // }
              }
              let newSid = generateId(16)
              mongo
                .collection('sessions')
                .insertOne({ uid, sid: newSid }, (err) => {
                  if (err) {
                    console.log(err)
                    throw err
                  }
                  console.log('session added: ' + newSid)
                })
              res.cookie('sid', newSid, { domain: proxy })
              console.log(newSid)
              res.json({ success: true, charId: vBod.CharacterID })
            })
        }
      )
      //mongo.collection("tokens").insertOne({})
    }
  )
})

app.post('/add-fit', upload.none(), (req, res) => {
  console.log('POST/add-fit')
  let newFit = {
    id: generateId(10),
    title: req.body.name,
    fit: req.body.fitStr,
  }
  mongo.collection('fits').insertOne(newFit, (err, result) => {
    if (err) {
      console.log(err)
      res.send(JSON.stringify({ success: false }))
      return
    }
    console.log('fit written to db')
    res.send(JSON.stringify({ success: true }))
  })
})
app.get('/fits', (req, res) => {
  mongo
    .collection('fits')
    .find()
    .toArray((err, result) => {
      if (err) {
        console.log(err)
      }
      res.send(JSON.stringify({ success: true, fitList: result }))
    })
})
app.get('/fit-single', (req, res) => {
  console.log('GET/fit-single:' + req.query.id)
  let query = { id: req.query.id }
  mongo
    .collection('fits')
    .find(query)
    .toArray((err, result) => {
      if (err) {
        console.log(err)
        return
      }
      res.send(JSON.stringify({ success: true, fit: result[0] }))
    })
})
app.post('/add-doctrine', upload.none(), (req, res) => {
  console.log('POST/add-doctrine')
  console.log(req.body)
  let newDoc = {
    id: generateId(8),
    fits: JSON.parse(req.body.fits),
    name: req.body.name,
  }
  mongo.collection('doctrines').insertOne(newDoc, (err, result) => {
    if (err) {
      console.log(err)
      return
    }
    res.send(JSON.stringify({ success: true }))
  })
})
app.post('/doctrine-update', upload.none(), (req, res) => {
  console.log('POST /doctrine-update')
  const docData = JSON.parse(req.body.payload)
  console.log('incoming', docData)
  const docId = docData.id
  mongo
    .collection('doctrines')
    .updateOne({ id: docId }, { $set: docData }, (err, dbDoc) => {
      if (err) {
        console.log(err)
        res.status(500)
        res.send(JSON.stringify({ success: false, msg: 'db error' }))
        return
      }
      console.log('updated doctrine ' + docData.name)
      res.send(JSON.stringify({ success: true }))
    })
})
app.get('/doctrines', (req, res) => {
  console.log('GET/doctrines')
  console.log('docId ' + req.query.id)
  let docId = req.query.id
  let query = {}
  if (docId) {
    query.id = docId
  }
  mongo
    .collection('doctrines')
    .find(query)
    .toArray((err, result) => {
      if (err) {
        console.log(err)
      }
      res.send(JSON.stringify({ success: true, docList: result }))
    })
})

// TIMERBOARD ENDPOINTS -----------------------------------------------------------------------------

app.post('/add-timer', upload.none(), (req, res) => {
  console.log('POST/add-timer')
  const uid = getUIDbySID(req.cookies.sid)
  console.log(uid)
  const payload = JSON.parse(req.body.payload)
  const verifyInput = (input) => {
    const structures = [
      'astrahus',
      'fortizar',
      'raitaru',
      'azbel',
      'athanor',
      'tatara',
    ]
    console.log(input)
    if (input.contact === undefined) {
      return {
        success: false,
        msg: 'you must include a timer point of contact',
      }
    }
    if (input.stage === undefined) {
      return {
        success: false,
        msg: 'you must include a timer type',
      }
    }
    if (!structures.includes(input.structure)) {
      return {
        success: false,
        msg: 'you must include a structure type',
      }
    }
    if (input.exits === undefined) {
      return { success: false, msg: 'you must include a timer duration' }
    }
    return true
  }
  console.log(verifyInput(payload))
  if (verifyInput(payload) === true) {
    const record = {
      id: generateId(10),
      structure: payload.structure,
      stage: payload.stage,
      contact: payload.contact,
      timer: payload.exits,
      expired: false,
    }
    mongo
      .collection('q003-timers')
      .insertOne({ data: record }, (err, result) => {
        if (err) {
          console.log(err)
          res.send(JSON.stringify({ success: false, msg: err }))
        }
        res.send(JSON.stringify({ success: true }))
      })
    return
  }
  res.send(JSON.stringify(verifyInput(payload)))
})
app.get('/all-timers', (req, res) => {
  console.log('GET:/all-timers')
  const uid = getUIDbySID(req.cookies.sid)
  mongo
    .collection('q003-timers')
    .find({})
    .toArray((err, allTimers) => {
      if (allTimers === null) {
        res.send(JSON.stringify({ success: false, msg: 'null result' }))
        return
      }
      const timersList = allTimers.map((dbTimer) => dbTimer.data)
      res.send(JSON.stringify({ success: true, timersList: timersList }))
    })
})
app.get('/timer-details', (req, res) => {
  console.log('GET/timer-details', req.query.id)
  const uid = getUIDbySID(req.cookies.sid)
  mongo
    .collection('q003-timers')
    .findOne({ id: req.query.id }, (err, result) => {
      if (err) {
        console.log(err)
        res.send(JSON.stringify({ success: false, msg: err }))
        return
      }
      res.send({ success: true, timerData: result.data })
    })
})

// Your endpoints go before this line

app.all('/*', (req, res, next) => {
  console.log('mcavFits')
  console.log(req.path)
  // needed for react router
  res.sendFile(__dirname + '/build/index.html')
})

// https
//   .createServer(
//     {
//       key: fs.readFileSync('./compayn.space.key.txt'),
//       cert: fs.readFileSync('./compayn.space.crt'),
//       passphrase: 'enyos',
//     },
//     app
//   )
//   .listen(8080)

app.listen(8080, '0.0.0.0', () => {
  console.log('Server running on port 8080')
})
