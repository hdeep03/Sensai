import React, { useState } from 'react';

import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Section1() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="section-1">
      <div className="background">
        
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <div>
            <video autoPlay muted loop className="video-background">
                <source src="assets/backgrounf-video.mp4" type="video/mp4" />
            </video>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div>
            <img
              className="d-block w-100"
              src="assets/backgrounf-2.jpg"
              alt="First slide"
            />
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div>
            <img
              className="d-block w-100"
              src="assets/backgrounf-4.jpg"
              alt="Second slide"
            />
          </div>
        </Carousel.Item>
      </Carousel>

      </div>

      <div className="title">
        <span>SensAI</span>
      </div>

      <div className="sub-title">Personalized video solutions</div>
    </div>
  );
}
