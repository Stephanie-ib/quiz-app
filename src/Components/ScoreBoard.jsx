import React from "react";
import Confetti from "react-confetti";

const ScoreBoard = ({ score, total, restart }) => {
  return (
    <div className="score-board">
      {score >= 16 && <Confetti />}
      <h2>Quiz Completed!</h2>
      <p>
        You scored {score} out of {total}
      </p>
      {score >= 16 ? (
        <p className="congrats">🎉 Congratulations! You're were awesome! 🎉</p>
      ) : (
        <p>Keep praticing and try again!</p>
      )}
      <button className="restart-btn" onClick={restart}>
        Restart Quiz
      </button>
    </div>
  );
};

export default ScoreBoard;
