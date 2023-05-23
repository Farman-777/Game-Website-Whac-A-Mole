import Navbar from "../HeaderFooter/Navbar";
import "./Home.css";
import Footer from "../HeaderFooter/Footer";
import React, { useState } from "react";
import Start from "../Start";

function Home() {
    const [showHeading, setShowHeading] = useState(true); // Set initial state to true

  const onShowHeading = () => {
    setShowHeading(true); // Set showHeading to true when the game ends
  };

  const onHideHeading = () => {
    setShowHeading(false); // Set showHeading to false when the game starts
  };

  return (
    <div>
      <Navbar />
      {showHeading && <h2 className="app-heading">Welcome  Let's Play</h2>}
      <Start/>
      <Footer />
    </div>
  );
}

export default Home;
