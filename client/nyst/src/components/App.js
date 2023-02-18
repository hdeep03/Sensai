// import logo from "./logo.svg";
import "./App.css";
import "../utilities.css";
import Home from "./pages/Home";
import Video from "./pages/Video";
import Navbar from "./modules/Navbar";
// import { Router } from "@reach/router";
import React, { useState } from "react";
import {
  AppBar,
  Container,
  Toolbar,
  Menu,
  MenuItem,
  Typography,
  Card,
} from "@mui/material";
import { Routes, Route, Outlet, Link } from "react-router-dom";

import { get, post } from "../utilities.js";

function App() {
  const [vidId, setId] = useState("");
  const [trans, setTrans] = useState(Boolean(0));

  return (
    <>
      <Navbar page="home" />
      <Routes>
        <Route path="/" element={<Home setId={setId} setTrans={setTrans} />} />
        {/* <Route path="/about-us" element={<AboutUs />} />
      <Route path="/video-player" element={<VideoPlayer />} /> */}
        <Route path="/video" element={<Video vidId={vidId} trans={trans} />} />
      </Routes>
    </>
  );
}

export default App;
