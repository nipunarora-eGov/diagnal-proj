import React from 'react';
import { Img } from './Img';
export const Card = ({ cardData, handleError }) => {
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
      <p>{cardData.name}</p>
    </div>
  );
};
