import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import WelcomePage from './Components/WelcomePage';
import LoginPage from './Components/LoginPage';
import RegisterPage from './Components/RegisterPage';
import MainPage from './Components/MainPage';

function App() {
  const [user, setUser] = useState("");

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  // const ProtectedRoute = ({ element: Component, ...rest }) => {
  //   return user ? <Component {...rest} user={user} /> : <Navigate to="/login" />;
  // };

  const ProtectedRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" />;
  };

  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/login" element={<LoginPage setUser={setUser} />} />
      <Route path="/register" element={<RegisterPage setUser={setUser} />} />
      <Route path="/main" 
             element={
               <ProtectedRoute>
                 <MainPage user={user} />
               </ProtectedRoute>
             } 
      />
    </Routes>
    
  );
}

export default App;
