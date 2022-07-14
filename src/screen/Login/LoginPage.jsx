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
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div class="input-effect" style={{ marginBottom: "20px" }}>
            <input
              class="effect-16"
              type="text"
              name="username"
              id="username"
              value={inputs.username || ""}
              onChange={handleChange}
            />
            {/* <label htmlFor="username">Username</label> */}
            <span class="focus-border"></span>
          </div>
          <div class="input-effect">
            <input
              class="effect-16"
              type="Password"
              name="password"
              id="password"
              value={inputs.password || ""}
              onChange={handleChange}
            />
            {/* <label htmlFor="password">Password</label> */}
            <span class="focus-border"></span>
          </div>
          <div className="center">
            <button class="custom-btn btn-3" type="submit">
              <span>Submit</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
