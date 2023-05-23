import click from "../../Music/click.mp3";
import boom from "../../Music/boom.mp3";
import success from "../../Music/success.wav";
import gameOver from "../../Music/beat.mp3";

import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import "./GameMouseLevel1.css";
import Confetti from "react-confetti";
import Swal from "sweetalert2";

const GameMouseLevel1 = () => {
  const navigate = useNavigate();
  const [isGameWon, setIsGameWon] = useState(false);
  const [audioPlayer, setAudioPlayer] = useState(null);

  const hitAudio = new Audio(click);
  const wrongHitAudio = new Audio(boom);
  const successAudio = new Audio(success);

  useEffect(() => {
    const audio = new Audio(gameOver);
    setAudioPlayer(audio);
  }, []);

  const [showBR, setBR] = useState("red");
  const [score, setScore] = useState(0);
  const [mouseIndex, setMouseIndex] = useState(-1);
  const [gameStarted, setGameStarted] = useState(false);
  const [remainingTime, setRemainingTime] = useState(5);
  const [targetScore, setTargetScore] = useState(1);

  const [randomVariables, setRandomVariables] = useState({
    rv1: Math.floor(Math.random() * 11),
    rv2: Math.floor(Math.random() * 11),
    rv3: Math.floor(Math.random() * 11),
    rv4: Math.floor(Math.random() * 11),
  });

  const confettiAnimation = useSpring({
    opacity: score >= targetScore ? 1 : 0,
  });
  const handleMoleClick = () => {
    if (!isGameWon) {
      setIsGameWon(true);
      audioPlayer.play();
    }
  };
  const stopSound = () => {
    if (isGameWon) {
      audioPlayer.pause();
      audioPlayer.currentTime = 0;
      setIsGameWon(false);
    }
  };
  useEffect(() => {
    let intervalId;
    if (gameStarted) {
      intervalId = setInterval(() => {
        const newIndex = Math.floor(Math.random() * 9);
        setMouseIndex(newIndex);
        setRemainingTime((prevTime) => prevTime - 1);
      }, 600);
    }

    if (remainingTime === 0) {
      setGameStarted(false);

      if (score >= targetScore) {
        Swal.fire({
          title: "Congratulations!",
          text: `You reached the target score of ${targetScore}!`,
          confirmButtonText: "OK",
        }).then(() => {
          handleStartGame(); // Call handleEndGame instead of handleStartOrEndGame
        });
      } else {
        handleMoleClick(); // Game over sound starts
        Swal.fire({
          title: "Game Over!",
          text: `You scored ${score} out of ${targetScore}. Try again!`,
          icon: "error",
          confirmButtonText: "OK",
        }).then(() => {
          stopSound(); // Stop the music
          handleStartGame(); // Call handleEndGame instead of handleStartOrEndGame
        });
      }
    }

    return () => clearInterval(intervalId);
  }, [gameStarted, remainingTime, score, targetScore]);

  const handleStartGame = () => {
    setGameStarted(true);
    setScore(0);
    setRemainingTime(5);
    setRandomVariables({
      rv1: Math.floor(Math.random() * 11),
      rv2: Math.floor(Math.random() * 11),
      rv3: Math.floor(Math.random() * 11),
      rv4: Math.floor(Math.random() * 11),
    });
  };

  const handleEndGame = () => {
    setGameStarted(false);
    setScore(0);
    setRemainingTime(5);
    setRandomVariables({
      rv1: Math.floor(Math.random() * 11),
      rv2: Math.floor(Math.random() * 11),
      rv3: Math.floor(Math.random() * 11),
      rv4: Math.floor(Math.random() * 11),
    });
  };
  const handleStartOrEndGame = () => {
    if (gameStarted) {
      handleEndGame();
    } else {
      handleStartGame();
    }
  };

  const handleHit = (index) => {
    if (index === mouseIndex) {
      if (showBR === "red") hitAudio.play(); // Play hit sound effect

      if (showBR === "#D40032") {
        setGameStarted(false);
        wrongHitAudio.play(); // Play wrong hit sound effect

        Swal.fire({
          title: "Game Over!",
          text: `You hit the mole on a Pink Mole. Game Over!`,
          icon: "error",
          confirmButtonText: "OK",
        }).then(() => {
          wrongHitAudio.pause();
          wrongHitAudio.currentTime = 0;
          handleStartGame();
        });
        return;
      }

      setScore((prevScore) => prevScore + 1);
      setMouseIndex(-1);

      if (score + 1 === targetScore) {
        successAudio.play(); // Play success sound effect
        setGameStarted(false);

        Swal.fire({
          title: "Congratulations!",
          html: `
            <div class="game-success-message">
              <h3>You reached the target score of ${targetScore}!</h3>
            </div>
          `,
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          successAudio.pause();
          successAudio.currentTime = 0;
          handleStartOrEndGame();
        });
      }
    }
  };

  useEffect(() => {
    if (
      remainingTime === randomVariables.rv1 ||
      remainingTime === randomVariables.rv2 ||
      remainingTime === randomVariables.rv3 ||
      remainingTime === randomVariables.rv4
    ) {
      setBR("#D40032");
    } else {
      setBR("red");
    }
  }, [remainingTime, randomVariables]);

  const handleclickBack = () => {
    navigate(-1);
  };

  return (
    <div>
      {gameStarted ? (
        // Button is hidden when game is started
        <div></div>
      ) : (
        <button className="back-Button-easy" onClick={handleclickBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      )}
      <div
        className="main-container-level1"
        style={
          gameStarted
            ? {
                marginTop: "0px",
                height: "100vh",
                border: "none",
                boxShadow: "none",
              }
            : {}
        }
      >
        <h1 className="game-title-level1">Whac A Mole</h1>
        <button
          type="button"
          className="start-button-level1"
          onClick={handleStartOrEndGame}
        >
          {!gameStarted ? "Start Game" : "End Game"}
        </button>

        {gameStarted && (
          <div className="game-container-level1">
            <div className="level1-part-1">
              <div
                className="Inner-box-level1"
                style={{
                  backgroundColor: mouseIndex === 0 ? `${showBR}` : "white",
                }}
                onClick={() => handleHit(0)}
              >
                Hit Me
              </div>
              <div
                className="Inner-box-level1"
                style={{
                  backgroundColor: mouseIndex === 1 ? `${showBR}` : "white",
                }}
                onClick={() => handleHit(1)}
              >
                Hit Me
              </div>
              <div
                className="Inner-box-level1"
                style={{
                  backgroundColor: mouseIndex === 2 ? `${showBR}` : "white",
                }}
                onClick={() => handleHit(2)}
              >
                Hit Me
              </div>
            </div>
            <div className="level1-part-1">
              <div
                className="Inner-box-level1"
                style={{
                  backgroundColor: mouseIndex === 3 ? `${showBR}` : "white",
                }}
                onClick={() => handleHit(3)}
              >
                Hit Me
              </div>
              <div
                className="Inner-box-level1"
                style={{
                  backgroundColor: mouseIndex === 4 ? `${showBR}` : "white",
                }}
                onClick={() => handleHit(4)}
              >
                Hit Me
              </div>
              <div
                className="Inner-box-level1"
                style={{
                  backgroundColor: mouseIndex === 5 ? `${showBR}` : "white",
                }}
                onClick={() => handleHit(5)}
              >
                Hit Me
              </div>
            </div>
            <div className="level1-part-1">
              <div
                className="Inner-box-level1"
                style={{
                  backgroundColor: mouseIndex === 6 ? `${showBR}` : "white",
                }}
                onClick={() => handleHit(6)}
              >
                Hit Me
              </div>
              <div
                className="Inner-box-level1"
                style={{
                  backgroundColor: mouseIndex === 7 ? `${showBR}` : "white",
                }}
                onClick={() => handleHit(7)}
              >
                Hit Me
              </div>
              <div
                className="Inner-box-level1"
                style={{
                  backgroundColor: mouseIndex === 8 ? `${showBR}` : "white",
                }}
                onClick={() => handleHit(8)}
              >
                Hit Me
              </div>
            </div>

            <div className="level1-part-2">
              <p className="score-label">Score: {score}</p>
              <p className="time-label">Time Left: {remainingTime}s</p>
              <p className="target-score-label">Target Score: {targetScore}</p>
            </div>
          </div>
        )}
      </div>
      <animated.div
        style={{
          ...confettiAnimation,
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pointerEvents: "none",
        }}
      >
        <Confetti />
      </animated.div>
    </div>
  );
};

export default GameMouseLevel1;

/*
import click from "../../Music/click.mp3";
import boom from "../../Music/boom.mp3";
import success from "../../Music/success.wav";
import gameOver from "../../Music/beat.mp3"

import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import "./GameMouseLevel1.css";
import Confetti from "react-confetti";
import Swal from "sweetalert2";

const GameMouseLevel1 = ({ onShowHeading, onHideHeading }) => {
  const [isGameWon, setIsGameWon] = useState(false);
  const [audioPlayer, setAudioPlayer] = useState(null);

  const hitAudio = new Audio(click);
  const wrongHitAudio = new Audio(boom);
  const successAudio = new Audio(success);

  useEffect(() => {
    const audio = new Audio(gameOver);
    setAudioPlayer(audio);
  }, []);

  const [showBR, setBR] = useState("red");
  const [score, setScore] = useState(0);
  const [mouseIndex, setMouseIndex] = useState(-1);
  const [gameStarted, setGameStarted] = useState(false);
  const [remainingTime, setRemainingTime] = useState(5); 
  const [targetScore, setTargetScore] = useState(1);

  const [randomVariables, setRandomVariables] = useState({
    rv1: Math.floor(Math.random() * 11),
    rv2: Math.floor(Math.random() * 11),
    rv3: Math.floor(Math.random() * 11),
    rv4: Math.floor(Math.random() * 11),
  });

  const confettiAnimation = useSpring({
    opacity: score >= targetScore ? 1 : 0,
  });
  const handleMoleClick = () => {
    if (!isGameWon) {
      setIsGameWon(true);
      audioPlayer.play();
    }
  };
  const stopSound = () => {
    if (isGameWon) {
      audioPlayer.pause();
      audioPlayer.currentTime = 0;
      setIsGameWon(false);
    }
  };
  useEffect(() => {
    let intervalId;
    if (gameStarted) {
      intervalId = setInterval(() => {
        const newIndex = Math.floor(Math.random() * 9);
        setMouseIndex(newIndex);
        setRemainingTime((prevTime) => prevTime - 1);
      }, 600);
    }

    if (remainingTime === 0) {
      setGameStarted(false);

      if (score >= targetScore) {
        Swal.fire({
          title: "Congratulations!",
          text: `You reached the target score of ${targetScore}!`,
          confirmButtonText: "OK",
        }).then(() => {
          handleStartGame(); // Call handleEndGame instead of handleStartOrEndGame
        });
      } else {
        handleMoleClick(); // Game over sound starts
        Swal.fire({
          title: "Game Over!",
          text: `You scored ${score} out of ${targetScore}. Try again!`,
          icon: "error",
          confirmButtonText: "OK",
        }).then(() => {
          stopSound(); // Stop the music
          handleStartGame(); // Call handleEndGame instead of handleStartOrEndGame
        });
      }
    }

    return () => clearInterval(intervalId);
  }, [gameStarted, remainingTime, score, targetScore]);

  const handleStartGame = () => {
    onHideHeading();
    setGameStarted(true);
    setScore(0);
    setRemainingTime(5);
    setRandomVariables({
      rv1: Math.floor(Math.random() * 11),
      rv2: Math.floor(Math.random() * 11),
      rv3: Math.floor(Math.random() * 11),
      rv4: Math.floor(Math.random() * 11),
    });
  };

  const handleEndGame = () => {
    onShowHeading();
    setGameStarted(false);
    setScore(0);
    setRemainingTime(5);
    setRandomVariables({
      rv1: Math.floor(Math.random() * 11),
      rv2: Math.floor(Math.random() * 11),
      rv3: Math.floor(Math.random() * 11),
      rv4: Math.floor(Math.random() * 11),
    });
  };
  const handleStartOrEndGame = () => {
    if (gameStarted) {
      handleEndGame();
    } else {
      handleStartGame();
    }
  };

  const handleHit = (index) => {
    if (index === mouseIndex) {
      if (showBR === "red") hitAudio.play(); // Play hit sound effect

      if (showBR === "#D40032") {
        setGameStarted(false);
        wrongHitAudio.play(); // Play wrong hit sound effect

        Swal.fire({
          title: "Game Over!",
          text: `You hit the mole on a Pink Mole. Game Over!`,
          icon: "error",
          confirmButtonText: "OK",
        }).then(() => {
          wrongHitAudio.pause();
          wrongHitAudio.currentTime = 0;
          handleStartGame();
        });
        return;
      }

      setScore((prevScore) => prevScore + 1);
      setMouseIndex(-1);

      if (score + 1 === targetScore) {
        successAudio.play(); // Play success sound effect
        setGameStarted(false);

        Swal.fire({
          title: "Congratulations!",
          html: `
            <div class="game-success-message">
              <h3>You reached the target score of ${targetScore}!</h3>
            </div>
          `,
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          successAudio.pause();
          successAudio.currentTime = 0;
          handleStartOrEndGame();
        });
      }
    }
  };

  useEffect(() => {
    if (
      remainingTime === randomVariables.rv1 ||
      remainingTime === randomVariables.rv2 ||
      remainingTime === randomVariables.rv3 ||
      remainingTime === randomVariables.rv4
    ) {
      setBR("#D40032");
    } else {
      setBR("red");
    }
  }, [remainingTime, randomVariables]);

  return (
    <div>
      <div
        className="main-container-level1"
        style={gameStarted ? { marginBottom: "-90px" } : {}}
      >
        <h1 className="game-title-level1">Whac A Mole</h1>
        <button
          type="button"
          className="start-button-level1"
          onClick={handleStartOrEndGame}
        >
          {!gameStarted ? "Start Game" : "End Game"}
        </button>

        {gameStarted && (
          <div className="game-container-level1">
            <div className="level1-part-1">
              <div
                className="Inner-box-level1"
                style={{
                  backgroundColor: mouseIndex === 0 ? `${showBR}` : "white",
                }}
                onClick={() => handleHit(0)}
              >
                Hit Me
              </div>
              <div
                className="Inner-box-level1"
                style={{
                  backgroundColor: mouseIndex === 1 ? `${showBR}` : "white",
                }}
                onClick={() => handleHit(1)}
              >
                Hit Me
              </div>
              <div
                className="Inner-box-level1"
                style={{
                  backgroundColor: mouseIndex === 2 ? `${showBR}` : "white",
                }}
                onClick={() => handleHit(2)}
              >
                Hit Me
              </div>
            </div>
            <div className="level1-part-1">
              <div
                className="Inner-box-level1"
                style={{
                  backgroundColor: mouseIndex === 3 ? `${showBR}` : "white",
                }}
                onClick={() => handleHit(3)}
              >
                Hit Me
              </div>
              <div
                className="Inner-box-level1"
                style={{
                  backgroundColor: mouseIndex === 4 ? `${showBR}` : "white",
                }}
                onClick={() => handleHit(4)}
              >
                Hit Me
              </div>
              <div
                className="Inner-box-level1"
                style={{
                  backgroundColor: mouseIndex === 5 ? `${showBR}` : "white",
                }}
                onClick={() => handleHit(5)}
              >
                Hit Me
              </div>
            </div>
            <div className="level1-part-1">
              <div
                className="Inner-box-level1"
                style={{
                  backgroundColor: mouseIndex === 6 ? `${showBR}` : "white",
                }}
                onClick={() => handleHit(6)}
              >
                Hit Me
              </div>
              <div
                className="Inner-box-level1"
                style={{
                  backgroundColor: mouseIndex === 7 ? `${showBR}` : "white",
                }}
                onClick={() => handleHit(7)}
              >
                Hit Me
              </div>
              <div
                className="Inner-box-level1"
                style={{
                  backgroundColor: mouseIndex === 8 ? `${showBR}` : "white",
                }}
                onClick={() => handleHit(8)}
              >
                Hit Me
              </div>
            </div>

            <div className="level1-part-2">
              <p className="score-label">Score: {score}</p>
              <p className="time-label">Time Left: {remainingTime}s</p>
              <p className="target-score-label">Target Score: {targetScore}</p>
            </div>
          </div>
        )}
      </div>
      <animated.div
        style={{
          ...confettiAnimation,
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pointerEvents: "none",
        }}
      >
        <Confetti />
      </animated.div>
    </div>
  );
};

export default GameMouseLevel1;

*/
