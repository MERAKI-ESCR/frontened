import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./navigation.css";
const Navigation = ({
  token,
  setHomePageSection,
  setToken,
  setAdmin,
  isAdmin,
}) => {
  const history = useHistory();
  return (
    <div className="navBar">
      <div className="others">
        <Link to="/" className="links">
          Home
        </Link>
        <div className="dropdown">
          <button className="dropbtn">
            cases
            <i className="fa fa-caret-down"></i>
          </button>
          <div className="dropdown-content">
            <Link to="/cases/closed" className="dropDownLinks">
              closed cases
            </Link>
            <Link
              to="/"
              className="dropDownLinks"
              onClick={() => {
                setHomePageSection("categories");
              }}
            >
              available cases
            </Link>
            {/* <Link to="/cases/categeories/Education" className="dropDownLinks">
            Education
            </Link> */}
            <Link to="/cases/categeories/Education" className="dropDownLinks">
              Education
            </Link>
            <Link to="/cases/categeories/Treatment" className="dropDownLinks">
              health
            </Link>
            {
              <Link to="/cases/categeories/Dept" className="dropDownLinks">
                depts
              </Link>
            }
            <Link to="/cases/categeories/Building" className="dropDownLinks">
              rebuilding
            </Link>
          </div>
        </div>
        <Link
          to="/"
          className="links"
          onClick={() => {
            setHomePageSection("about");
          }}
        >
          About Us
        </Link>
        <Link
          to="/"
          className="links"
          onClick={() => {
            setHomePageSection("volunteers");
          }}
        >
          Our Volunteers
        </Link>
        <Link
          to="/"
          className="links"
          onClick={() => {
            setHomePageSection("container");
          }}
        >
          Contact Us
        </Link>
      </div>
      {token ? (
        <div className="signing">
          <Link to="/profile" className="links logreg">
            Profile
          </Link>
          <Link
            to="/"
            className="links logreg"
            onClick={() => {
              localStorage.clear();
              setToken(null);
              setAdmin(false);
            }}
          >
            Logout
          </Link>
          <Link to="/myCases" className="links logreg">
            My Cases
          </Link>
          {isAdmin ? (
            <Link to="/isClosed" className="links logreg">
              All Cases
            </Link>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <div className="signing">
          <Link to="/login" className="links logreg">
            Login
          </Link>
          <Link to="/register" className="links logreg">
            Register
          </Link>
        </div>
      )}
    </div>
  );
};
export default Navigation;