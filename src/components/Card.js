import React, { useState } from 'react';
import { Img } from './Img';

const maxChar = 25;

export const Card = ({ cardData, handleError }) => {
  const [isBroken, setIsBroken] = useState(false);
  return (
    <div className="card-container">
      <div className="card">
        <Img
          src={cardData.imageUrl}
          alt={cardData.name}
          width={50}
          loading="lazy"
          isBroken={isBroken}
          setIsBroken={setIsBroken}
          // onError={}
          fallback={
            <img
              src={
                'https://test.create.diagnal.com/images/placeholder_for_missing_posters.png'
              }
              width={50}
              loading="lazy"
            ></img>
          }
        />
      </div>
      {!isBroken ? (
        <p className="long-text">
          {cardData.name.length > maxChar
            ? cardData.name.slice(0, maxChar) + '...'
            : cardData.name}
        </p>
      ) : (
        <p>{'🚧 Image not found 🚧'}</p>
      )}
    </div>
  );
};
