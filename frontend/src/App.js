import React, { useState, useEffect } from "react";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import { getRepositoriesFromUser } from "./services/GithubAPI";
import { Button, Grid, TextField, Typography } from "@material-ui/core";
import { ToolbarApp } from "./components/ToolbarApp";
import { RepoList } from "./components/RepoList";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)"
  },
  container: {
    paddingTop: 40
  }
});

function App() {
  const classes = useStyles();
  const [connected, setConnected] = useState(false);
  const [nameOfUser, setnameOfUser] = useState("edonadei");
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getRepositoriesFromUser(nameOfUser).then(data => {
      setLoading(false);
      setRepositories(data);
    });
  }, [nameOfUser]);

  return (
    <React.Fragment>
      <Router>
        <ToolbarApp />
        <Switch>
          <Route exact path="/">
            <div className={classes.container}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <TextField
                  label="Github ID"
                  value={nameOfUser}
                  onChange={e => {
                    setnameOfUser(e.target.value);
                  }}
                  style={{paddingBottom: 30}}
                ></TextField>
                {loading ? (
                  <ClipLoader size={150} color={"#123abc"} loading={loading} />
                ) : (
                  <RepoList repositories={repositories} />
                )}
              </Grid>
            </div>
          </Route>
          <Route path="/pytoolchain">
            <Typography>Hello from /pytoolchain</Typography>
          </Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
