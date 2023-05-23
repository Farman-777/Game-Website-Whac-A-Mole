import "./App.css";
import React, { useState } from "react";
import ContactUs from "./component/Navbar/ContactUs";
import AboutUs from "./component/Navbar/AboutUs";
import Home from "./component/Navbar/Home";
import Start from "./component/Start";
import { Routes, Route } from "react-router-dom";
import Level from "./component/Level";
import GameMouseLevel1 from "./component/Levels/GameMouseLevel1";
import GameMouseLevel2 from "./component/Levels/GameMouseLevel2";
import GameMouseLevel3 from "./component/Levels/GameMouseLevel3";


function App() {
  return (
    <div className="App">
      {/* <Home /> */}
      <Routes>
        <Route path="/level" element={<Level />} />
        <Route path="/start" element={<Start />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/easy" element={<GameMouseLevel1 />} />
        <Route path="/medium" element={<GameMouseLevel2 />} />
        <Route path="/hard" element={<GameMouseLevel3 />} />
      </Routes>
    </div>
  );
}

export default App;
