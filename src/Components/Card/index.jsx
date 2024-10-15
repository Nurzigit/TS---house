import React from 'react';

const Card = ({ card, onFavorite, onDetails }) => {
  return (
    <div className="card">
      <img src={card.image} alt={card.title} />
      <h3>{card.title}</h3>
      <p>{new Date(card.date).toLocaleDateString()}</p>
      <button onClick={() => onFavorite(card._id)}>
        {card.isFavorite ? 'Unfavorite' : 'Favorite'}
      </button>
      <button onClick={() => onDetails(card._id)}>Подробнее</button>
      <h1>csdc</h1>
    </div>
  );
};

export default Card;