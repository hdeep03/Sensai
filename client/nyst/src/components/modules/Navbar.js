import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ page, background }) {
  console.log(page);
  return (
    <div style={{ position: "fixed", top: "0px" }} className={`header`}>
      <div className="logo">
        SensAI
      </div>
      <nav className="nav-bar">
        <ul>
          <Link
            className={page === "home" ? "nav-bar-focus" : ""}
            style={{ textDecoration: "none" }}
            to={"/"}
          >
            <li>HOME</li>
          </Link>
          <Link
            className={page === "video" ? "nav-bar-focus" : ""}
            style={{ textDecoration: "none" }}
            to={"/video"}
          >
            <li>VIDEO PLAYER</li>
          </Link>

          <Link
            className={page === "about-us" ? "nav-bar-focus" : ""}
            style={{ textDecoration: "none" }}
            to={"/about-us"}
          >
            <li>ABOUT US</li>
          </Link>
        </ul>
      </nav>
    </div>
  );
}
