import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          <div className="footer__section">
            <h3 className="footer__section-heading">About Us</h3>
            <p className="footer__section-text">
              We are a company dedicated to providing quality products and services to our customers.
            </p>
          </div>
          <div className="footer__section">
            <h3 className="footer__section-heading">Contact Us</h3>
            <p className="footer__section-text">
              Email: info@example.com<br />
              Phone: 123-456-7890
            </p>
          </div>
          <div className="footer__section">
            <h3 className="footer__section-heading">Follow Us</h3>
            <div className="footer__social-icons">
              <a href="#" className="footer__social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="footer__social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="footer__social-icon">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
        <p className="footer__copyright">
          &copy; 2023 Your Company. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
