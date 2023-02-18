// import logo from "./logo.svg";
import "./App.css";
import "../utilities.css";
import Home from "./pages/Home";
import Video from "./pages/Video";
import NavBar from "./modules/Navbar";
// import { Router } from "@reach/router";
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
import { Routes, Route, Outlet, Link } from "react-router-dom";

import { get, post } from "../utilities.js";

function App() {
  return (
    <>
      <div className="App">
        Hullo!
        <NavBar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/video" element={<Video />} />
      </Routes>
    </>
  );
}

export default App;
