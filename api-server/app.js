const express = require("express");
const app = express();

app.get("/", function(req, res) {
  res.send("The API Server is reachable !");
});

app.get("/build", function(req, res) {
  res.send("Building code !");
});

app.get("/test", function(req, res) {
  res.send("Testing code !");
});

app.get("/deploy", function(req, res) {
  res.send("Deploying code !");
});

app.listen(3000, function() {
  console.log("api server for k8s controller running on port 3000!");
});
