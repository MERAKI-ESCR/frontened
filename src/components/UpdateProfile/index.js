import React, { useState, useEffect } from "react";
import axios from "axios";
import "./update.css";

import { Route, useHistory } from "react-router-dom";

export default function UpdateProfile({ token }) {
  const history = useHistory();

  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [city, setCity] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [IBAN, setIBAN] = useState("");
  const [userInfo, setUserInfo] = useState([]);

  const updateButton = () => {
    console.log("frooont");
    axios
      .put(
        "https://escr.herokuapp.com/user/update/profile",
        {
          update: { nickName, email, age, city, phoneNo, IBAN },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        console.log("update resulllllllt", result.data);
      })
      .catch((err) => {
        console.log(err);
      });
    history.push("/profile");
  };

  useEffect(() => {
    axios
      .get("https://escr.herokuapp.com/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setNickName(result.data.nickName);
        setEmail(result.data.email);
        setAge(result.data.age);
        setCity(result.data.city);
        setPhoneNo(result.data.phoneNo);
        setIBAN(result.data.IBAN);
        setUserInfo(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="outProfile">
    <div className="profile">
      <fieldset>
        <legend>Name</legend>
        <input
          className="input"
          type="text"
          value={nickName}
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
          value={email}
          placeholder="email here"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </fieldset>

      <fieldset>
        <legend>Age</legend>
        <input
          className="input"
          type="number"
          value={age}
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
          value={city}
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
          value={phoneNo}
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
          value={IBAN}
          placeholder="IBAN here"
          onChange={(e) => {
            setIBAN(e.target.value);
          }}
        />
      </fieldset>
      <button className="registerButton" onClick={updateButton}>
        Update
      </button>
    </div>
    </div>
  );
}
