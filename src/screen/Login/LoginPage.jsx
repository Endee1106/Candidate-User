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
    <div className="limiter">
  <div className="container-login100">
    <div className="wrap-login100">
      <div className="login100-pic js-tilt" data-tilt>
        <img src="images/img-01.png" alt="IMG" />
      </div>
      <form className="login100-form validate-form"  onSubmit={handleSubmit}>
        <span className="login100-form-title">
          CMC Corporation
        </span>
        <div className="wrap-input100 validate-input">
          <input className="input100" 
              type="text"
              name="username"
              id="username"
              value={inputs.username || ""}
              onChange={handleChange}
              placeholder="Username"/>
          <span className="focus-input100" />
          <span className="symbol-input100">
            <i className="fa fa-user" aria-hidden="true" />
          </span>
        </div>
        <div className="wrap-input100 validate-input" data-validate="Password is required">
          <input className="input100"  
              type="Password"
              name="password"
              id="password"
              value={inputs.password || ""}
              onChange={handleChange}
              placeholder="Password" />
          <span className="focus-input100" />
          <span className="symbol-input100">
            <i className="fa fa-lock" aria-hidden="true" />
          </span>
        </div>
        <div className="container-login100-form-btn">
          <button className="login100-form-btn">
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
  );
}

export default LoginPage;
