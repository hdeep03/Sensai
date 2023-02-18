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
    { name: "John Doe", title: "Sales Manager", img: "assets/about/img1.jpg" },
    {
      name: "John Doe",
      title: "CEO of the AGCTS",
      img: "assets/about/img2.jpg"
    },
    {
      name: "John Doe",
      title: "CTO of the AGCTS",
      img: "assets/about/img3.jpg"
    },
    { name: "John Doe", title: "Media Manager", img: "assets/about/img4.jpg" }
  ];

  return (
    <div>
      <Navbar background={true} page="about-us" />
      <img
        className="about-background"
        src="assets/about/about-us-1.png"
        alt="about us page"
      />
      <div className="about-container">
        <div className="about-title">
          <span>ag</span> CTS
        </div>
        <div className="about-sub-title">Cyber Tech Solutions</div>
        <div className="about-content">
          <div>
            1. We follow the industry best practices aligned with your business
          </div>
          <div>
            2. Trusted and reliable services to enhance your business growth
          </div>
          <div>
            3. Certified and experienced professional to prove state of the art
            consulting services
          </div>
          <div>
            4. Agile and flexible consulting model so that your business pace is
            never compromised
          </div>
          <div>
            5. Cost-effective services tailored to needs of organizations of any
            size and any domain
          </div>
          <div>
            6. Extensive retail, Banking and other international experience
          </div>
        </div>
      </div>
      <div className="emp-title">Team Members of AGCTS</div>

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
