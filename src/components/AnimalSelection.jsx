import React, { useState } from 'react';

const AnimalSelection = ({ onSubmit }) => {
  const [selectedAnimals, setSelectedAnimals] = useState([]);
  const animals = ['🐅', '🐻', '🐼', '🦊', '🦄', '🫎', '🐖', '🐊', '🦒', '🦏', '🦈', '🐡'];

  const handleAnimalClick = (animal) => {
    setSelectedAnimals((prev) => {
      if (prev.includes(animal)) {
        return prev.filter((a) => a !== animal);
      }
      return [...prev, animal];
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen dark:bg-gray-800">
      <h1 className="text-white text-3xl mb-4">Select Animals</h1>
      <div className="grid grid-cols-4 gap-4 mb-4">
        {animals.map((animal) => (
          <button
            key={animal}
            className={`w-16 h-16 text-6xl ${selectedAnimals.includes(animal) ? 'bg-blue-400' : 'bg-gray-200'} rounded`}
            onClick={() => handleAnimalClick(animal)}
          >
            {animal}
          </button>
        ))}
      </div>
      <button
        className="bg-gradient-to-r from-blue-500 to-purple-500 text-white mt-4 px-10 py-4 rounded"
        onClick={() => onSubmit(selectedAnimals)}
      >
        Submit
      </button>
    </div>
  );
};

export default AnimalSelection;