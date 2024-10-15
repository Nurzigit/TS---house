import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import WelcomePage from "./Components/WelcomePage";
import LoginPage from "./Components/LoginPage";
import RegisterPage from "./Components/RegisterPage";
import MainPage from "./Components/MainPage";
import FavoritesPage from "./Components/FavoritesPage";
import AddCardPage from "./Components/AddCardPage";

function App() {
  const [user, setUser] = useState("");

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem('token'); 
    if (savedUser && token) {
      setUser(savedUser);
    }
  }, []);

  // const ProtectedRoute = ({ element: Component, ...rest }) => {
  //   return user ? <Component {...rest} user={user} /> : <Navigate to="/login" />;
  // };

  const ProtectedRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    
    return (user && token) ? children : <Navigate to="/login" />;
  };

  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/login" element={<LoginPage setUser={setUser} />} />
      <Route path="/register" element={<RegisterPage setUser={setUser} />} />
      <Route
        path="/main"
        element={
          <ProtectedRoute>
            <MainPage user={user} />
          </ProtectedRoute>
        }
      />

      <Route
        path="/add"
        element={
          <ProtectedRoute>
            <AddCardPage user={user} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/favorites"
        element={
          <ProtectedRoute>
            <FavoritesPage user={user} />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
