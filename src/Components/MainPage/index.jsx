import React, { useEffect, useState } from 'react';

const MainPage = ({ user }) => {
  const [notifications, setNotifications] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

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
      </main>
    </div>
  );
};

export default MainPage;
