import React, { useState, useEffect, useRef } from 'react';
import Card from './Card';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const GameBoard = ({ selectedAnimals, numPlayers, onNewSelection, colorScheme }) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [turn, setTurn] = useState(1);
  const [matches, setMatches] = useState({});
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [confettiInstances, setConfettiInstances] = useState([]);
  const [winner, setWinner] = useState(null);

  const { width, height } = useWindowSize();

  const [showWinScreen, setShowWinScreen] = useState(false);

  useEffect(() => {
    if (gameEnded) {
      // Delay showing the win screen to ensure state updates have completed
      setTimeout(() => setShowWinScreen(true), 300);
    } else {
      setShowWinScreen(false);
    }
  }, [gameEnded]);

  useEffect(() => {
    const initializeGame = () => {
      const shuffledCards = [...selectedAnimals, ...selectedAnimals]
        .sort(() => Math.random() - 0.5)
        .map((animal, index) => ({ id: index, animal, isFlipped: false, isMatched: false }));
      setCards(shuffledCards);
      setFlippedCards([]);
      const initialMatches = {};
      for (let i = 1; i <= numPlayers; i++) {
        initialMatches[`player${i}`] = 0;
      }
      setMatches(initialMatches);
      setTurn(1);
      setGameEnded(false);
      setGameStarted(true);
      setWinner(null);
    };

    initializeGame();
  }, [selectedAnimals, numPlayers]);

  const handleCardClick = (index) => {
    if (cards[index].isFlipped || cards[index].isMatched || flippedCards.length === 2) return;

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);
    setFlippedCards([...flippedCards, newCards[index]]);
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstCard, secondCard] = flippedCards;
      if (firstCard.animal === secondCard.animal) {
        const newCards = cards.map(card =>
          card.animal === firstCard.animal ? { ...card, isMatched: true } : card
        );
        setCards(newCards);
        setFlippedCards([]);
        setMatches(prev => ({ ...prev, [`player${turn}`]: prev[`player${turn}`] + 1 }));

        const newConfettiInstance = { id: Date.now() };
        setConfettiInstances(prev => [...prev, newConfettiInstance]);

        setTimeout(() => {
          setConfettiInstances(prev => prev.filter(instance => instance.id !== newConfettiInstance.id));
        }, 4000);
      } else {
        setTimeout(() => {
          const newCards = cards.map(card =>
            flippedCards.includes(card) ? { ...card, isFlipped: false } : card
          );
          setCards(newCards);
          setFlippedCards([]);
          setTurn(turn === numPlayers ? 1 : turn + 1);
        }, 1000);
      }
    }
  }, [flippedCards, cards, turn, numPlayers]);

  useEffect(() => {
    if (gameStarted && cards.every(card => card.isMatched)) {
      setGameEnded(true);
      const scores = Object.entries(matches);
      const maxScore = Math.max(...scores.map(([_, score]) => score));
      const winners = scores.filter(([_, score]) => score === maxScore);

      if (winners.length > 1) {
        setWinner("It's a tie!");
      } else {
        setWinner(`Player ${winners[0][0].replace('player', '')} wins!`);
      }
    }
  }, [cards, gameStarted, matches]);

  const handleReplay = () => {
    const shuffledCards = [...selectedAnimals, ...selectedAnimals]
      .sort(() => Math.random() - 0.5)
      .map((animal, index) => ({ id: index, animal, isFlipped: false, isMatched: false }));
    setCards(shuffledCards);
    setFlippedCards([]);
    const initialMatches = {};
    for (let i = 1; i <= numPlayers; i++) {
      initialMatches[`player${i}`] = 0;
    }
    setMatches(initialMatches);
    setTurn(1);
    setGameEnded(false);
    setWinner(null);
  };

  const calculateCardSize = () => {
    const numCards = cards.length;
    const numCols = 4; // Fixed number of columns
    const numRows = Math.ceil(numCards / numCols);

    const headerHeight = 50; // Estimated height for header
    const footerHeight = 80; // Estimated height for footer

    const availableHeight = window.innerHeight - headerHeight - footerHeight; // 32px for padding
    const availableWidth = width - 32; // 32px for padding

    const cardWidth = Math.min(availableWidth / numCols - 8, 130);
    const cardHeight = Math.min(availableHeight / numRows - 8, 130);

    return {
      width: `${Math.floor(cardWidth)}px`,
      height: `${Math.floor(cardHeight)}px`,
    };
  };

  const cardSize = calculateCardSize();

  return (
    <div className="flex flex-col h-screen dark:bg-gray-800 overflow-hidden">
      <div className="flex-shrink-0 pt-4 px-4">
        <h1 className="text-white text-center text-3xl mb-4">
          {gameEnded ? winner : `Player ${turn}'s Turn`}
        </h1>
        <div className="flex flex-wrap justify-between text-white text-xl">
          {Object.entries(matches).map(([player, score]) => (
            <div key={player} className="mr-2">{`Player ${player.replace('player', '')}: ${score}`}</div>
          ))}
        </div>
      </div>
      <div className="flex-grow flex items-center justify-center overflow-auto px-4 pb-16">
        <div className="grid grid-cols-4 gap-2 max-w-full max-h-full">
          {cards.map((card, index) => (
            <Card
              key={card.id}
              animal={card.animal}
              isFlipped={card.isFlipped || card.isMatched}
              onClick={() => handleCardClick(index)}
              cardSize={cardSize}
              colorScheme={colorScheme}
            />
          ))}
        </div>
      </div>
      {showWinScreen && (
        <div className="absolute inset-0 bg-gray-800 bg-opacity-90 flex flex-col items-center justify-center z-10">
          <h2 className="text-white text-5xl mb-8">{winner}</h2>
          <div className="text-white text-xl mb-8">
          {Object.entries(matches).map(([player, score]) => (
            <div key={player} className="mr-2">{`Player ${player.replace('player', '')} Matchys: ${score}`}</div>
          ))}
          </div>
          <div className="flex space-x-4">
            <button className={`bg-gradient-to-r ${colorScheme} text-white px-6 py-2 rounded`} onClick={handleReplay}>Replay</button>
            <button className={`bg-gradient-to-r ${colorScheme} text-white px-6 py-2 rounded`} onClick={onNewSelection}>Start Over</button>
          </div>
        </div>
      )}
      {confettiInstances.map(instance => (
        <Confetti
          key={instance.id}
          width={width}
          height={height}
          numberOfPieces={400}
          recycle={false}
          gravity={0.3}
        />
      ))}
    </div>
  );
};

export default GameBoard;