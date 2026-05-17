import React, { useState, useEffect } from "react";
import "./App.css";

const puzzles = [
  { id: 1, stage: 1, question: "Decode this Base64 string: 'U2VjdXJpdHlJc0Z1bg=='", answer: "SecurityIsFun", hint: "Use a Base64 decoder.", timeLimit: 60 },
  { id: 2, stage: 1, question: "A Caesar cipher shifts each letter. What is 'Wklv lv d whvw' shifted -3?", answer: "This is a test", hint: "Shift each letter backwards by 3.", timeLimit: 60 },
  { id: 3, stage: 1, question: "Which domain is safe?\n1. paypal.com\n2. paypa1.com\n3. paypal-secure.com", answer: "paypal.com", hint: "Look for common phishing tricks.", timeLimit: 60 },
  { id: 4, stage: 2, question: "What is 7 + 5 * 2? (Order of operations!)", answer: "17", hint: "Remember the order of operations (PEMDAS).", timeLimit: 60 },
  { id: 5, stage: 2, question: "Which of these is a strong password?\n1. password123\n2. 3L!g9*rP@w7\n3. 12345678", answer: "3L!g9*rP@w7", hint: "Look for a password with a mix of characters.", timeLimit: 60 },
  { id: 6, stage: 3, question: "What is the output of 15 & 7 (bitwise AND)?", answer: "7", hint: "Remember how bitwise AND works in binary.", timeLimit: 60 },
  { id: 7, stage: 3, question: "Which of these websites is a phishing attempt?\n1. secure-bank-login.com\n2. bank-login.com\n3. secure-login.com", answer: "secure-bank-login.com", hint: "Look for unusual domain names.", timeLimit: 60 },
  { id: 8, stage: 4, question: "What is the flag for the HTTP status code 404?", answer: "Not Found", hint: "Think about common HTTP error codes.", timeLimit: 60 },
  { id: 9, stage: 4, question: "In cybersecurity, what does the acronym 'DDoS' stand for?", answer: "Distributed Denial of Service", hint: "Think about attacks that target service availability.", timeLimit: 60 }
];

function App() {
  const [current, setCurrent] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(puzzles[0].timeLimit);
  const [currentStage, setCurrentStage] = useState(1);
  const [escaped, setEscaped] = useState(false); // State to track escape completion
  const [timerActive, setTimerActive] = useState(true);

  useEffect(() => {
    if (escaped || current >= puzzles.length || !timerActive) return; // Don't start the timer if escaped or no puzzles left

    setTimeRemaining(puzzles[current].timeLimit);

    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime === 1) {
          clearInterval(timer);
          setTimerActive(false);
          setFeedback("Time's up! Moving to the next puzzle...");
          setTimeout(() => {
            moveToNextPuzzle();
          }, 1500);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Clean up interval on unmount
  }, [current, timerActive, escaped]);

  const moveToNextPuzzle = () => {
    const nextPuzzle = current + 1;
    if (nextPuzzle < puzzles.length) {
      setCurrent(nextPuzzle);
      setUserAnswer("");
      setFeedback("");
      setTimerActive(true); // Restart the timer for the next puzzle
    } else {
      setEscaped(true); // If all puzzles completed, set escaped to true
    }
  };

  const checkAnswer = () => {
    const correct = puzzles[current].answer.toLowerCase().trim();
    const guess = userAnswer.toLowerCase().trim();

    if (guess === correct) {
      setFeedback("Correct! Moving to the next puzzle...");
      setTimeout(() => {
        moveToNextPuzzle();
      }, 1500);
    } else {
      setFeedback("Incorrect. Try again or use the hint.");
    }
  };

  const getHint = () => {
    alert(puzzles[current].hint); // Show hint
  };

  if (escaped) {
    return (
      <div className="escape-container">
        <h1>Escape Complete!</h1>
        <div className="animation">
          <div className="escape-box">
            <div className="escape-door"></div>
            <div className="escape-person"></div>
          </div>
          <p>You solved all the cybersecurity puzzles and ESCAPED the room!</p>
        </div>
      </div>
    );
  }

  const puzzle = puzzles[current];

  return (
    <div className={`container stage-${currentStage}`}>
      <h1>Cybersecurity Escape Room - Stage {currentStage}</h1>
      <div className="puzzle">
        <p>{puzzle.question}</p>
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
        />
        <button onClick={checkAnswer}>Submit</button>
        <button onClick={getHint}>Hint</button>
        {feedback && <p className="feedback">{feedback}</p>}
      </div>

      {/* Timer */}
      <div className="timer">
        <p>Time Remaining: {timeRemaining}s</p>
      </div>
    </div>
  );
}

export default App;
