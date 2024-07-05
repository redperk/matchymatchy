import React, { useState, useEffect } from 'react';

const Card = ({ animal, isFlipped, onClick, cardSize }) => {
  const [showAnimal, setShowAnimal] = useState(false);

  useEffect(() => {
    let timeout;
    if (isFlipped) {
      timeout = setTimeout(() => setShowAnimal(true), 200);
    } else {
      setShowAnimal(false);
    }
    return () => clearTimeout(timeout);
  }, [isFlipped]);

  const emojiSize = Math.min(parseFloat(cardSize.width), parseFloat(cardSize.height)) * 0.8;

  return (
    <div
      className="relative perspective"
      onClick={onClick}
      style={{ width: cardSize.width, height: cardSize.height }}
    >
      <div className={`relative w-full h-full transform-style-preserve-3d transition-transform duration-500 ${isFlipped ? 'rotateY-180' : ''}`}>
        {/* Front Side */}
        <div className="absolute w-full h-full flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-500 rounded" style={{ backfaceVisibility: 'hidden' }}>
        </div>
        {/* Back Side */}
        <div className="absolute w-full h-full flex items-center justify-center bg-white rounded transform rotateY-180" style={{ backfaceVisibility: 'hidden', fontSize: `${emojiSize}px` }}>
          {showAnimal && animal}
        </div>
      </div>
    </div>
  );
};

export default Card;