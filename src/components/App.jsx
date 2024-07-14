import React, { useState } from 'react';
import { FaCog } from 'react-icons/fa';
import EmojiSelection from './EmojiSelection';
import GameBoard from './GameBoard';
import SettingsPage from './SettingsPage';

const App = () => {
  const [selectedEmojis, setSelectedEmojis] = useState([]);
  const [numPlayers, setNumPlayers] = useState(2); // Default to 2 players
  const [selectedGenre, setSelectedGenre] = useState('animals'); // Default to animals
  const [selectedColorScheme, setSelectedColorScheme] = useState('from-blue-500 to-purple-500'); // Default color scheme
  const [showSettings, setShowSettings] = useState(false);
  const [inGame, setInGame] = useState(false);

  const handleEmojiSelection = (emojis) => {
    setSelectedEmojis(emojis);
    setInGame(true);
  };

  const handleNewSelection = () => {
    setSelectedEmojis([]);
    setInGame(false);
  };

  const handleSettingsClose = () => {
    setShowSettings(false);
  };

  return (
    <div>
      {showSettings ? (
        <SettingsPage
          onClose={handleSettingsClose}
          onSelectPlayers={setNumPlayers}
          onSelectGenre={setSelectedGenre}
          onSelectColorScheme={setSelectedColorScheme}
          selectedPlayers={numPlayers}
          selectedGenre={selectedGenre}
          selectedColorScheme={selectedColorScheme}
        />
      ) : selectedEmojis.length === 0 ? (
        <EmojiSelection onSubmit={handleEmojiSelection} selectedGenre={selectedGenre} colorScheme={selectedColorScheme} />
      ) : (
        <GameBoard
          selectedAnimals={selectedEmojis}
          numPlayers={numPlayers}
          onNewSelection={handleNewSelection}
          colorScheme={selectedColorScheme}
        />
      )}
      {!showSettings && !inGame && (
        <button
          className="absolute top-4 right-4 text-white text-2xl"
          onClick={() => setShowSettings(true)}
        >
          <FaCog />
        </button>
      )}
    </div>
  );
};

export default App;