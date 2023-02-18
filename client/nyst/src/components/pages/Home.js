import React from "react";

import Section1 from "../modules/home_page/Section1";
import Section2 from "../modules/home_page/Section2";
import Section3 from "../modules/home_page/Section3";
import Navbar from "../modules/Navbar";
import Footer from "../modules/Footer";
import { get, post } from "../../utilities.js";
import { useNavigate } from "react-router-dom";

export default function Home(propsgit) {
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      link: data.get("link"),
    });

    post("http://localhost:8000/api/v0/process", {
      id: data.get("link"),
    })
      .then((status) => {
        if (status["Transcript Status"] == "Success") {
          console.log("haha lets go");
        }
      })
      .then(() => {
        props.setId(data.get("link"));
        navigate("/video");
      });
  };
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
