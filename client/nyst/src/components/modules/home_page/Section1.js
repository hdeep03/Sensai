import React, { useState } from 'react';

import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.css";

export default function Section1() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <div>
            <video autoPlay muted loop className="video-background">
                <source src="assets/background_vid1.mp4" type="video/mp4" />
            </video>
          </div>

          <Carousel.Caption>
                <div>

                    <div className="title">
                        <span>SensAI</span>
                    </div>

                    <div className="sub-title">Personalized video solutions</div>
                </div>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <div>
                <img
                className="d-block w-100"
                src="assets/background2.png"
                alt="Second slide"
                />
            </div>
            <Carousel.Caption>
                <div>

                    <div className="title">
                        <span>SensAI</span>
                    </div>

                    <div className="sub-title">Personalized video solutions</div>
                </div>
            </Carousel.Caption>
        </Carousel.Item>
        
      </Carousel>
    // <div className="section-1">
    //   <div className="background">
        
      

    //   </div>

    //   <div className="title">
    //     <span>SensAI</span>
    //   </div>

    //   <div className="sub-title">Personalized video solutions</div>
    // </div>
  );
}
