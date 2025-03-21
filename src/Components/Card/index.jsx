import React from "react";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import "./styles/style.css";

const Card = ({ card, onFavorite, onDetails }) => {
  
  console.log(card);
  const isFavorite = card.isFavorite; 

  return (
    <div className="card">
      <div className="card_img">
      <span onClick={() => onFavorite(card._id)}>
          {isFavorite ? (
            <FavoriteRoundedIcon color="error" />
          ) : (
            <FavoriteBorderRoundedIcon />
          )}
        </span>
        {card.isTop && <div className="card_img--top">TOP</div>}
        {card.isPremium && <div className="card_img--premium">Premium</div>}
        {card.images ? (
          <img src={`http://localhost:8000${card.images[0]}`} alt={card.title} />
        ) : (
          <>Нет изображения</>
        )}
      </div>
      <div className="card_body">
        <div className="card_body--title">
          <h3>{card.title}</h3>
          <p>{new Date(card.date).toLocaleDateString()}</p>
          <p>{new Date(card.date.time).toLocaleDateString()}</p>
        </div>
        <div className="card_body--btns">
          <button
            className="card_body--btns-more"
            onClick={() => onDetails(card._id)}
          >
            Подробнее
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
