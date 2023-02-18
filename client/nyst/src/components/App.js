// import logo from "./logo.svg";
import "./App.css";
import "../utilities.css";
import Home from "./pages/Home";
import Video from "./pages/Video";
import NavBar from "./modules/Navbar";
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

  return (
    <Routes>
      <Route path="/" element={<Home setId={setId} />} />
      {/* <Route path="/about-us" element={<AboutUs />} />
      <Route path="/video-player" element={<VideoPlayer />} /> */}
      <Route path="/video" element={<Video />} vidId={vidId} />
    </Routes>
  );
}

export default App;
