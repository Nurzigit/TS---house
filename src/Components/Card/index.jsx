import React from 'react';

const Card = ({ card, onFavorite, onDetails, user }) => {
  const isFavorite = card.isFavorite === true// Проверка для конкретного пользователя

  return (
    <div className="card">
      <img src={card.image} alt={card.title} />
      <h3>{card.title}</h3>
      <p>{new Date(card.date).toLocaleDateString()}</p>
      <button onClick={() => onFavorite(card._id)}>
        {isFavorite ? 'Unfavorite' : 'Favorite'}
      </button>
      <button onClick={() => onDetails(card._id)}>Подробнее</button>
    </div>
  );
};


export default Card;