import React, { useState, useEffect } from 'react';

const Card = ({ animal, isFlipped, onClick }) => {
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

  return (
    <div className="relative w-16 h-20 sm:w-24 sm:h-32 md:w-32 md:h-40 perspective" onClick={onClick}>
      <div className={`relative w-full h-full transform-style-preserve-3d transition-transform duration-500 ${isFlipped ? 'rotateY-180' : ''}`}>
        {/* Front Side */}
        <div className="absolute w-full h-full flex items-center justify-center text-4xl bg-gradient-to-r from-purple-500 to-indigo-500 rounded" style={{ backfaceVisibility: 'hidden' }}>
        </div>
        {/* Back Side */}
        <div className="absolute w-full h-full flex items-center justify-center text-6xl bg-white rounded transform rotateY-180" style={{ backfaceVisibility: 'hidden' }}>
          {showAnimal && animal}
        </div>
      </div>
    </div>
  );
};

export default Card;