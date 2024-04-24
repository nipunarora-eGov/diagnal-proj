import React from "react"

export const Card = ({ cardData }) => {
    return (
        <div className='card'>
            <img src={cardData.imageUrl} alt={cardData.name} width={50} loading='lazy' />
            <p>{cardData.name}</p>
        </div>
    )
}