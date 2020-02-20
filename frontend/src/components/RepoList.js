import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  TableRow,
  Paper,
  Button
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

export const RepoList = ({ repositories }) => {
  const classes = useStyles();
  return (
    <TableContainer component={Paper} style={{ padding: "10px" }}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Repository name</TableCell>
            <TableCell>URL</TableCell>
            <TableCell>Action</TableCell>
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
                <Button className={classes.root}>Toolchain</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};