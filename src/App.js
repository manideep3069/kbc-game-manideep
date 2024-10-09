// // src/App.js
import React, { useState, useEffect } from 'react';
import MainScreen from './MainScreen';
import MobileScreen from './MobileScreen';

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [players, setPlayers] = useState([]); // Shared state for players

  // Add 15 questions here
  const questions = [
    {
      text: "What is the capital of France?",
      options: ["Berlin", "Paris", "Madrid", "Rome"],
      answer: "Paris",
    },
    {
      text: "Who painted the Mona Lisa?",
      options: ["Michelangelo", "Leonardo da Vinci", "Raphael", "Donatello"],
      answer: "Leonardo da Vinci",
    },
    {
      text: "What is the highest mountain in the world?",
      options: ["Mount Kilimanjaro", "Mount Everest", "Kangchenjunga", "Lhotse"],
      answer: "Mount Everest",
    },
    {
      text: "In what year did World War II begin?",
      options: ["1914", "1939", "1941", "1945"],
      answer: "1939",
    },
    {
      text: "What is the chemical symbol for gold?",
      options: ["Ag", "Au", "Fe", "Hg"],
      answer: "Au",
    },
    {
      text: "Who wrote the play 'Hamlet'?",
      options: ["William Shakespeare", "Christopher Marlowe", "Ben Jonson", "John Webster"],
      answer: "William Shakespeare",
    },
    {
      text: "What is the largest planet in our solar system?",
      options: ["Mars", "Jupiter", "Saturn", "Uranus"],
      answer: "Jupiter",
    },
    {
      text: "Which country won the FIFA World Cup in 2018?",
      options: ["Brazil", "Germany", "France", "Croatia"],
      answer: "France",
    },
    {
      text: "What is the smallest country in the world?",
      options: ["Monaco", "Vatican City", "Nauru", "Tuvalu"],
      answer: "Vatican City",
    },
    {
      text: "Who invented the telephone?",
      options: ["Thomas Edison", "Alexander Graham Bell", "Nikola Tesla", "Guglielmo Marconi"],
      answer: "Alexander Graham Bell",
    },
    {
      text: "What is the capital of Japan?",
      options: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
      answer: "Tokyo",
    },
    {
      text: "Which animal is known as the 'King of the Jungle'?",
      options: ["Tiger", "Lion", "Leopard", "Jaguar"],
      answer: "Lion",
    },
    {
      text: "What is the largest ocean on Earth?",
      options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      answer: "Pacific Ocean",
    },
    {
      text: "Who painted the ceiling of the Sistine Chapel?",
      options: ["Leonardo da Vinci", "Michelangelo", "Raphael", "Donatello"],
      answer: "Michelangelo",
    },
    {
      text: "What is the name of the longest river in the world?",
      options: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"],
      answer: "Nile River",
    },
  ];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="App">
      {isMobile ? (
        <MobileScreen questions={questions} players={players} setPlayers={setPlayers} />
      ) : (
        <MainScreen questions={questions} players={players} setPlayers={setPlayers} />
      )}
    </div>
  );
}

export default App;

