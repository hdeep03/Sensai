import "./Video.css";
import "../../utilities.css";
// import { Router } from "@react/router";
import React from "react";
import Navbar from "../modules/Navbar";
import Footer from "../modules/Footer";
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

function Video() {
  return (<div>
    <Navbar page="video-player" />
    <Footer />
  </div>);
}

export default Video;
