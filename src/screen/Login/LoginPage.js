import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AccountApi from "../../api/entities/AccountApi";
import "./loginpage.css";

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
        sessionStorage.setItem(
          "info",
          JSON.stringify(res.data.data.infomation)
        );
        console.log(res.data.data.infomation);
        navigate("/client/");
      })
      .catch((err) => {
        alert("Tài khoản không đúng!");
      });
  };

  return (
    <div className="login-form">
      <div className="login-container">
        <div className="right-login">
          <img className="image" src="https://www.cmc.com.vn/main/imgs/logo.svg"/>
        </div>
        <div className="left-login">
          <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-effect" style={{ marginBottom: "20px" }}>
            <input
              className="effect-16"
              type="text"
              name="username"
              id="username"
              value={inputs.username || ""}
              onChange={handleChange}
              placeholder="Username" 
            />
            {/* <label htmlFor="username">Username</label> */}
            <span className="focus-border"></span>
          </div>
          <div className="input-effect">
            <input
              className="effect-16"
              type="Password"
              name="password"
              id="password"
              value={inputs.password || ""}
              onChange={handleChange}
              placeholder="Password" 
            />
            {/* <label htmlFor="password">Password</label> */}
            <span className="focus-border"></span>
          </div>
          <div className="center">
            <button className="custom-btn btn-3" type="submit">
              <span>Sign in</span>
            </button>
          </div>
        </form>
        </div>
        
      </div>
    </div>
  );
}

export default LoginPage;
