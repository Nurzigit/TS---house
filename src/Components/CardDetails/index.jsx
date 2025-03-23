import { useCard } from "../../context/CardContext";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { Link } from "react-router-dom";
import { Loader } from "../Loader";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";

const CardDetails = ({ user }) => {
  const {
    card,
    loading,
    error,
    userRating,
    toggleLike,
    setRating,
    togglePremium,
  } = useCard();

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <div className="card-details">
      <Link to="/main">На главную</Link>
      <h2>{card.title}</h2>
      <p>
        <strong>Цена:</strong> {card.price}₸
      </p>
      <p>
        <strong>Описание:</strong> {card.description}
      </p>
      <p>
        <strong>Просмотры:</strong> {card.views}
      </p>

      {/* Кнопка лайка */}
      <button onClick={toggleLike} className="like-btn">
        {card.isFavorite ? (
          <FavoriteRoundedIcon color="error" />
        ) : (
          <FavoriteBorderRoundedIcon />
        )}
      </button>
      <span>{card.likes} лайков</span>

      {/* Рейтинг */}
      <div className="rating">
        <p>
          <strong>Рейтинг:</strong> {card.rating.toFixed(1)} ⭐
        </p>
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            onClick={() => setRating(num)}
            className={userRating === num ? "active" : ""}
          >
            {num}⭐
          </button>
        ))}
      </div>

      <div className="card-details__images">
        {card.images.map((img, index) => (
          <img
            key={index}
            src={`http://localhost:8000${img}`}
            alt="Card"
            style={{ width: "200px", margin: "5px" }}
          />
        ))}
      </div>

      {card.location && (
        <YMaps>
          <Map
            defaultState={{
              center: card.location.coordinates,
              zoom: 10,
            }}
            width="100%"
            height="300px"
          >
            <Placemark
              geometry={card.location.coordinates}
              properties={{ hintContent: card.location.address }}
            />
          </Map>
        </YMaps>
      )}

      {user.role === "admin" && (
        <button onClick={togglePremium}>
          {card.isPremium ? "Убрать из Premium" : "Сделать Premium"}
        </button>
      )}
    </div>
  );
};

export default CardDetails;
