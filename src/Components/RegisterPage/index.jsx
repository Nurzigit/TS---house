import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/style.css";
const RegisterPage = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [sex, setSex] = useState("");
  const [role, setRole] = useState("user");
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const isAdmin = email === "nurzigitturman@gmail.com";

    const response = await fetch("http://localhost:8000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        nickname,
        password,
        sex,
        role: isAdmin ? "admin" : role,
      }),
    });

    if (response.ok) {
      navigate("/login");
    }else {
      alert("User with this email already exists");
    }
  };

  return (
    <div className="register">
      <div className="register__container">
        <div className="register__image"></div>
        <div className="register__form-container">
          <h2>Регистрация</h2>
          <form onSubmit={handleRegister} className="register__form">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Nickname"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              required
            />
            <select
              value={sex}
              onChange={(e) => setSex(e.target.value)}
              required
            >
              <option value="">Select Sex</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="user">User</option>
              <option value="advertiser">Advertiser</option>
            </select>
            <button type="submit">Зарегистрироваться</button>
          </form>

          <p className={"register__p"}>
            Уже есть аккаунт? <Link to="/login">Войти</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
