let express = require("express");
let app = express();

app.use("/", express.static("build")); // Needed for the HTML and JS files
app.use("/", express.static("public")); // Needed for local assets

app.all("/*", (req, res) => {
  // needed for react router
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Frontend out on port 3000");
});
