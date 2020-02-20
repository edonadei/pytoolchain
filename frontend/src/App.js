import React, { useState } from "react";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import { getRepositoriesFromUser } from "./services/GithubAPI";
import { Button, Grid, TextField } from "@material-ui/core";
import { ToolbarApp } from "./components/ToolbarApp";
import { RepoList } from "./components/RepoList";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

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
  }
});

function App() {
  const classes = useStyles();
  const [connected, setConnected] = useState(false);
  const [nameOfUser, setnameOfUser] = useState("edonadei");
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route path="/">
            <ToolbarApp />
            {connected ? (
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Button
                  style={{ marginTop: "20px" }}
                  className={classes.root}
                  onClick={() => setConnected(false)}
                >
                  Disconnect from Github
                </Button>
                <RepoList repositories={repositories} />
              </Grid>
            ) : (
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <TextField
                  label="Github ID"
                  value={nameOfUser}
                  onChange={e => setnameOfUser(e.target.value)}
                ></TextField>
                <Button
                  style={{ marginTop: "20px", marginLeft: "10px" }}
                  className={classes.root}
                  onClick={() => {
                    setConnected(true);
                    getRepositoriesFromUser(nameOfUser).then(data =>
                      setRepositories(data)
                    );
                  }}
                >
                  Find repos
                </Button>
              </Grid>
            )}
          </Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
