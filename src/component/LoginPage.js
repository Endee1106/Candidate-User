import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AccountApi from "../api/entities/AccountApi";
import '../css/layout/LoginPage.css'

function LoginPage() {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
    AccountApi.login(inputs.username, inputs.password)
      .then((res) => {
        console.log(res.data.data.token);
        sessionStorage.setItem("token", res.data.data.token);
        navigate("/candidate/");
      })
      .catch((err) => {
        alert("Tài khoản không đúng!");
      });
  };

  return (
    <div className="login-form">
      <div className="img-container">
        <img src="https://cmcglobal.com.vn/news-event/cmc-corporation-donates-3-billion-vietnam-dong-to-3-hospitals-treating-covid-19/" alt="Avatar" class="avatar" />
      </div>
      <div className="login-container">
      <form onSubmit={handleSubmit}>
        <label>
          <h3>Enter Username:</h3>
          <input
            type="text"
            name="username"
            value={inputs.username || ""}
            onChange={handleChange}
          />
        </label>
        <label>
        <h3>Enter Password:</h3>
          <input
            type="Password"
            name="password"
            value={inputs.password || ""}
            onChange={handleChange}
          />
        </label>
        <input type="submit" Login />
      </form>
      </div>
    </div>
  );
}

export default LoginPage;
