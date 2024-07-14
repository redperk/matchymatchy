import React from 'react';

const Settings = ({ onClose, numPlayers, setNumPlayers }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen dark:bg-gray-800 p-4">
      <h1 className="text-white text-4xl mb-4">Settings</h1>
      <div className="mb-4">
        <h2 className="text-white text-2xl mb-2">How many players?</h2>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((n) => (
            <button
              key={n}
              className={`bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded ${numPlayers === n ? 'border border-white' : ''}`}
              onClick={() => setNumPlayers(n)}
            >
              {n} Player{n > 1 ? 's' : ''}
            </button>
          ))}
        </div>
      </div>
      <button
        className="bg-gradient-to-r from-blue-500 to-purple-500 text-white mt-4 px-10 py-4 rounded"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
};

export default Settings;