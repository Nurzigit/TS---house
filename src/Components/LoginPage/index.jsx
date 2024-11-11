import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "./styles/style.css"
const LoginPage = ({setUser}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (response.ok) {
      try {
        const data = await response.json();
        localStorage.setItem('user', JSON.stringify(data.user)); 
        localStorage.setItem('token', data.token);

        
        setUser(data.user); 
        navigate('/main');
        
      } catch (error) {
        console.error("Ошибка парсинга данных:", error);
      }
    } else {
      const errorMessage = await response.text(); 
      alert(errorMessage);
    }

    
  };

  return (
    <div className={'login'}>
     <div className="login__container">
        <div className="login__image">
          {/* Вставьте изображение, используя путь к вашему файлу */}
          <img src="https://w0.peakpx.com/wallpaper/350/246/HD-wallpaper-study-motivation-just-study-and-revise-book-and-pen.jpg" alt="Login Visual" />
        </div>
        <div className="login__form">
          <form onSubmit={handleLogin}>
            <h2>Вход</h2>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <button type="submit">Войти</button>
          </form>

          <p className={'login_p'}>Нет аккаунта? <Link to="/register">Зарегистрироваться</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;


