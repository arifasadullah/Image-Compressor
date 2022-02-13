import React from "react";
import "./App.css";
import LandingPage from "./Component/LandingPage";
const App = () => {
  function refreshPage() {
    window.location.reload(false);
  }
  return (
    <div className="App">
      <header>
        <span onClick={refreshPage}>Imagify</span>
      </header>

      <LandingPage />
    </div>
  );
};

export default App;
