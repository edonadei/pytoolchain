import mongoose from "mongoose";
import body from "body-parser";
const app = require("express")();
app.use(body());

mongoose.connect("mongodb://localhost:27017/builds", { useNewUrlParser: true });

// Schema build
const schemaBuild = mongoose.Schema({
  repoUrl: String,
  id: String,
  env_vars: {
    type: Map,
    of: String
  }
});

// Schema test
const schemaTest = mongoose.Schema({
  repoUrl: String,
  id: String,
  choosenTests: [String]
});

// Schema deploy
const schemaDeploy = mongoose.Schema({
  repoUrl: String,
  id: String,
  cloudProviders: [String]
});

app.get("/", (req, res) => {
  res.send("The API Server is reachable !");
});

app.get("/build", (req, res) => {
  res.send("Building code !");
});

app.post("/build", async (req, res) => {
  build = {
    repo_url: req.body.repo_url,
    action: req.body.action,
    id: req.body.action
  };

  if (!build.repo_url || !build.action || !build.id) {
    res.send("Missing argument");
    return;
  }

  await build.save() // saving into mongo
    res.json(build)
    return
});

app.get("/test", (req, res) => {
  res.send("Testing code !");
});

app.get("/deploy", (req, res) => {
  res.send("Deploying code !");
});

app.listen(3000, () => {
  console.log("api server for k8s controller running on port 3000!");
});
