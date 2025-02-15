// Importing React and other important libraries
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import WelcomePage from "./Components/WelcomePage";
import LoginPage from "./Components/LoginPage";
import RegisterPage from "./Components/RegisterPage";
import MainPage from "./Components/MainPage";
import FavoritesPage from "./Components/FavoritesPage";
import AddCardPage from "./Components/AddCardPage";
import { TopsPage } from "./Components/TopsPage";
import { Notification } from "./Components/NotificationPage";
import { NotificationForUser } from "./Components/NotificationForUsers";
import { NotificationDetail } from "./Components/NotificationForUsersDetails";

// Context
import { NotificationProvider } from "./context/NotificationContext";

// Styles
import "./App.css";

function App() {
  const [user, setUser] = useState("");

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    if (savedUser && token) {
      setUser(savedUser);
    }
  }, []);

  const ProtectedRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    return user && token ? children : <Navigate to="/login" />;
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
      <Route
        path="/top"
        element={
          <ProtectedRoute>
            <TopsPage user={user} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/notify"
        element={
          <ProtectedRoute>
            <NotificationProvider user={user}>
              <Notification user={user} />
            </NotificationProvider>
          </ProtectedRoute>
        }
      />
      <Route
        path="/notifyforusers"
        element={
          <ProtectedRoute>
            <NotificationProvider user={user}>
              <NotificationForUser user={user} />
            </NotificationProvider>
          </ProtectedRoute>
        }
      />
      <Route
        path="/notifyforusers/:messageId"
        element={
          <ProtectedRoute>
            <NotificationProvider user={user}>
              <NotificationDetail user={user} />
            </NotificationProvider>
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;
