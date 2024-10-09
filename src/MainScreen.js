import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';

function MainScreen({ questions, players, setPlayers }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [correctPlayer, setCorrectPlayer] = useState(null);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    const handleAnswer = (playerAnswer, playerName) => {
      if (playerAnswer === currentQuestion.answer) {
        setCorrectPlayer(playerName);
        setShowAnswer(true);
        setCorrectAnswer(null);
        setTimeout(() => {
          setShowAnswer(false);
          setCorrectPlayer(null);
          const nextQuestionIndex = currentQuestionIndex + 1;
          setCurrentQuestionIndex(nextQuestionIndex);
          updateMobileScreen(nextQuestionIndex);
        }, 2000);
      } else {
        setCorrectAnswer(currentQuestion.answer);
      }
    };

    window.handleAnswerOnMainScreen = handleAnswer;

    const simulateAnswer = () => {
      if (currentQuestion && players.length > 0) {
        const randomPlayer = players[Math.floor(Math.random() * players.length)];
        const randomAnswer = currentQuestion.options[Math.floor(Math.random() * currentQuestion.options.length)];
        setTimeout(() => {
          handleAnswer(randomAnswer, randomPlayer.name);
        }, 3000);
      }
    };

    if (currentQuestion && players.length > 0) {
      simulateAnswer();
    }
  }, [currentQuestion, players, questions]);

  const updateMobileScreen = (newQuestionIndex) => {
    if (window.updateMobileScreen) {
      window.updateMobileScreen(newQuestionIndex);
    }
  };

  return (
    <div className="main-screen">
      <h1>Welcome to KBC!</h1>
      
      <QRCodeSVG value="http://192.168.1.35/kbc-mobile" size={256} level="H" /> 

      {currentQuestion && (
        <div className="question-section">
          <h2>{currentQuestion.text}</h2>
          <ul>
            {currentQuestion.options.map((option, index) => (
              <li key={index}>{option}</li>
            ))}
          </ul>

          {showAnswer && correctPlayer && (
            <div className="answer-feedback">Congratulations {correctPlayer}!</div>
          )}
          {correctAnswer && <div className="correct-answer">The correct answer was: {correctAnswer}</div>}
        </div>
      )}

      <div className="players-section">
        <h3>Players: Player 1</h3>
        <ul>
          {players.map((player, index) => (
            <li key={index}>{player.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MainScreen;