import React from 'react';
import { Img } from './Img';

const maxChar = 25

export const Card = ({ cardData, handleError }) => {
  console.log(cardData.name);
  return (
    <div className="card-container">
      <div className="card">
        <Img
          src={cardData.imageUrl}
          alt={cardData.name}
          width={50}
          loading="lazy"
          // onError={}
          fallback={<div>🚧 image not found 🚧</div>}
        />
      </div>
      <p className="long-text">{cardData.name.length > maxChar ? cardData.name.slice(0, maxChar) + '...': cardData.name}</p>
    </div>
  );
};
