import React, { useEffect, useState } from "react";

const QuestionCard = ({ questionData, handleAnswer, hasAnswered }) => {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setSelected(null); // Reset selected on question change
  }, [questionData]);

  const onOptionClick = (option) => {
    if (hasAnswered) return;
    setSelected(option);
    const isCorrect = option === questionData.answer;
    handleAnswer(isCorrect);
  };

  return (
    <div className="question-card">
      <h3>{questionData.question}</h3>
      <div className="options">
        {questionData.options.map((option, index) => (
          <button
            key={index}
            className={`option-btn 
              ${hasAnswered && option === questionData.answer ? "correct" : ""}
              ${
                hasAnswered &&
                option === selected &&
                option !== questionData.answer
                  ? "wrong"
                  : ""
              }
            `}
            onClick={() => onOptionClick(option)}
            disabled={hasAnswered}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
