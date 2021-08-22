import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import axios from "axios";
import notFound from './notFound.png'
import poor from './poor.jpg'
import poor1 from './poor1.jpg'
import poor3 from './poor3.jpg'
import './case.css'

const Update = ({ token }) => {
  const photos = [poor,poor1,poor3];
  const [cases, setCases] = useState([]);
  const [caseName, setCaseName] = useState("");
  const [category, setCategory] = useState("");
  const [isPrivate, setIsPrivate] = useState("");
  const [neededAmount, setNeededAmount] = useState(0);
  const [caseId, setCaseId] = useState("");
  const [isClicked,setIsClicked] = useState(false)
  const branchh = [
    "",
    "Education",
    "Treatment",
    "Building",
    "Dept",
    "General"
  ];
  const yesNo = ["", "Yes", "No"];

  useEffect(getCases, []);

  function getCases() {
    axios
      .get("https://escr.herokuapp.com/user/cases/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setCases(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  console.warn("After Getting Cases: ",cases);

  const deleteCase = (id) => {
    axios
      .delete(`https://escr.herokuapp.com/cases/case/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log("After Deletion: ",result.data);
        getCases();
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const selectCase = (index) => {
    setCaseName(cases[index].caseName);
    setCategory(cases[index].category);
    setIsPrivate(cases[index].isPrivate.toString());
    setNeededAmount(cases[index].neededAmount);
    setCaseId(cases[index]._id);
  };

  const updateCase = () => {
    console.log({ caseName, category, isPrivate, neededAmount, caseId });
    axios
      .put(
        `https://escr.herokuapp.com/cases/case/${caseId}`,
        {updates:{ caseName, category, isPrivate, neededAmount }},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        console.log("After Editing: ",result.data);
        getCases();
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <div>
      {cases.length ?
      <div className="casesContainer">
            {cases.map((item, index) => {
              return (
                <div className="myCaseContainer" key={index}>
                <div className="caseInform">
                  <div><img className="poorImages" src={poor} alt="poor"/></div>
                  <div><span className="mainTitle">{item.caseName}</span></div>
                  <div><span className="title">category: </span>{item.category}</div>
                  <div><span className="title">Privacy: </span> {item.isPrivate =='Yes' ? <span>Private</span> : <span>Not Private</span>}</div>
                  <div>
                    <span className="title">Needed Amount: </span>{item.neededAmount}.JOD</div>
                  <div>
                    <button className="delBtn" onClick={() => deleteCase(item._id)}>Delete</button>
                    <button className="updBtn" onClick={() => {selectCase(index);setIsClicked(true)}}>Update</button>
                  </div>
                </div>
                </div>
              );
            })}
            {isClicked?<div className="updateContainer">
        <input
          type="text"
          value={caseName}
          placeholder="Case Name"
          onChange={(e) => {
            setCaseName(e.target.value);
          }}
        />
        <br />
        <select
            className="option"
            value={category}
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
        <br />
        <select
            value={isPrivate}
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
        <br />
        <input
          type="number"
          value={neededAmount}
          placeholder="Needed Amount"
          onChange={(e) => {
            setNeededAmount(e.target.value);
          }}
        />
        <br />
        <button className="updBtn2" type="submit" onClick={()=>{updateCase();setIsClicked(false)}}>
          Update
        </button>
        <br />
        <br />
      </div>:<></>}
      </div> : <div className="noCases">No Added Cases! <Link to='/profile'> Add One?</Link><div><img src={notFound}/></div></div>}
    </div>
  );
};

export default Update;
