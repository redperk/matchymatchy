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
  const headerRef = useRef(null);
  const footerRef = useRef(null);

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
      const winner = Object.entries(matches).reduce((max, player) => (player[1] > max[1] ? player : max));
      setWinner(winner[1] > 0 ? `Player ${winner[0].replace('player', '')} wins!` : "It's a tie!");
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
          <Card key={card.id} animal={card.animal} isFlipped={card.isFlipped || card.isMatched} onClick={() => handleCardClick(index)} cardSize={cardSize} colorScheme={colorScheme} />
        ))}
      </div>
      <div className="mt-4 text-white text-center" ref={footerRef}>
        {Object.entries(matches).map(([player, score]) => (
          <div key={player}>{`Player ${player.replace('player', '')} Matchys: ${score}`}</div>
        ))}
        {gameEnded && (
          <div className="mt-8 flex flex-col items-center w-48">
            <button className={`bg-gradient-to-r ${colorScheme} text-white px-4 py-2 rounded mb-4 w-full`} onClick={handleReplay}>Replay</button>
            <button className={`bg-gradient-to-r ${colorScheme} text-white px-4 py-2 rounded w-full`} onClick={onNewSelection}>Start Over</button>
          </div>
        )}
      </div>
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