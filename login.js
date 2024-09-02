// Login.js

import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./login.css"; // Import your CSS file for styling
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5001/login", {
        email,
        password,
      });

      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user.firstname));
        navigate("/home");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="outer-container">
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        <br/>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
    </div>
  );
};

export default Login;
