import React from "react";

import Section1 from "../modules/home_page/Section1";
import Section2 from "../modules/home_page/Section2";
import Section3 from "../modules/home_page/Section3";
import Navbar from "../modules/Navbar";
import Footer from "../modules/Footer";
import { get, post } from "../../utilities.js";
import { useNavigate } from "react-router-dom";

export default function Home(props) {
  return (
    <div>
      <Navbar page="home" />
      <Section1 />
      <Section2 setId={props.setId} />
      <Section3 />
      <Footer />
    </div>
  );
}
