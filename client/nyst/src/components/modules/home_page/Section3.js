import React from "react";
import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.min.css";

import { get, post } from "../../../utilities.js";
import { useNavigate } from "react-router-dom";

export default function Section3(props) {
  const navigate = useNavigate();
  const handleSubmit = () => {
    props.setId("https://www.youtube.com/watch?v=f079K1f2WQk");
    console.log("haha");
    navigate("/video");

    post("http://localhost:8000/api/v0/process", {
      id: "f079K1f2WQk",
    }).then((status) => {
      if (status["Transcript Status"] == "Success") {
        props.setTrans(Boolean(1));
        console.log("haha lets go");
      }
    });
  };
  return (
    <div className="section-3">
      <img src="assets/lecture_hall.jpg" alt="bkgnd" />
      <div className="audit-content">
        <div className="audit-content-details">
          <ScrollAnimation animateIn="animate__zoomInUp" animateOut="animate__zoomOutUp" duration={1}>
            <div className="audit-title"><span>Try out</span> <span>a demo</span> video!</div>
          </ScrollAnimation>
          <ScrollAnimation
            animateIn="animate__bounceIn"
            animateOut="animate__bounceOut"
            duration={0.5}
          >
            <div className="audit-subtitle">
              {" "}
              Test out SensAI using one of our demo lecture videos!
            </div>
          </ScrollAnimation>
          <ScrollAnimation
            animateIn="animate__bounceIn"
            animateOut="animate__bounceOut"
            duration={0.5}
            delay={500}
          >
            <span 
            className="audit-button"
            onClick={handleSubmit}
            >
              Load a demo
            </span>
          </ScrollAnimation>
        </div>
      </div>
    </div>
  );
}
