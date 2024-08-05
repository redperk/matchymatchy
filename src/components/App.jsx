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

  const [genres, setGenres] = useState(initialGenres);

  const generateRandomEmojis = (num) => {
    const allEmojis = Object.values(genres).flat();
    const randomEmojis = new Set(); // Use a Set to ensure uniqueness

    while (randomEmojis.size < num) {
      const randomIndex = Math.floor(Math.random() * allEmojis.length);
      randomEmojis.add(allEmojis[randomIndex]); // Add emoji to the Set
    }

    return Array.from(randomEmojis); // Convert Set back to array
  };

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

  const handleGenerateRandomEmojis = () => {
    const rando = generateRandomEmojis(16);
    setGenres({ ...genres, rando, });
  };

  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-800">
      {showSettings ? (
        <SettingsPage
          onClose={handleSettingsClose}
          onSelectPlayers={setNumPlayers}
          onSelectGenre={setSelectedGenre}
          onSelectColorScheme={setSelectedColorScheme}
          selectedPlayers={numPlayers}
          selectedGenre={selectedGenre}
          selectedColorScheme={selectedColorScheme}
          onGenerateRandomEmojis={handleGenerateRandomEmojis}
        />
      ) : selectedEmojis.length === 0 ? (
        <div className="flex-grow">
          <EmojiSelection
            onSubmit={handleEmojiSelection}
            selectedGenre={selectedGenre}
            colorScheme={selectedColorScheme}
            genres={genres}
          />
        </div>
      ) : (
        <div className="flex-grow">
          <GameBoard
            selectedAnimals={selectedEmojis}
            numPlayers={numPlayers}
            onNewSelection={handleNewSelection}
            colorScheme={selectedColorScheme}
          />
        </div>
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