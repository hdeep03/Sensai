import "./Home.css";
import "../../utilities.css";
// import { Router } from "@react/router";
import React from "react";
import {
  AppBar,
  Container,
  Toolbar,
  Menu,
  MenuItem,
  Typography,
  Card,
} from "@mui/material";

import { get, post } from "../../utilities.js";

function Home() {
  return (
    <>
      <Container maxWidth="sm">
        <Card variant="outlined">
          <Typography variant="h5" component="div">
            Type your youtube link!
          </Typography>
        </Card>
      </Container>
    </>
  );
}

export default Home;
