import React, { useState } from 'react';
import logo from '../../images/Travel.png'
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <span className="navbar__logo">
          <img src={logo} alt="Logo" />
        </span>
        <div className={`navbar__menu ${isOpen ? 'active' : ''}`}>
          <Link to="/" className='navbar__link'>Home</Link>
          <Link to="/about" className="navbar__link">About Us</Link>
          <Link to="/contact" className="navbar__link">Contact Us</Link>
        </div>
        <div className="navbar__toggle" onClick={handleToggle}>
          <span className="navbar__icon"></span>
          <span className="navbar__icon"></span>
          <span className="navbar__icon"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
