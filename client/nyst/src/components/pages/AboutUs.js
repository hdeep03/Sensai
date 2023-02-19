import React from "react";

import Navbar from "../modules/Navbar";
import Footer from "../modules/Footer";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.min.css";

export default function AboutUs() {
  const employees = [
    { 
        name: "Theo Jiang", 
        title: "Developer", 
        img: "assets/default_human.png" 
    },
    {
      name: "Harsh Deep",
      title: "Developer", 
      img: "assets/default_human.png"
    },
    {
      name: "Rithvik Ganesh",
      title: "Developer", 
      img: "assets/default_human.png"
    },
    { name: "Abhay Bestrapalli", title: "Developer", img: "assets/default_human.png" }
  ];

  return (
    <div>
      <Navbar background={true} page="about-us" />
      <img
        className="about-background"
        src="assets/circuit_bgnd.png"
        alt="about us page"
      />
      <div className="about-container">
        <div className="about-title">
          SensAI
        </div>
        <div className="about-sub-title">Personalized video solutions</div>
        <div className="about-content">
          <div>
            We are humans who created a website thats kinda cool ig :)
          </div>
        </div>
      </div>
      <div className="emp-title">Team Members of SensAI</div>

      <div className="emp-cards">
        {employees.map((emp, index) => {
          return (
            <div className="emp-card" key={index}>
              <div className="emp-card-info">
                <div className="emp-card-info-name">{emp.name}</div>
                <div className="emp-card-info-title">{emp.title}</div>
              </div>

              <img className="emp-image" src={emp.img} alt="emp" />
            </div>
          );
        })}
      </div>
      <Footer />
    </div>
  );
}
