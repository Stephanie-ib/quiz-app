import React, { useState, useEffect } from "react";
import questions from "./data";
import QuestionCard from "./Components/QuestionCard";
import ScoreBoard from "./Components/ScoreBoard";
import ProgressBar from "./Components/ProgressBar";
import "./App.css";

const App = () => {
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [quizStarted, setQuizStarted] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);

  const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

  useEffect(() => {
    const randomized = shuffleArray(questions);
    setShuffledQuestions(randomized);
  }, []);

  useEffect(() => {
    if (!quizStarted || showScore || timeLeft <= 0 || hasAnswered) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, showScore, quizStarted, hasAnswered]);

  useEffect(() => {
    if (timeLeft === 0 && !hasAnswered) {
      handleAnswer(false);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (showScore) {
      const pastScores = JSON.parse(localStorage.getItem("quizScores")) || [];
      const newScores = [...pastScores, score];
      localStorage.setItem("quizScores", JSON.stringify(newScores));
    }
  }, [showScore]);

  const handleAnswer = (isCorrect) => {
    setHasAnswered(true);
    if (isCorrect) setScore((prev) => prev + 1);
  };

  const handleNext = () => {
    if (currentQuestion < shuffledQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setHasAnswered(false);
      setTimeLeft(15);
    } else {
      setShowScore(true);
    }
  };

  const restartQuiz = () => {
    const randomized = shuffleArray(questions);
    setShuffledQuestions(randomized);
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setTimeLeft(15);
    setQuizStarted(false);
    setHasAnswered(false);
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setTimeLeft(15);
  };

  return (
    <div className="app">
      {!quizStarted ? (
        <div className="start-screen">
          <h1>🎯 Ultimate Quiz Challenge</h1>
          <button className="start-btn" onClick={startQuiz}>
            Start Quiz
          </button>
        </div>
      ) : showScore ? (
        <ScoreBoard
          score={score}
          total={shuffledQuestions.length}
          restart={restartQuiz}
        />
      ) : shuffledQuestions.length > 0 ? (
        <>
          <div className="top-bar">
            <span className="counter">
              {currentQuestion + 1} of {shuffledQuestions.length}
            </span>
            <span className="timer">⏱️ {timeLeft}s</span>
          </div>
          <ProgressBar
            current={currentQuestion + 1}
            total={shuffledQuestions.length}
          />
          <QuestionCard
            questionData={shuffledQuestions[currentQuestion]}
            handleAnswer={handleAnswer}
            hasAnswered={hasAnswered}
          />
          {hasAnswered && (
            <button className="next-btn" onClick={handleNext}>
              Next
            </button>
          )}
        </>
      ) : (
        <p>Loading questions...</p>
      )}
    </div>
  );
};

export default App;
