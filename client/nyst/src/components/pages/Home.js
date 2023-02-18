import React from "react";

import Section1 from "../modules/home_page/Section1";
import Section2 from "../modules/home_page/Section2";
import Section3 from "../modules/home_page/Section3";
import Navbar from "../modules/Navbar";
import Footer from "../modules/Footer";

export default function Home() {
  return (
    <div>
      <Navbar page="home" />
      <Section1 />
      <Section2 />
      <Section3 />
      <Footer />
    </div>
  );
}
