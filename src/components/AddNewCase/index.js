import React, { useState } from "react";
import "./AddNewCase.css";
import axios from "axios";

export default function AddNewCase({ token }) {
  const [caseName, setCaseName] = useState("");
  const [category, setCategory] = useState("");
  const [neededAmount, setNeededAmount] = useState(0);
  const [address, setAddress] = useState("");
  const [isPrivate, setIsPrivate] = useState("Yes");
  const [message, setMessage] = useState("");
  const branchh = [
    " ",
    "Education",
    "Treatment",
    "Building",
    "Dept",
    "General"
  ];
  const yesNo = ["", "Yes", "No"];

  //register2

  const AddCase = () => {
    console.log(caseName, category, neededAmount, address, isPrivate, token);
    axios
      .post(
        "https://escr.herokuapp.com/cases/create",
        {
          caseName,
          category,
          neededAmount,
          address,
          isPrivate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setMessage("add successfully");
      })
      .catch((err) => {
        throw err;
      });
  };

  return (
    <div className="outAdd">
      <div className="Add">
        <h3 style={{ color: "#18b760" }}>Add new case</h3>

        <fieldset>
          <legend> Case Name</legend>
          <input
            className="input"
            type="text"
            placeholder="case name here"
            onChange={(e) => {
              setCaseName(e.target.value);
              console.log(caseName);
            }}
          />
        </fieldset>
        <fieldset>
          <legend> Choose kind of help </legend>

          <select
            className="option"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            {branchh.map((element, index) => (
              <option value={element} key={index}>
                {element}
              </option>
            ))}
          </select>
        </fieldset>

        <fieldset>
          <legend> Needed amount</legend>
          <input
            className="input"
            type="number"
            placeholder="needed amount"
            onChange={(e) => {
              setNeededAmount(e.target.value);
            }}
          />
        </fieldset>

        <fieldset>
          <legend> Address</legend>
          <input
            className="input"
            type="text"
            placeholder="address here"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
        </fieldset>

        <fieldset>
          <legend> Secret information</legend>
          <select
            className="option"
            onChange={(e) => {
              setIsPrivate(e.target.value);
            }}
          >
            {yesNo.map((element, index) => (
              <option value={element} key={index}>
                {element}
              </option>
            ))}
          </select>
        </fieldset>
        <button className="profileButton" onClick={AddCase}>
          Add
        </button>
        <p>{message}</p>
      </div>
    </div>
  );
}
