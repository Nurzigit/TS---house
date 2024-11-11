import React from 'react';
import { Link } from 'react-router-dom';
import "./styles/style.css"
const WelcomePage = () => {
  return (
    <div className={'welcomePage'}>
      <div className={'Darkness'}></div>
      <h1 className={'welcomePage_h1'}>Добро пожаловать!</h1>
      <Link to="/login"><button className={'welcomePage_button'}>Войти</button></Link>
      <p className={'welcomePage_p'}>Нет аккаунта? <Link to="/register">Зарегистрироваться</Link></p>
    </div>
  );
};

export default WelcomePage;
