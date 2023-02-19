import React from "react";
import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.min.css";

export default function Section3() {
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
            <span className="audit-button">Load a demo</span>
          </ScrollAnimation>
        </div>
      </div>
    </div>
  );
}
