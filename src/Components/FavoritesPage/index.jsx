import React, { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "../Header";
import { Footer } from "../Footer";
import Card from "../Card";
import AdditionalHeader from "../AdditionalHeader";
import "./styles/style.css"


const FavoritesPage = ({ user }) => {
  const [favoriteCards, setFavoriteCards] = useState([]);

  useEffect(() => {
    const fetchFavoriteCards = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/cards/${user._id}/favorites`);
        setFavoriteCards(response.data); // Загружаем только избранные карточки
      } catch (error) {
        console.error("Ошибка при загрузке избранных карточек:", error);
      }
    };
  
    fetchFavoriteCards();
  }, [user]);

  const handleFavorite = async (cardId) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/cards/favorite/${cardId}`
      );
      console.log(response);
      // Обновляем избранные карточки на клиенте
      setFavoriteCards(
        (prevFavorites) => prevFavorites.filter((card) => card._id !== cardId) // Убираем или добавляем карточку в список
      );
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  };

  return (
    <div className="favorites-page">
      <div className="favorites-page-header">
        <Header user={user} />
      </div>

      <div className="favorites-page-cards">
      <AdditionalHeader user={user} />
      <h1>Избранные:</h1>
        <div className="cards">
          {favoriteCards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onFavorite={handleFavorite}
              user={user}
            />
          ))}
        </div>
        <Footer user={user} />
      </div>
    </div>
  );
};

export default FavoritesPage;
