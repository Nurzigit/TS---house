import React, { useEffect, useState } from "react";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { Loader } from "../Loader";
import Card from "../Card";
import AdditionalHeader from "../AdditionalHeader";
import "./styles/style.css";

const MainPage = ({ user }) => {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      setIsLoading(true); 
      try {
        const response = await fetch("http://localhost:8000/api/cards/all");
        const data = await response.json();
        setCards(data);
      } catch (error) {
        console.error("Ошибка при загрузке карточек:", error);
      } finally {
        setIsLoading(false);
      }
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
      {isLoading && <Loader />}
      <div className="main-page_header">
        <Header user={user} />
      </div>

      <div className="main">
        <AdditionalHeader user={user} />
        <main>
          <h1 className="main__text">Все объявление:</h1>

          <div className="cards">
           
              <div className="cards__all">
                {cards.map((card) => (
                  <Card
                    key={card._id}
                    card={card}
                    onFavorite={handleFavoriteToggle}
                    user={user}
                  />
                ))}
              </div>
          
          </div>
          <Footer user={user} />
        </main>
      </div>
    </div>
  );
};

export default MainPage;
