import React from "react";
import "./AboutUs.css"; // Import CSS file for styling
import "@fortawesome/fontawesome-free/css/all.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import profileImage from "../../images/farman-malik.jpg"; // Import profile image

const AboutUs = () => {
  const Navigate = useNavigate();  
  const handleclickBack = () => {
    Navigate(-1);
  };
  return (
    <>
      <button className="back-Button-aboutUs" onClick={handleclickBack}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <div className="about-us-container">
        <div className="profile-container">
          <img
            src={profileImage}
            alt="Farman Malik"
            className="profile-image"
          />
          <div className="profile-details">
            <h1 className="aboutus-h1">Farman Malik</h1>
            <p className="profile-description">
              Farman Malik is a passionate software developer who completed his
              MCA from GGSIPU-CDAC. He is currently working as an intern at CDAC
              Noida. With expertise in front-end development and a love for
              creating interactive games, Farman has developed this website to
              showcase his Whac-A-Mole game project. Feel free to explore the
              game and connect with Farman to learn more!
            </p>
          </div>
        </div>
        <div className="connect-container">
          <h2>Connect with Farman</h2>
          <div className="social-media-links">
            <a href="https://www.facebook.com/" className="social-link">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.instagram.com/" className="social-link">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
