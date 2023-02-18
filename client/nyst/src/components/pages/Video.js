import "./Video.css";
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

function Video(props) {
  const source = "https://www.youtube.com/embed/" + props.vidId;
  return (
    <>
      <iframe src={source} title="your lecture"></iframe>
    </>
  );
}

export default Video;
