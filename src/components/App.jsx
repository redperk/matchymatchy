import React, { useState } from 'react';
import GameBoard from './GameBoard';
import AnimalSelection from './AnimalSelection';

const App = () => {
  const [selectedAnimals, setSelectedAnimals] = useState([]);

  const handleSelectionSubmit = (animals) => {
    setSelectedAnimals(animals);
  };

  return (
    <div className="min-h-screen dark:bg-gray-800">
      {selectedAnimals.length === 0 ? (
        <AnimalSelection onSubmit={handleSelectionSubmit} />
      ) : (
        <GameBoard selectedAnimals={selectedAnimals} onNewSelection={() => setSelectedAnimals([])} />
      )}
    </div>
  );
};

export default App;