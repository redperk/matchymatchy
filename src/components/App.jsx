import React, { useState } from 'react';
import AnimalSelection from './AnimalSelection';
import GameBoard from './GameBoard';
import Settings from './Settings';

const App = () => {
  const [selectedAnimals, setSelectedAnimals] = useState([]);
  const [numPlayers, setNumPlayers] = useState(2);
  const [gameStarted, setGameStarted] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const handleAnimalSelectionSubmit = (animals) => {
    setSelectedAnimals(animals);
    setGameStarted(true);
  };

  const handleNewSelection = () => {
    setGameStarted(false);
  };

  const handleOpenSettings = () => {
    setShowSettings(true);
  };

  const handleCloseSettings = () => {
    setShowSettings(false);
  };

  return (
    <div>
      {showSettings ? (
        <Settings onClose={handleCloseSettings} numPlayers={numPlayers} setNumPlayers={setNumPlayers} />
      ) : !gameStarted ? (
        <AnimalSelection onSubmit={handleAnimalSelectionSubmit} onOpenSettings={handleOpenSettings} />
      ) : (
        <GameBoard selectedAnimals={selectedAnimals} numPlayers={numPlayers} onNewSelection={handleNewSelection} />
      )}
    </div>
  );
};

export default App;