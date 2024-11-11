import React, { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "../Header";
import { Footer } from "../Footer";
import Card from "../Card";

// const FavoritesPage = ({ user }) => {
//   const [favoriteCards, setFavoriteCards] = useState([]);

//   useEffect(() => {
//     // Получение всех карточек с API
//     const fetchFavoriteCards = async () => {
//       const response = await axios.get("http://localhost:8000/api/cards/all");
//       const userFavorites = response.data.filter(
//         (card) => card.isFavorite === true
//       );
//       console.log(response.data.filter((card) => card.isFavorite === true
//       ));
//       console.log("Card userId:", response.data.map(card => card.userId));
//       console.log(user._id)
//       setFavoriteCards(userFavorites);
//     };

//     fetchFavoriteCards();
    
//   }, [user]);

//   const handleFavorite = (cardId) => {
//     setFavoriteCards((prevFavorites) =>
//       prevFavorites.map((card) =>
//         card._id === cardId ? { ...card, isFavorite: !card.isFavorite } : card
//       )
//     );
//   };

  
//   return (
//     <div className="favorites-page">
//       <Header user={user} />
//       <div className="cards">
//         {favoriteCards.map((card) => (
//           <Card
//             key={card._id}
//             card={card}
//             onFavorite={handleFavorite}
//             user={user}
//           />
//         ))}
//       </div>
//       <Footer user={user} />
//     </div>
//   );
// };


const FavoritesPage = ({ user }) => {
  const [favoriteCards, setFavoriteCards] = useState([]);

  useEffect(() => {
    const fetchFavoriteCards = async () => {
      const response = await fetch("http://localhost:8000/api/cards/all");
      const userFavorites = response.data.filter(
        (card) => card.isFavorite === true // Фильтрация по конкретному пользователю
      );

      console.log(response.data.map(arr => arr.userId))
      setFavoriteCards(userFavorites);
    };

    fetchFavoriteCards();
  }, [user]);

  const handleFavorite = async (cardId) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/cards/favorite/${cardId}`);
      console.log(response)
      // Обновляем избранные карточки на клиенте
      setFavoriteCards((prevFavorites) =>
        prevFavorites.filter((card) => card._id !== cardId) // Убираем или добавляем карточку в список
      );
    } catch (error) {
      console.error('Error updating favorite status:', error);
    }
  };



  return (
    <div className="favorites-page">
      <Header user={user} />
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
  );
};

export default FavoritesPage;
