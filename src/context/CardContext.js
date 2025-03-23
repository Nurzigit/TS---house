import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const CardContext = createContext();

export const CardProvider = ({ children }) => {
  const { id } = useParams();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRating, setUserRating] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/cards/${id}`)
      .then((response) => {
        setCard(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Ошибка загрузки данных", error);
        setError("Ошибка загрузки данных");
        setLoading(false);
      });

    // Увеличение просмотров
    axios.patch(`http://localhost:8000/api/cards/${id}/view`).catch((error) => {
      console.error("Ошибка увеличения просмотров", error);
    });
  }, [id]);

  // Функция для лайка
  const toggleLike = () => {
    axios
      .patch(`http://localhost:8000/api/cards/${id}/like`)
      .then((response) => setCard(response.data))
      .catch((error) => console.error("Ошибка лайка", error));
  };

  // Функция для установки рейтинга
  const setRating = (newRating) => {
    axios
      .patch(`http://localhost:8000/api/cards/${id}/rate`, { rating: newRating })
      .then((response) => {
        setCard(response.data);
        setUserRating(newRating);
      })
      .catch((error) => console.error("Ошибка установки рейтинга", error));
  };

  // Функция для Premium (только для Админа)
  const togglePremium = () => {
    axios
      .patch(`http://localhost:8000/api/cards/${id}`, { isPremium: !card.isPremium })
      .then((response) => setCard(response.data))
      .catch((error) => console.error("Ошибка обновления Premium", error));
  };

  return (
    <CardContext.Provider value={{ card, loading, error, userRating, toggleLike, setRating, togglePremium }}>
      {children}
    </CardContext.Provider>
  );
};

// Хук для использования контекста
export const useCard = () => {
  return useContext(CardContext);
};
