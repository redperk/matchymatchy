import React, { useState } from 'react';
import { FaCog } from 'react-icons/fa';
import EmojiSelection from './EmojiSelection';
import GameBoard from './GameBoard';
import SettingsPage from './SettingsPage';

const initialGenres = {
  animals: ['🐅', '🐻', '🐼', '🦊', '🦄', '🫎', '🐖', '🐊', '🦒', '🦏', '🦈', '🐡', '🐕', '🐈', '🐉', '🐒'],
  plants: ['🌲', '🌳', '🌴', '🌵', '🌿', '🍀', '🍁', '🍂', '🍃', '🌺', '🌻', '🌼', '🌷', '🌸', '💐', '🍄'],
  faces: ['😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😎', '😍', '😘', '🥰', '😗'],
  clocks: ['🕐', '🕑', '🕒', '🕓', '🕔', '🕕', '🕖', '🕗', '🕘', '🕙', '🕚', '🕛', '🕜', '🕝', '🕞', '🕟'],
  desserts: ['🍰', '🍦', '🍧', '🍨', '🍩', '🍪', '🎂', '🍫', '🍬', '🍭', '🍮', '🍯', '🥧', '🧁', '🍡', '🥠'],
  bugs: ['🐜', '🐞', '🦗', '🕷️', '🦂', '🐛', '🦋', '🐝', '🪲', '🪳', '🪰', '🪱', '🦟', '🐌', '🕸️', '🦀'],
  weather: ['☀️', '🌤️', '⛅', '🌥️', '🌦️', '🌧️', '🌨️', '☁️', '🌩️', '🌪️', '🌈', '☔', '❄️', '💧', '💨', '⚡'],
  sports: ['⚽', '🏀', '🏈', '⚾', '🎾', '🏐', '🏉', '🎳', '🏓', '🏸', '🏒', '🏑', '🥍', '🥌', '⛳', '🎿'],
  transport: ['🛴', '🚲', '🏍️', '🏎️', '🎠', '🚙', '🚂', '🚁', '⛵', '🎡', '🛩️', '🚀', '🛶', '🛸', '🎢', '🚠'],
};

const App = () => {
  const [selectedEmojis, setSelectedEmojis] = useState([]);
  const [numPlayers, setNumPlayers] = useState(2); // Default to 2 players
  const [selectedGenre, setSelectedGenre] = useState('animals'); // Default to animals
  const [selectedColorScheme, setSelectedColorScheme] = useState('from-blue-500 to-purple-500'); // Default color scheme
  const [showSettings, setShowSettings] = useState(false);
  const [inGame, setInGame] = useState(false);
  const [genres, setGenres] = useState(initialGenres);
  const [playerColorSchemes, setPlayerColorSchemes] = useState({ player1: 'from-blue-500 to-purple-500', player2: 'from-blue-500 to-purple-500' });


  const handleEmojiSelection = (emojis) => {
    setSelectedEmojis(emojis);
    if (emojis.length > 0) {
      setInGame(true);
    }
  };

  const handleNewSelection = () => {
    setSelectedEmojis([]);
    setInGame(false);
  };

  const handleSettingsClose = () => {
    setShowSettings(false);
  };

  const handleGenerateRandomEmojis = () => {
    const rando = generateRandomEmojis(16);
    setGenres({ ...genres, rando, });
  };

  const handleUpdatePlayerColorScheme = (player, colorScheme) => {
    setPlayerColorSchemes((prev) => ({ ...prev, [player]: colorScheme }));
    if(player === 'player1') {
      setSelectedColorScheme(colorScheme);
    }
  };

  const generateRandomEmojis = (num) => {
    const allEmojis = Object.values(initialGenres).flat();
    const randomEmojis = new Set();

    while (randomEmojis.size < num) {
      const randomIndex = Math.floor(Math.random() * allEmojis.length);
      randomEmojis.add(allEmojis[randomIndex]);
    }

    return Array.from(randomEmojis);
  };

  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-800">
      {showSettings ? (
        <SettingsPage
          onClose={handleSettingsClose}
          onSelectPlayers={setNumPlayers}
          onSelectGenre={setSelectedGenre}
          onUpdatePlayerColorScheme={handleUpdatePlayerColorScheme}
          selectedPlayers={numPlayers}
          selectedGenre={selectedGenre}
          selectedColorScheme={selectedColorScheme}
          playerColorSchemes={playerColorSchemes}
          onGenerateRandomEmojis={handleGenerateRandomEmojis}
        />
      ) : selectedEmojis.length === 0 ? (
        <EmojiSelection
          onSubmit={handleEmojiSelection}
          selectedGenre={selectedGenre}
          colorScheme={selectedColorScheme}
          genres={genres}
        />
      ) : (
        <GameBoard
          selectedEmojis={selectedEmojis}
          numPlayers={numPlayers}
          onNewSelection={handleNewSelection}
          colorScheme={selectedColorScheme}
          playerColorSchemes={playerColorSchemes}
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