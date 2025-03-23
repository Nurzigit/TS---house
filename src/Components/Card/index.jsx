import React from "react";
import { Link } from "react-router-dom";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import "./styles/style.css";


const Card = ({ card, onFavorite }) => {
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
          <img
            src={`http://localhost:8000${card.images[0]}`}
            alt={card.title}
          />
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
          <button className="card_body--btns-more">
            <Link
              to={`/card/${card._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Подробнее
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
