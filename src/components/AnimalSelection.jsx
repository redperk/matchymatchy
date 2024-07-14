import React, { useState, useEffect } from 'react';
import { useWindowSize } from 'react-use';
import { FaCog } from 'react-icons/fa';

const AnimalSelection = ({ onSubmit, onOpenSettings }) => {
  const [selectedAnimals, setSelectedAnimals] = useState([]);
  const animals = ['🐅', '🐻', '🐼', '🦊', '🦄', '🫎', '🐖', '🐊', '🦒', '🦏', '🦈', '🐡', '🐕', '🐈', '🐉', '🐒'];
  const { width, height } = useWindowSize();
  const [buttonSize, setButtonSize] = useState({ width: '64px', height: '64px', fontSize: '32px' });

  useEffect(() => {
    const calculateButtonSize = () => {
      const numCols = 4;
      const numRows = Math.ceil(animals.length / numCols);

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
  }, [width, height, animals.length]);

  const handleAnimalClick = (animal) => {
    setSelectedAnimals((prev) => {
      if (prev.includes(animal)) {
        return prev.filter((a) => a !== animal);
      }
      return [...prev, animal];
    });
  };

  const handleSelectAll = () => {
    setSelectedAnimals(animals);
  };

  const handleDeselectAll = () => {
    setSelectedAnimals([]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen dark:bg-gray-800 p-4">
      <div className="absolute top-4 right-4">
        <button onClick={onOpenSettings} className="text-white text-2xl">
          <FaCog />
        </button>
      </div>
      <h1 className="text-white text-4xl mb-4">Select Animals</h1>
      <div className="flex mb-4">
        <button
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded mr-2"
          onClick={handleSelectAll}
        >
          Select All
        </button>
        <button
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded"
          onClick={handleDeselectAll}
        >
          Deselect All
        </button>
      </div>
      <div className="grid grid-cols-4 gap-4 mb-4">
        {animals.map((animal) => (
          <button
            key={animal}
            className={`flex items-center justify-center rounded ${selectedAnimals.includes(animal) ? 'bg-blue-400' : 'bg-gray-200'}`}
            onClick={() => handleAnimalClick(animal)}
            style={{ width: buttonSize.width, height: buttonSize.height, fontSize: buttonSize.fontSize }}
          >
            {animal}
          </button>
        ))}
      </div>
      <button
        className="bg-gradient-to-r from-blue-500 to-purple-500 text-white mt-4 px-10 py-4 rounded"
        onClick={() => onSubmit(selectedAnimals)}
      >
        Start
      </button>
    </div>
  );
};

export default AnimalSelection;