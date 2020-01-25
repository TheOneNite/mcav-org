const getUserData = (uid, mongo) => {
  let userData = new Promise((resolve, reject) => {
    mongo.collection("users").findOne({ uid }, (err, result) => {
      if (err) {
        console.log(err);
        reject(error);
        return;
      }
      if (result === null) {
        resolve({ err: "no user found for that uid" });
        return;
      }
      resolve(result);
    });
  });
  return userData;
};

module.exports = getUserData;
