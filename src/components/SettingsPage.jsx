import React, { useState, useEffect } from 'react';

const SettingsPage = ({ onClose, onSelectPlayers, onSelectGenre, selectedPlayers, selectedGenre }) => {
  const [currentPlayers, setCurrentPlayers] = useState(selectedPlayers);
  const [currentGenre, setCurrentGenre] = useState(selectedGenre);

  useEffect(() => {
    setCurrentPlayers(selectedPlayers);
  }, [selectedPlayers]);

  useEffect(() => {
    setCurrentGenre(selectedGenre);
  }, [selectedGenre]);

  const handlePlayerSelection = (players) => {
    setCurrentPlayers(players);
    onSelectPlayers(players);
  };

  const handleGenreSelection = (genre) => {
    setCurrentGenre(genre);
    onSelectGenre(genre);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen dark:bg-gray-800 p-6">
      <h1 className="text-white text-4xl mb-6">Settings</h1>

      <div className="mb-8 w-full max-w-md">
        <h2 className="text-white text-2xl mb-4 text-center">Number of Players</h2>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((num) => (
            <button
              key={num}
              className={`bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded ${currentPlayers === num ? 'border border-white' : ''}`}
              onClick={() => handlePlayerSelection(num)}
            >
              {num} Player{num > 1 ? 's' : ''}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8 w-full max-w-md">
        <h2 className="text-white text-2xl mb-4 text-center">Select Genre</h2>
        <div className="grid grid-cols-2 gap-4">
          {['animals', 'plants', 'faces', 'clocks', 'desserts'].map((genre) => (
            <button
              key={genre}
              className={`bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded ${currentGenre === genre ? 'border border-white' : ''}`}
              onClick={() => handleGenreSelection(genre)}
            >
              {genre.charAt(0).toUpperCase() + genre.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <button
        className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-10 py-4 rounded mt-4"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
};

export default SettingsPage;