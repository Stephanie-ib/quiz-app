import React from "react";

const StartScreen = ({ username, setUsername, startQuiz }) => {
  return (
    <div className="start-screen">
      <h1>🎯 Ultimate Quiz Challenge</h1>
      <input
        type="text"
        placeholder="Enter your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button className="start-btn" onClick={startQuiz}>
        Start Quiz
      </button>
    </div>
  );
};

export default StartScreen;
