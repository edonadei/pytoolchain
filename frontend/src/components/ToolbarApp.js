import React from "react";
import { AppBar, Toolbar, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Logo from "../assets/pictures/Logo.png";

const useStyles = makeStyles({
  root: {
    background: "#5C5B57"
  },
  logo: {
    height: 49,
    width: 398
  }
});

export const ToolbarApp = () => {
  const classes = useStyles();
  return (
    <AppBar position="sticky" className={classes.root}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <Link to="/">
            <img src={Logo} className={classes.logo} alt="Logo" />
          </Link>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
