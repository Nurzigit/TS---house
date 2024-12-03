import React from "react";
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import "./styles/style.css";

const Card = ({ card, onFavorite, onDetails, user }) => {
  const isFavorite = card.isFavorite === true; // Проверка для конкретного пользователя

  return (
    <div className="card">
      <div className="card_img">
        <img src={card.image} alt={card.title} />
      </div>
      <div className="card_body">
        <div className="card_body--title">
          <h3>{card.title}</h3>
          <p>{new Date(card.date).toLocaleDateString()}</p>
        </div>
        <div className="card_body--btns">
         
          <span onClick={() => onFavorite(card._id)}>
            {isFavorite ?  <FavoriteRoundedIcon color="error"/> : <FavoriteBorderRoundedIcon/>}
          </span>
          <button className="card_body--btns-more" onClick={() => onDetails(card._id)}>Подробнее</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
