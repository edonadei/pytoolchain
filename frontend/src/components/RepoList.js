import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  TableRow,
  Paper,
  Button,
  Typography
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
  },
  bold: {
    fontWeight: "bold"
  }
});

export const RepoList = ({ repositories, setRepository }) => {
  const classes = useStyles();
  const numberOfRepositories = repositories.length;

  return (
    <React.Fragment>
      {numberOfRepositories > 0 ? (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow > 
                <TableCell><Typography variant="h6">Repository name</Typography></TableCell>
                <TableCell><Typography variant="h6">URL</Typography></TableCell>
                <TableCell><Typography variant="h6">Language</Typography></TableCell>
                <TableCell><Typography variant="h6">Action</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {repositories.map(repo => (
                <TableRow key={repo.name}>
                  <TableCell component="th" scope="row">
                    {repo.name}
                  </TableCell>
                  <TableCell>{repo.url}</TableCell>
                  <TableCell>
                    {repo?.primaryLanguage?.name
                      ? repo?.primaryLanguage?.name
                      : "None detected"}
                  </TableCell>
                  <TableCell>
                    {repo?.primaryLanguage?.name === "Python" ? (
                      <Link
                        to="/toolchain"
                        style={{ textDecoration: "none" }}
                      >
                        <Button onPress={setRepository(repo)} className={classes.root}>Toolchain</Button>
                      </Link>
                    ) : (
                      <Button disabled className={classes.root}>
                        Not available yet
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="h4">This user does not have any repositories</Typography>
      )}
    </React.Fragment>
  );
};
