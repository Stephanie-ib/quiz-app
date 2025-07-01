import React from "react";

const Leaderboard = () => {
  const scores = JSON.parse(localStorage.getItem("quizScores")) || [];

  return (
    <div className="past-scores">
      <h3>🏆 Leaderboard (Top 5)</h3>
      <ul>
        {scores.length > 0 ? (
          scores.map((entry, i) => (
            <li key={i}>
              <strong>{entry.name}</strong>: {entry.score}
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
