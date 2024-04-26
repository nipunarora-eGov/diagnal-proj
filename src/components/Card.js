import React from 'react';

export const Card = ({ cardData }) => {
  return (
    <div className='card-container'>
      <div className="card">
        <img
          src={cardData.imageUrl}
          alt={cardData.name}
          width={50}
          loading="lazy"
        />
      </div>
      <p>{cardData.name}</p>
    </div>
  );
};
