import React, { useState, useEffect } from 'react';
import Card from './Card';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const GameBoard = ({ selectedAnimals, onNewSelection }) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [turn, setTurn] = useState(1);
  const [matches, setMatches] = useState({ player1: 0, player2: 0 });
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [confettiInstances, setConfettiInstances] = useState([]);
  const [winner, setWinner] = useState(null);

  const { width, height } = useWindowSize();

  useEffect(() => {
    const initializeGame = () => {
      const shuffledCards = [...selectedAnimals, ...selectedAnimals]
        .sort(() => Math.random() - 0.5)
        .map((animal, index) => ({ id: index, animal, isFlipped: false, isMatched: false }));
      setCards(shuffledCards);
      setFlippedCards([]);
      setMatches({ player1: 0, player2: 0 });
      setTurn(1);
      setGameEnded(false);
      setGameStarted(true);
      setWinner(null);
    };

    initializeGame();
  }, [selectedAnimals]);

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
          setTurn(turn === 1 ? 2 : 1);
        }, 1000);
      }
    }
  }, [flippedCards, cards, turn]);

  useEffect(() => {
    if (gameStarted && cards.every(card => card.isMatched)) {
      setGameEnded(true);
      const winner = matches.player1 > matches.player2 ? 'Player 1 wins!' : matches.player2 > matches.player1 ? 'Player 2 wins!' : "It's a tie!";
      setWinner(winner);
    }
  }, [cards, gameStarted, matches]);

  const handleReplay = () => {
    const shuffledCards = [...selectedAnimals, ...selectedAnimals]
      .sort(() => Math.random() - 0.5)
      .map((animal, index) => ({ id: index, animal, isFlipped: false, isMatched: false }));
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatches({ player1: 0, player2: 0 });
    setTurn(1);
    setGameEnded(false);
    setWinner(null);
  };

  return (
    <div className="dark:bg-gray-800 min-h-screen flex flex-col items-center justify-center relative p-4">
      <h1 className="text-white text-3xl mb-4">
        {gameEnded ? winner : `Player ${turn}'s Turn`}
      </h1>
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <Card key={card.id} animal={card.animal} isFlipped={card.isFlipped || card.isMatched} onClick={() => handleCardClick(index)} />
        ))}
      </div>
      <div className="mt-4 text-white text-center">
        <div>Player 1 Matches: {matches.player1}</div>
        <div>Player 2 Matches: {matches.player2}</div>
      </div>
      {gameEnded && (
        <div className="mt-8 flex flex-col items-center w-48">
          <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded mb-4 w-full" onClick={handleReplay}>Replay</button>
          <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded w-full" onClick={onNewSelection}>Start Over</button>
        </div>
      )}
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