import React, { useState, useEffect, useRef } from 'react';
import Card from './Card';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const GameBoard = ({ selectedAnimals, numPlayers, onNewSelection }) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [turn, setTurn] = useState(1);
  const [matches, setMatches] = useState({});
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [confettiInstances, setConfettiInstances] = useState([]);
  const [winner, setWinner] = useState(null);

  const { width, height } = useWindowSize();
  const headerRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    const initializeGame = () => {
      const shuffledCards = [...selectedAnimals, ...selectedAnimals]
        .sort(() => Math.random() - 0.5)
        .map((animal, index) => ({ id: index, animal, isFlipped: false, isMatched: false }));
      setCards(shuffledCards);
      setFlippedCards([]);
      setMatches({});
      for (let i = 1; i <= numPlayers; i++) {
        setMatches((prev) => ({ ...prev, [`Player ${i}`]: 0 }));
      }
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
        setMatches(prev => ({ ...prev, [`Player ${turn}`]: prev[`Player ${turn}`] + 1 }));

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
          setTurn(turn === numPlayers ? 1 : turn + 1); // Cycle turns based on number of players
        }, 1000);
      }
    }
  }, [flippedCards, cards, turn, numPlayers]);

  useEffect(() => {
    if (gameStarted && cards.every(card => card.isMatched)) {
      setGameEnded(true);
      if (numPlayers === 1) {
        setWinner('You win!');
      } else {
        const playerMatches = Object.entries(matches);
        const sortedPlayers = playerMatches.sort((a, b) => b[1] - a[1]);
        const isTie = sortedPlayers.length > 1 && sortedPlayers[0][1] === sortedPlayers[1][1];
        const winner = isTie ? "It's a tie!" : `${sortedPlayers[0][0]} wins!`;
        setWinner(winner);
      }
    }
  }, [cards, gameStarted, matches, numPlayers]);

  const handleReplay = () => {
    const shuffledCards = [...selectedAnimals, ...selectedAnimals]
      .sort(() => Math.random() - 0.5)
      .map((animal, index) => ({ id: index, animal, isFlipped: false, isMatched: false }));
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatches({});
    for (let i = 1; i <= numPlayers; i++) {
      setMatches((prev) => ({ ...prev, [`Player ${i}`]: 0 }));
    }
    setTurn(1);
    setGameEnded(false);
    setWinner(null);
  };

  const constrainSize = (value, min, max) => Math.max(Math.min(value, max), min);

  const calculateCardSize = () => {
    const numCards = cards.length;
    const numCols = 4;
    const numRows = Math.ceil(numCards / numCols);

    const headerHeight = headerRef.current ? headerRef.current.clientHeight : 0;
    const footerHeight = footerRef.current ? footerRef.current.clientHeight : 0;

    const availableHeight = height - headerHeight - footerHeight - 64; // 64px for extra spacing
    const cardWidth = width / numCols - 16; // 16px for gap
    const cardHeight = availableHeight / numRows - 16; // 16px for gap

    const maxCardHeight = 130;
    const maxCardWidth = 130;
    const minCardHeight = 50;

    return {
      width: `${Math.min(cardWidth, maxCardWidth)}px`,
      height: `${constrainSize(cardHeight, minCardHeight, maxCardHeight)}px`,
    };
  };

  const cardSize = calculateCardSize();

  return (
    <div className="dark:bg-gray-800 min-h-screen flex flex-col items-center justify-center relative p-4">
      <h1 className="text-white text-3xl mb-4" ref={headerRef}>
        {gameEnded ? winner : `Player ${turn}'s Turn`}
      </h1>
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <Card key={card.id} animal={card.animal} isFlipped={card.isFlipped || card.isMatched} onClick={() => handleCardClick(index)} cardSize={cardSize} />
        ))}
      </div>
      <div className="mt-4 text-white text-center" ref={footerRef}>
        {[...Array(numPlayers)].map((_, i) => (
          <div key={i}>Player {i + 1} Matches: {matches[`Player ${i + 1}`]}</div>
        ))}
        {gameEnded && (
          <div className="mt-8 flex flex-col items-center w-48">
            <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded mb-4 w-full" onClick={handleReplay}>Replay</button>
            <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded w-full" onClick={onNewSelection}>Start Over</button>
          </div>
        )}
      </div>
      {confettiInstances.map(instance => (
        <Confetti
          key={instance.id}
          width={width}
          height={height}
          numberOfPieces={200}
          recycle={false}
          gravity={0.3}
        />
      ))}
    </div>
  );
};

export default GameBoard;