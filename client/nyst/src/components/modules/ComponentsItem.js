import React from "react";
import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.min.css";

export default function ComponentsItem({ title, content, mar }) {
  return (
    <ScrollAnimation
      animateIn="fadeIn"
      animateOut="fadeOut"
      duration={0.5}
      animateOnce
    >
      <div style={{ marginLeft: `${mar}em` }} className="sp-service">
        <div className="sp-service-title">{title}</div>
        <div className="sp-service-content">{content}</div>
      </div>
    </ScrollAnimation>
  );
}
