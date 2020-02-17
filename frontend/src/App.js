import React, { useState, useEffect } from "react";
import "./App.css";
import { Menu } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { getRepositoriesFromUser } from "./services/GithubAPI";
import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  TableRow,
  Paper
} from "@material-ui/core";

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
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    getRepositoriesFromUser("edonadei").then(data => {
      console.log(data);
      setRepositories(data);
    });
  }, []);

  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">Pytoolchain</Typography>
        </Toolbar>
      </AppBar>
      {connected
        ? <Grid container direction="row" justify="center" alignItems="center">
            <Button
              className={classes.root}
              onClick={() => setConnected(false)}
            >
              Disconnect from Github
            </Button>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Repository name</TableCell>
                    <TableCell align="right">URL</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {repositories.map(repo =>
                    <TableRow key={repo.name}>
                      <TableCell component="th" scope="row">
                        {repo.name}
                      </TableCell>
                      <TableCell align="right">
                        {repo.url}
                      </TableCell>
                      <TableCell align="right">press here</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        : <Grid container direction="row" justify="center" alignItems="center">
            <Button className={classes.root} onClick={() => setConnected(true)}>
              Connect with Github
            </Button>
          </Grid>}
    </React.Fragment>
  );
}

export default App;
