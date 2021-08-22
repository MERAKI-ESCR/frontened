import { React, useState, useEffect } from "react";
import axios from "axios";
import poor from './poor1.jpg'

import "./isClose.css";
export default function IsClose({ token,isAdmin }) {
  const [result, setResult] = useState([]);
  const [update1, setUpdate] = useState("");
  let a ;
  const update = (id) => {
    axios
      .put(`https://escr.herokuapp.com/cases/case/closed/${id}`,{updates:{isClosed:true}},{headers: {
        'Authorization': `Bearer ${token}`
}})
      .then((response) => {
        setUpdate(Math.random())
      })
      .catch((err) => {
        throw err;
      });
  };
  
  useEffect(() => {
    axios
      .get("https://escr.herokuapp.com/cases/available")
      .then((result) => {
        setResult(
          result.data.map((item, i) => {
            return (
              <div className="myCaseContainer" key={i}>
                <div className="caseInform" >
                  <div><img className="poorImages" src={poor} alt=""/></div>
                  <div><span className="mainTitle">{item.caseName}</span></div>
                  <div><span className="title">category: </span>{item.category}</div>
                  <div><span className="title">Is Closed: </span> {item.isClosed ? <span>Closed</span> : <span>Not Closed</span>}</div>
                  <div>
                    <span className="title">Needed Amount: </span>{item.neededAmount}.JOD</div>
                  <div>
                  {isAdmin ? <button className="updBtn" onClick={() => update(item._id)}>Close Case</button>:<></>}
                  </div>
                </div>
                </div>
            );                
          })
        );
      })
      .catch((err) => {
        return <div>{err}</div>;
      });
  }, [update1]);
  return (
    <>
      <div className="casesContainer">{result}</div>
    </>
  );
}
