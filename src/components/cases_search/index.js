import React, { useState, useEffect } from "react";
import "./cases_search.css";
import { useHistory, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import poor from './poor2.jpg'
const CaseSearch = ({ setPath, token }) => {
  const { categeory } = useParams();
  const history = useHistory();
  const location = useLocation();
  const [cases, setCases] = useState([]);
  const [donation, setDonation] = useState();
  const [sorting, setSorting] = useState("lowHigh");
  const [caseName, setCaseName] = useState("");
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(12);
  const [docCount, setDocCount] = useState(0);
  setPath(`/cases/categeories/${categeory}`);
  const nextPage = () => {
    if (skip + limit - docCount < limit) {
      setSkip(skip + limit);
    }
  };
  const previousPage = () => {
    if (skip > limit) {
      setSkip(skip - limit);
    }
  };
  useEffect(() => {
    // setPath(location.pathname);
    axios
      .get(`https://escr.herokuapp.com/cases/categeories/${categeory}`)
      .then((result) => {
        setDocCount(result.data.docCount);
        setCases(result.data.result);
      });
  }, []);
  useEffect(() => {
    // console.log(donation);
    axios
      .post(`https://escr.herokuapp.com/cases/categeories/${categeory}`, {
        donationNeeded: Number(donation),
        sorting: sorting,
        caseName: caseName,
        skip: skip,
        limit: limit,
      })
      .then((result) => {
        setDocCount(result.data.docCount);
        setCases(result.data.result);
        // console.log(result.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, [donation, sorting, caseName, skip, limit]);
  const searchDonations = () => {};
  return (
    <>
      <div className="caseSearch">
        <div className="searchBarSection">
          <div className="searchBarParts">
            Donations Needed
            <select
              name="neededDonations"
              id="donations"
              onChange={(e) => {
                setDonation(e.target.value);
                searchDonations();
              }}
            >
              <option value="500">less than 500</option>
              <option value="1000">less than 1000</option>
              <option value="4999">less than 5000</option>
              <option value="5000">more than 5000</option>
            </select>
          </div>
          <div className="searchBarParts">
            Sort
            <select
              name="sorting"
              id="sorting"
              onChange={(e) => {
                setSorting(e.target.value);
                searchDonations();
              }}
            >
              <option value="highLow">High to low</option>
              <option value="lowHigh">Low to High</option>
            </select>
          </div>
          <div className="searchDiv">
            Search
            <input
              className="searchBar"
              placeholder="Enter a case name"
              onChange={(e) => {
                setCaseName(e.target.value);
                searchDonations();
              }}
            />
          </div>
        </div>
        <div className="caseCards">
          {cases.map((elem, i) => {
            return (
              <div
                key={i}
                className="caseCard">
                <div className="casePic">
                  <img className="casePhoto" src={poor}/>
                </div>
                <div className="caseInfo">
                  <div className="donations">
                    <div className="amounts">Goal: {elem.neededAmount}</div>
                    <div className="amounts">
                      Progress: {elem.donatedAmount}
                    </div>
                  </div>
                  <div className="caseName">{elem.caseName}</div>
                  <div className="buttonDiv">
                    <button className="donate_Button" onClick={()=>{
                      if(token){
                        history.push(`/cases/${elem._id}/donate`);
                      } else{
                        history.push("/login");
                      }
                    }}>Donate</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <br />
        <div className="paginationButtons">
          <a
            href="#"
            className="pagination"
            id="previous"
            onClick={() => previousPage()}
          >
            ❮
          </a>
          <a href="#" className="pagination" id="next" onClick={() => nextPage()}>
            ❯
          </a>
        </div>
      </div>
    </>
  );
};
export default CaseSearch;