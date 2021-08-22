import React, { useState } from "react";
import axios from "axios";
import { GoogleLogin } from "react-google-login";

import "./login.css";

import { useHistory } from "react-router-dom";

export default function Login({ setToken, path,setAdmin }) {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const AdminRoleId = "60c460a01d246d3110e885f9";
  const loginFun = () => {
    axios
      .post("https://escr.herokuapp.com/login", {
        email,
        password,
      })
      .then((res) => {
        console.log(res);
        if (res.data.token) {
          if (res.data.result.role===AdminRoleId)
            setAdmin(true);
          setToken(res.data.token);
          localStorage.setItem("token", res.data.token);
          setLoginMessage("login successful");
          history.push(path);
          localStorage.setItem("nickName", res.data.result.nickName);
        } else {
          setLoginMessage(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoginMessage("please try again");
      });
  };

  const ResponseGoogle = (response) => {
    console.log(response);
    console.log(response.accessToken);
    console.log("name" , response.profileObj.givenName);
    setToken(response.accessToken);
    localStorage.setItem("token", response.accessToken);
    localStorage.setItem("nickName", response.profileObj.givenName);
    
    setLoginMessage("login successful");
    history.push(path);
  };

  return (
    <div className="outLogin">
      <div className="login">
        <h2 style={{ textAlign: "center" }}>Login</h2>
        <h4 style={{ textAlign: "center" }}>Login to your account</h4>
        <fieldset>
          <legend>E-mail</legend>
          <input
            className="input"
            type="text"
            placeholder="email here"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </fieldset>

        <fieldset>
          <legend>Password</legend>
          <input
            className="input"
            type="password"
            placeholder="password here"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </fieldset>

        <button className="loginButton" onClick={loginFun}>
          LOGIN
        </button>
        <h4 className="message" style={{ textAlign: "center" }}>
          {loginMessage}
        </h4>
        <div>
          <GoogleLogin
            clientId="1018427859000-rr1mqigkk7fvghqfnh85ph78eru3lo8m.apps.googleusercontent.com"
            onSuccess={ResponseGoogle}
            onFailure={ResponseGoogle}
          />
        </div>
      </div>
    </div>
  );
}
