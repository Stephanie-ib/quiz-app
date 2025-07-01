import React from "react";
import Confetti from "react-confetti";

const Leaderboard = ({ onClose }) => {
  const scores = JSON.parse(localStorage.getItem("quizScores")) || [];

  const ranks = ["🥇 1st", "🥈 2nd", "🥉 3rd", "4th", "5th"];
  const topScorer = scores[0]?.score >= 16;

  return (
    <div className="leaderboard-overlay">
      {topScorer && <Confetti />}
      <button className="close-btn" onClick={onClose}>
        ×
      </button>
      <h2>🏆 Leaderboard</h2>
      <ul>
        {scores.length > 0 ? (
          scores.map((entry, i) => (
            <li key={i}>
              <strong>
                {ranks[i] || `${i + 1}th`} - {entry.name}
              </strong>
              : {entry.score}
            </li>
          ))
        ) : (
          <li>No scores yet</li>
        )}
      </ul>
    </div>
  );
};

export default Leaderboard;
