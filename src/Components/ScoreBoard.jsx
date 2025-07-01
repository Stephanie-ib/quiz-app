import React from "react";

const ScoreBoard = ({ score, total, restart }) => {
  return (
    <div className="score-board">
      <h2>Quiz Completed!</h2>
      <p>
        Your Score: {score} / {total}
      </p>
      <button className="start-btn" onClick={restart}>
        Restart Quiz
      </button>
    </div>
  );
};

export default ScoreBoard;
