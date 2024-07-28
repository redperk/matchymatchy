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
    const genreText = genre.split(' ').slice(1).join(' ').toLowerCase();
    setCurrentGenre(genreText);
    onSelectGenre(genreText);
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

  const genres = [
    { emoji: '🫎', name: 'Animals' },
    { emoji: '🌲', name: 'Plants' },
    { emoji: '😂', name: 'Faces' },
    { emoji: '🕒', name: 'Clocks' },
    { emoji: '🍦', name: 'Desserts' },
    { emoji: '🐛', name: 'Bugs' }
  ];

  return (
    <div className="flex flex-col h-screen dark:bg-gray-800 overflow-hidden">
      <div className="flex-grow overflow-auto px-6 pb-6">
        <h1 className="text-white text-4xl p-6">Settings</h1>
        <div className="max-w-md mx-auto">
          <div className="mb-8">
            <h2 className="text-white text-2xl mb-4">Number of Players</h2>
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
          <div className="mb-8">
            <h2 className="text-white text-2xl mb-4">Select Category</h2>
            <div className="grid grid-cols-2 gap-4">
            {genres.map(({ emoji, name }) => (
                <button
                  key={name}
                  className={`bg-gradient-to-r ${currentColorScheme} text-white px-4 py-4 rounded ${currentGenre === name.toLowerCase() ? 'border border-white' : ''}`}
                  onClick={() => handleGenreSelection(`${emoji} ${name}`)}
                >
                  {emoji} {name}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-8">
            <h2 className="text-white text-2xl mb-4">Color Scheme</h2>
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
          <div className="mt-8 mb-20">
            <button
              className={`bg-gradient-to-r ${currentColorScheme} text-white px-10 py-4 rounded w-full`}
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;