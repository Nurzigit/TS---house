import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <form onSubmit={handleLogin}>
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
  );
};

export default LoginPage;


