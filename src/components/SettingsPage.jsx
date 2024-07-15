import React, { useState, useEffect } from 'react';

const SettingsPage = ({ onClose, onSelectPlayers, onSelectGenre, onSelectColorScheme, selectedPlayers, selectedGenre, selectedColorScheme }) => {
  const [currentPlayers, setCurrentPlayers] = useState(selectedPlayers);
  const [currentGenre, setCurrentGenre] = useState(selectedGenre);
  const [currentColorScheme, setCurrentColorScheme] = useState(selectedColorScheme);

  useEffect(() => {
    setCurrentPlayers(selectedPlayers);
  }, [selectedPlayers]);

  useEffect(() => {
    setCurrentGenre(selectedGenre);
  }, [selectedGenre]);

  useEffect(() => {
    setCurrentColorScheme(selectedColorScheme);
  }, [selectedColorScheme]);

  const handlePlayerSelection = (players) => {
    setCurrentPlayers(players);
    onSelectPlayers(players);
  };

  const handleGenreSelection = (genre) => {
    setCurrentGenre(genre);
    onSelectGenre(genre);
  };

  const handleColorSchemeSelection = (colorScheme) => {
    setCurrentColorScheme(colorScheme);
    onSelectColorScheme(colorScheme);
  };

  const colorSchemes = [
    'from-blue-500 to-purple-500',
    'from-green-500 to-blue-500',
    'from-blue-500 to-pink-500',
    'from-pink-500 to-orange-500',
    'from-pink-500 to-purple-500',
    'bg-green-500',
    'bg-red-500',
    'bg-yellow-500',
    'bg-blue-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-orange-500',
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen dark:bg-gray-800 p-6">
      <h1 className="text-white text-4xl mb-6">Settings</h1>

      <div className="mb-8 w-full max-w-md">
        <h2 className="text-white text-2xl mb-4 text-center">Number of Players</h2>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((num) => (
            <button
              key={num}
              className={`bg-gradient-to-r ${currentColorScheme} text-white px-4 py-4 rounded ${currentPlayers === num ? 'border border-white' : ''}`}
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
          {['animals', 'plants', 'faces', 'clocks', 'desserts', 'bugs'].map((genre) => (
            <button
              key={genre}
              className={`bg-gradient-to-r ${currentColorScheme} text-white px-4 py-4 rounded ${currentGenre === genre ? 'border border-white' : ''}`}
              onClick={() => handleGenreSelection(genre)}
            >
              {genre.charAt(0).toUpperCase() + genre.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8 w-full max-w-md">
        <h2 className="text-white text-2xl mb-4 text-center">Color Scheme</h2>
        <div className="grid grid-cols-3 gap-4">
          {colorSchemes.map((colorScheme) => (
            <button
              key={colorScheme}
              className={`bg-gradient-to-r ${colorScheme.includes('bg-') ? colorScheme : ''} ${colorScheme.includes('to-') ? colorScheme : ''} text-white h-12 rounded-full ${currentColorScheme === colorScheme ? 'border border-white' : ''}`}
              onClick={() => handleColorSchemeSelection(colorScheme)}
            />
          ))}
        </div>
      </div>

      <button
        className={`bg-gradient-to-r ${currentColorScheme} text-white px-10 py-4 rounded mt-4`}
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
};

export default SettingsPage;