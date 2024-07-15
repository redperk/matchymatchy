import React, { useState, useEffect } from 'react';
import { useWindowSize } from 'react-use';

const EmojiSelection = ({ onSubmit, selectedGenre, colorScheme }) => {
  const [selectedEmojis, setSelectedEmojis] = useState([]);
  const genres = {
    animals: ['🐅', '🐻', '🐼', '🦊', '🦄', '🫎', '🐖', '🐊', '🦒', '🦏', '🦈', '🐡', '🐕', '🐈', '🐉', '🐒'],
    plants: ['🌲', '🌳', '🌴', '🌵', '🌿', '🍀', '🍁', '🍂', '🍃', '🌺', '🌻', '🌼', '🌷', '🌸', '💐', '🍄'],
    faces: ['😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😎', '😍', '😘', '🥰', '😗'],
    clocks: ['🕐', '🕑', '🕒', '🕓', '🕔', '🕕', '🕖', '🕗', '🕘', '🕙', '🕚', '🕛', '🕜', '🕝', '🕞', '🕟'],
    desserts: ['🍰', '🍦', '🍧', '🍨', '🍩', '🍪', '🎂', '🍫', '🍬', '🍭', '🍮', '🍯', '🥧', '🧁', '🍡', '🥠'],
    bugs: ['🐜', '🐞', '🦗', '🕷️', '🦂', '🐛', '🦋', '🐝', '🪲', '🪳', '🪰', '🪱', '🦟', '🐌', '🕸️', '🦠']
  };

  const { width, height } = useWindowSize();
  const [buttonSize, setButtonSize] = useState({ width: '64px', height: '64px', fontSize: '32px' });

  useEffect(() => {
    const calculateButtonSize = () => {
      const numCols = 4;
      const numRows = Math.ceil(genres[selectedGenre].length / numCols);

      const availableHeight = height - 200; // Subtract space for header, footer, and margins
      const buttonWidth = width / numCols - 16; // 16px for gap
      const buttonHeight = availableHeight / numRows - 16; // 16px for gap

      const size = Math.min(buttonWidth, buttonHeight, 100); // Cap the size at 100px
      const fontSize = size * 0.8; // Increase the font size percentage
      setButtonSize({ width: `${size}px`, height: `${size}px`, fontSize: `${fontSize}px` });
    };

    calculateButtonSize();
    window.addEventListener('resize', calculateButtonSize);
    return () => window.removeEventListener('resize', calculateButtonSize);
  }, [width, height, selectedGenre]);

  const handleEmojiClick = (emoji) => {
    setSelectedEmojis((prev) => {
      if (prev.includes(emoji)) {
        return prev.filter((e) => e !== emoji);
      }
      return [...prev, emoji];
    });
  };

  const handleSelectAll = () => {
    setSelectedEmojis(genres[selectedGenre]);
  };

  const handleDeselectAll = () => {
    setSelectedEmojis([]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen dark:bg-gray-800 p-4">
      <h1 className="text-white text-4xl mb-4">Select Emojis</h1>
      <div className="flex mb-4">
        <button
          className={`bg-gradient-to-r ${colorScheme} text-white px-4 py-2 rounded mr-2`}
          onClick={handleSelectAll}
        >
          Select All
        </button>
        <button
          className={`bg-gradient-to-r ${colorScheme} text-white px-4 py-2 rounded`}
          onClick={handleDeselectAll}
        >
          Deselect All
        </button>
      </div>
      <div className="grid grid-cols-4 gap-4 mb-4">
        {genres[selectedGenre].map((emoji) => (
          <button
            key={emoji}
            className={`flex items-center justify-center rounded ${selectedEmojis.includes(emoji) ? 'bg-blue-400' : 'bg-gray-200'}`}
            onClick={() => handleEmojiClick(emoji)}
            style={{ width: buttonSize.width, height: buttonSize.height, fontSize: buttonSize.fontSize }}
          >
            {emoji}
          </button>
        ))}
      </div>
      <button
        className={`bg-gradient-to-r ${colorScheme} text-white mt-4 px-10 py-4 rounded`}
        onClick={() => onSubmit(selectedEmojis)}
      >
        Start
      </button>
    </div>
  );
};

export default EmojiSelection;