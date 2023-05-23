import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import "./Level.css";

function Level() {
  const navigate = useNavigate();

  const handleclickBack = () => {
    navigate(-1);
  };

  const handleEasy = () => {
    navigate("/easy");
  };

  const handleMedium = () => {
    navigate("/medium");
  };

  const handleHard = () => {
    navigate("/hard");
  };

  return (
  
    <div>
      <div className="level-container">
    <button className="back-Button-level" onClick={handleclickBack}>
      <FontAwesomeIcon icon={faArrowLeft} />
    </button>
        <div className="box-container">
          <button className="levels" onClick={handleEasy}>
            <span role="img" aria-label="Easy" className="emoji emoji-bounce">
              😊
            </span>
            <span className="button-label">Easy</span>
          </button>

          <button className="levels" onClick={handleMedium}>
            <span role="img" aria-label="Medium" className="emoji emoji-rotate">
              😎
            </span>
            <span className="button-label">Medium</span>
          </button>

          <button className="levels" onClick={handleHard}>
            <span role="img" aria-label="Hard" className="emoji emoji-pulse">
              😈
            </span>
            <span className="button-label">Hard</span>
          </button>
        </div>
      </div>
    </div>
 
  );
}

export default Level;
