import React from "react";
import { Typography, AppBar, Toolbar, IconButton } from "@material-ui/core";
import { Menu } from "@material-ui/icons";

export const ToolbarApp = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <Menu />
        </IconButton>
        <Typography variant="h6">Pytoolchain</Typography>
      </Toolbar>
    </AppBar>
  );
};
