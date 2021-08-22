import axios from "axios";
import { React, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Profile.css";

export default function Profile({ nickName, token }) {
  const history = useHistory();
  const [userInfo, setUserInfo] = useState([]);
  useEffect(() => {
    axios
      .get("https://escr.herokuapp.com/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log("profile data", result.data);
        setUserInfo(result.data);
        console.log("UserInfo", userInfo);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="outProfile">
      <div className="profile">
        <h2 style={{ textAlign: "center" }}>Hello {nickName}</h2>
        <div className="profileInfo">
          <div> Name: {userInfo.nickName}</div>
          <div> Age: {userInfo.age}</div>
          <div> Email: {userInfo.email}</div>
          <div>City: {userInfo.city}</div>
          <div>PhoneNo: {userInfo.phoneNo}</div>
          <div>IBAN: {userInfo.IBAN}</div>
        </div>
        <h4 style={{ textAlign: "center" }}>
          if you need to add new case please click here{" "}
        </h4>
        <button
          className="addButton"
          onClick={() => {
            history.push("/cases/create");
          }}
        >
          Add New Case
        </button>
        <h4 style={{ textAlign: "center" }}>
          if you need to update your information click here{" "}
        </h4>
        <button
          className="addButton"
          onClick={() => {
            history.push("/profile/update");
          }}
        >
          Update profile{" "}
        </button>
        <h4 style={{ textAlign: "center" }}>
          if you need to see your cases click here{" "}
        </h4>

        <Link to="/myCases"  className="addButton">
        <button
       className="linkButton"
          onClick={() => {
          
          }}
        >
          My Cases{" "}
        </button>

        </Link>



     

        <div></div>
      </div>
    </div>
  );
}
