import React from "react";
import "./ContactUs.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const ContactUs = () => {
  const Navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    alert("Form Submitted");
  };

  const handleclickBack = () => {
    Navigate(-1);
  };

  return (
    <>
      <button className="back-Button-contactUs" onClick={handleclickBack}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <div className="contact-us-container">
        <h1 className="contact-us-heading">Contact Us</h1>
        <p className="contact-us-text">
          Please fill out the form below to get in touch with us.
        </p>

        <form className="contact-us-form" onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              className="form-control"
              id="message"
              rows="5"
              placeholder="Enter your message"
              required
            ></textarea>
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default ContactUs;
