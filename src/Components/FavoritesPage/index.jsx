import React, { useEffect, useState } from 'react';

const FavoritesPage = ({ user }) => {
  const [favoriteCards, setFavoriteCards] = useState([]);

  useEffect(() => {
    const fetchFavoriteCards = async () => {
      const response = await fetch('http://localhost:8000/api/cards/all');
      const data = await response.json();
      const userFavorites = data.filter(card => card.isFavorite && card.userId === user._id);
      setFavoriteCards(userFavorites);
    };

    fetchFavoriteCards();
  }, [user]);

  return (
    <div className="favorites-page">
      <header>
        <h1>Избранные карточки</h1>
      </header>
      <div className="cards">
        {favoriteCards.map((card) => (
          <div key={card._id} className="card">
            <img src={card.image} alt={card.title} />
            <h3>{card.title}</h3>
            <p>{new Date(card.date).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
