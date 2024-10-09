import React, { useState, useEffect } from 'react';

function MobileScreen({ questions, players, setPlayers }) {
  const [playerName, setPlayerName] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answerFeedback, setAnswerFeedback] = useState(null); // To display feedback

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    // Listen for question updates from MainScreen (using a shared state)
    const handleQuestionUpdate = (newQuestionIndex) => {
      setCurrentQuestionIndex(newQuestionIndex);
      setAnswerFeedback(null); // Reset feedback when question changes
    };

    // In a real app, you would use a state management library or context API
    // to share state between components. For simplicity, let's assume there's
    // a global function `updateMobileScreen` that MainScreen calls to update
    // the question index on the mobile screen.
    window.updateMobileScreen = handleQuestionUpdate;

    return () => {
      // Clean up the global function when the component unmounts
      delete window.updateMobileScreen;
    };
  }, []);

  const handleNameChange = (event) => {
    setPlayerName(event.target.value);
  };

  const handleJoin = () => {
    if (playerName) {
      setPlayers([...players, { name: playerName }]);
    }
  };

  const handleAnswerSubmit = (selectedAnswer) => {
    // Send the answer to MainScreen (using a global function)
    if (window.handleAnswerOnMainScreen) {
      window.handleAnswerOnMainScreen(selectedAnswer, playerName);
    }

    // Display feedback on the mobile screen
    if (selectedAnswer === currentQuestion.answer) {
      setAnswerFeedback('Correct!');
    } else {
      setAnswerFeedback('Incorrect!');
    }
  };

  return (
    <div className="mobile-screen">
      <h1>KBC Mobile</h1>

      {!playerName ? (
        <div>
          <input
            type="text"
            placeholder="Enter your name"
            value={playerName}
            onChange={handleNameChange}
          />
          <button onClick={handleJoin}>Join</button>
        </div>
      ) : (
        <div className="question-section">
          {currentQuestion && (
            <>
              <h2>{currentQuestion.text}</h2>
              <ul>
                {currentQuestion.options.map((option, index) => (
                  <li key={index}>
                    <button onClick={() => handleAnswerSubmit(option)}>{option}</button>
                  </li>
                ))}
              </ul>
              {answerFeedback && <div className="answer-feedback">{answerFeedback}</div>} {/* Display feedback */}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default MobileScreen;