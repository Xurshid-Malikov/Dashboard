import React, { useState } from "react";
import axios from "axios";
import "./login.css";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://reqres.in/api/login", {
        email: email,
        password: password,
      });

      localStorage.setItem("token", response.data.token);
      setIsAuthenticated(true);
      navigate("/products");
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Invalid login credentials");
    }
  };

  return (
    <div className="body">
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <h3>Log in</h3>

        <label className="label" htmlFor="email">
          Email
        </label>
        <input
          className="input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Emailni kiriting.."
          id="email"
        />

        <label className="label" htmlFor="password">
          Password
        </label>
        <input
          className="input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Parolni kiriting..."
          id="password"
        />

        <button className="button" type="submit">
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
