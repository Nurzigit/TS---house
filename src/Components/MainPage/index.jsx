import React, { useEffect, useState } from 'react';

const MainPage = ({ user }) => {
  const [notifications, setNotifications] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [cards, setCards] = useState([]);
  useEffect(() => {
    const fetchNotifications = async () => {
      setNotifications([
        'Новое сообщение от друга',
        'Обновление в вашем избранном',
        'Новое событие в сообществе'
      ]);
    };
    fetchNotifications();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  useEffect(() => {
    const fetchCards = async () => {
      const response = await fetch('http://localhost:8000/api/cards/all');
      const data = await response.json();
      setCards(data);
    };

    fetchCards();
  }, []);

  const handleFavoriteToggle = async (cardId) => {
    const response = await fetch(`http://localhost:8000/api/cards/favorite/${cardId}`, {
      method: 'PUT',
    });
    if (response.ok) {
      setCards(cards.map(card => card._id === cardId ? { ...card, isFavorite: !card.isFavorite } : card));
    }
  };


  return (
    <div className="main-page">
  
      <header>
        <nav>
          <ul>
            <li><a href="/">Домашняя страница</a></li>
            <li><a href="/favorites">Избранное</a></li>
            <li><a href="/top">Топе</a></li>
            <li><a href="/settling">Заселение</a></li>
            <li><a href="/community">Сообщество</a></li>
            {(user.role === 'admin' || user.role === 'advertiser') && (
              <li><a href="/add">Добавление</a></li>
            )}
            <li><a href="/settings">Настройки</a></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </ul>
        </nav>

        
        <div className="user-info">
          <span>Nickname: {user.nickname} {user.role}</span>

          <input 
            type="text" 
            placeholder="Поиск..." 
            className="search-bar" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)}
          />
       
          <div className="notifications">
            <span>Уведомления ({notifications.length})</span>
            <ul>
              {notifications.map((notif, index) => (
                <li key={index}>{notif}</li>
              ))}
            </ul>
          </div>
        </div>
      </header>

  
      <main>
        <h1>Добро пожаловать, {user.nickname}!</h1>


        <div className="cards">
        {cards.map((card) => (
          <div key={card._id} className="card">
            <img src={card.image} alt={card.title} />
            <h3>{card.title}</h3>
            <p>{new Date(card.date).toLocaleString()}</p>
            <button onClick={() => handleFavoriteToggle(card._id)}>
              {card.isFavorite ? 'Unfavorite' : 'Favorite'}
            </button>
            <button onClick={() => alert(`Description: ${card.description}`)}>Подробнее</button>
          </div>
        ))}
      </div>
      </main>
    </div>
  );
};

export default MainPage;
