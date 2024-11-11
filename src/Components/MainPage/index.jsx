import React, { useEffect, useState } from "react";
import { Header } from "../Header";
import { Footer } from "../Footer";
import "./style.css"

const MainPage = ({ user }) => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      const response = await fetch("http://localhost:8000/api/cards/all");
      const data = await response.json();
      setCards(data);
    };

    fetchCards();
  }, []);

  const handleFavoriteToggle = async (cardId) => {
    const response = await fetch(
      `http://localhost:8000/api/cards/favorite/${cardId}`,
      {
        method: "PUT",
      }
    );
    if (response.ok) {
      setCards(
        cards.map((card) =>
          card._id === cardId ? { ...card, isFavorite: !card.isFavorite } : card
        )
      );
    }
  };

  return (
    <div className="main-page">
      <Header user={user} />
 
      <main>
        <h1>Добро пожаловать, {user.nickname}!</h1>

        <div className="cards">
          {cards.map((card) => (
            <div key={card._id} className="card">
              <img src={card.image} alt={card.title} />
              <h3>{card.title}</h3>
              <p>{new Date(card.date).toLocaleString()}</p>
              <button onClick={() => handleFavoriteToggle(card._id)}>
                {card.isFavorite ? "Unfavorite" : "Favorite"}
              </button>
              <button onClick={() => alert(`Description: ${card.description}`)}>
                Подробнее
              </button>
            </div>
          ))}
        </div>
      </main>

      <Footer user={user} />

      <script src="three.r134.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.birds.min.js"></script>
      <script src="./vanta/index.js"></script>
      
    </div>
  );
};

export default MainPage;
