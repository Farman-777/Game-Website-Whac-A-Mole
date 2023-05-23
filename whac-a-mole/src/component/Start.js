import { useNavigate } from 'react-router-dom';
import React from 'react';
import './Start.css';

const Start = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/level');
  };

  return (
    <div className="start-container">
      <h1 className="start-heading">Are you ready for the game?</h1>
      <button className="start-button" onClick={handleClick}>
        Go For Level
      </button>
    </div>
  );
};

export default Start;
