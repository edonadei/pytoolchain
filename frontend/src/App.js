import React, { useState, useEffect } from "react";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import { getRepositoriesFromUser } from "./services/GithubAPI";
import { Button, Grid, TextField, Typography, Paper } from "@material-ui/core";
import { ToolbarApp } from "./components/ToolbarApp";
import { RepoList } from "./components/RepoList";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  button: {
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
  },
  root: {
    flexGrow: 1
  },
  paper: {
    height: 140,
    width: 100
  },
  control: {
    padding: 2
  }
});

function App() {
  const classes = useStyles();
  const [repository, setRepository] = useState({});
  const [nameOfUser, setnameOfUser] = useState("edonadei");
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(
    () => {
      setLoading(true);
      getRepositoriesFromUser(nameOfUser).then(data => {
        setLoading(false);
        setRepositories(data);
      });
    },
    [nameOfUser]
  );

  return (
    <React.Fragment>
      <Router>
        <ToolbarApp />
        <div className={classes.container}>
          <Switch>
            <Route exact path="/">
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
                  style={{ paddingBottom: 30 }}
                />
                {loading
                  ? <ClipLoader
                      size={150}
                      color={"#123abc"}
                      loading={loading}
                    />
                  : <RepoList
                      repositories={repositories}
                      setRepository={setRepository}
                    />}
              </Grid>
            </Route>
            <Route path="/toolchain">
              <Grid container className={classes.root} spacing={2}>
                <Grid item xs={12}>
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={5}
                  >
                    <Grid item>
                      <Typography variant="h5">
                        Project name: {repository?.name}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h5">
                        Github: {repository?.url}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={2}
                  >
                    <Grid item>
                      <Paper>
                        <Button className={classes.button}>Build</Button>
                        <Typography>Console</Typography>
                      </Paper>
                    </Grid>
                    <Grid item>
                      <Paper>
                        <Button className={classes.button}>Test</Button>
                        <Typography>Console</Typography>
                      </Paper>
                    </Grid>
                    <Grid item>
                      <Paper>
                        <Button className={classes.button}>Deploy</Button>
                        <Typography>Console</Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Route>
          </Switch>
        </div>
      </Router>
    </React.Fragment>
  );
}

export default App;
