import React, { useState } from 'react';
import { colorSchemes, genres } from '../utils/constants';

const SettingsPage = ({
  onClose,
  onSelectPlayers,
  onSelectGenre,
  onUpdatePlayerColorScheme,
  selectedPlayers,
  selectedGenre,
  selectedColorScheme,
  playerColorSchemes,
  onGenerateRandomEmojis,
}) => {
  const [currentPlayers, setCurrentPlayers] = useState(selectedPlayers);
  const [currentGenre, setCurrentGenre] = useState(selectedGenre);
  const [currentColorScheme, setCurrentColorScheme] = useState(selectedColorScheme);

  const handlePlayerSelection = (players) => {
    setCurrentPlayers(players);
    onSelectPlayers(players);
    if (Object.keys(playerColorSchemes).length === players) return

    for (let i = 1; i <= players; i++) {
      if (!Object.keys(playerColorSchemes).includes(`player${i}`)) {
        onUpdatePlayerColorScheme(`player${i}`, colorSchemes[0]);
      }
    }
  };

  const handleGenreSelection = (genre) => {
    const genreText = genre.split(' ').slice(1).join(' ').toLowerCase();
    setCurrentGenre(genreText);
    onSelectGenre(genreText);

    if (genreText === 'rando') {
      onGenerateRandomEmojis();
    }
  };

  const handlePlayerColorSchemeSelection = (player, colorScheme) => {
    if (player === 1) {
      setCurrentColorScheme(colorScheme);
    }
    onUpdatePlayerColorScheme(`player${player}`, colorScheme);
  };

  const correctColor = (player, colorScheme) => {
    return playerColorSchemes[player] === colorScheme || (!Object.keys(playerColorSchemes).includes(player) && colorScheme === colorSchemes[0]);
  };

  return (
    <div className="flex flex-col h-screen dark:bg-gray-800 overflow-hidden">
      <div className="flex-grow overflow-auto px-6 pb-32">
        <h1 className="text-white text-4xl p-6 text-center">Settings</h1>
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
            <h2 className="text-white text-2xl mb-4">Player Color Schemes</h2>
            {[...Array(currentPlayers).keys()].map((i) => (
              <div key={i + 1} className="flex flex-col mb-4">
                <span className="text-white text-lg mb-2">Player {i + 1}</span>
                <div className="grid grid-cols-3 gap-4">
                  {colorSchemes.map((colorScheme) => (
                    <button
                      key={colorScheme}
                      className={`bg-gradient-to-r ${colorScheme.includes('bg-') ? colorScheme : ''} ${colorScheme.includes('to-') ? colorScheme : ''} text-white h-12 rounded-full ${correctColor(`player${i + 1}`, colorScheme) ? 'border border-white' : ''}`}
                      onClick={() => handlePlayerColorSchemeSelection(i + 1, colorScheme)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="fixed bottom-[env(safe-area-inset-bottom)] bg-gray-800 p-4 w-full">
        <button
          className={`bg-gradient-to-r ${currentColorScheme} text-white px-10 py-4 rounded block mx-auto w-full max-w-lg`}
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;