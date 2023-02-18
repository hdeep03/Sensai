import React from "react";
import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.min.css";

export default function Section3() {
  return (
    <div className="section-3">
      <img src="assets/home_page_background1.png" alt="bkgnd" />
      <div className="audit-content">
        <div className="audit-content-details">
          <ScrollAnimation animateIn="fadeIn" animateOut="fadeOut" duration={1}>
            <div className="audit-title"><span>Try out</span> <span>a demo</span> video!</div>
          </ScrollAnimation>
          <ScrollAnimation
            animateIn="fadeIn"
            animateOut="fadeOut"
            duration={1}
            delay={500}
          >
            <div className="audit-subtitle">
              {" "}
              Test out SensAI using one of our demo lecture videos!
            </div>
          </ScrollAnimation>
          <ScrollAnimation
            animateIn="fadeIn"
            animateOut="fadeOut"
            duration={1}
            delay={1000}
          >
            <span className="audit-button">Load a demo</span>
          </ScrollAnimation>
        </div>
        <img src="assets/webpage_clipart.png" alt="webpage"/>
      </div>
    </div>
  );
}
