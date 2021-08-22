import React, { useState } from "react";

import "./register.css";

import { Route, useHistory } from "react-router-dom";

import axios from "axios";

export default function Register() {
  const history = useHistory();
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [age, setAge] = useState(0);
  const [city, setCity] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [IBAN, setIBAN] = useState("");
  const [registerMessage, setRegisterMessage] = useState("");

  const postRegister = () => {

    if (password === confirmPassword) {
      axios
        .post("https://escr.herokuapp.com/register", {
          nickName,
          email,
          password,
          age,
          city,
          phoneNo,
          IBAN,
        })
        .then((res) => {
          if (res.data.errors) {
            setRegisterMessage(
              "some thing happened while register, please try again"
            );
          } else {
            history.push("/login");
          }
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    } else {
      setRegisterMessage("please check the password");
    }
  };

  return (
    <div className="outRegister">
      <div className="register">
        <h2 style={{ textAlign: "center" }}>Register</h2>
        <h5 style={{ textAlign: "center" }}>Register your account</h5>

        <fieldset>
          <legend>Nick Name</legend>
          <input
            className="input"
            type="text"
            placeholder="nick name here"
            onChange={(e) => {
              setNickName(e.target.value);
            }}
          />
        </fieldset>

        <fieldset>
          <legend>E-Mail</legend>
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

        <fieldset>
          <legend>Confirm Password</legend>
          <input
            className="input"
            type="password"
            placeholder="Confirm password here"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </fieldset>

        <fieldset>
          <legend>Age</legend>
          <input
            className="input"
            type="number"
            placeholder="age here"
            onChange={(e) => {
              setAge(e.target.value);
            }}
          />
        </fieldset>

        <fieldset>
          <legend>City</legend>
          <input
            className="input"
            type="text"
            placeholder="city here"
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />
        </fieldset>

        <fieldset>
          <legend>Phone Number</legend>
          <input
            className="input"
            type="text"
            placeholder="phone number here"
            onChange={(e) => {
              setPhoneNo(e.target.value);
            }}
          />
        </fieldset>

        <fieldset>
          <legend>IBAN</legend>
          <input
            className="input"
            type="text"
            placeholder="IBAN here"
            onChange={(e) => {
              setIBAN(e.target.value);
            }}
          />
        </fieldset>
        <button className="registerButton" onClick={postRegister}>
          REGISTER
        </button>
        <p className="message" style={{ textAlign: "center" }}>
          {registerMessage}
        </p>
      </div>
    </div>
  );
}
