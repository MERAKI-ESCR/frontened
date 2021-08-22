import React from "react";
import poor from "./poor.jpg";
import man from "./help.png";
import house from "./house.png";
import "./About.css";

const About = () => {
  return (
    <div id="about" className="section" >
      <div className="about">
        <div className="Image">
          <img src={poor} className="aboutImg" alt="poor"></img>
        </div>
        <div className="aboutBody">
          <h1>ABOUT US</h1>
          <div className="line"></div>
          <h2>
            Bliss Is <span className="Nonprofit">Nonprofit</span> Organization{" "}
            For Helping <span className="Helping">Needed </span>Cases.{" "}
          </h2>
          <p>
            Bliss goal is giving help to those in need of it.
             As a humanitarian
            act, which involves giving money, goods or
             time and effort to those
            who need it. It is done without expecting something in return.
          </p>
          <div className="services">
            <div>
              <img src={house} className="icons" alt="house"></img>{" "}
              <br/>
              <span className="iconCaption">Fix Building</span>
            </div>
            <div>
              <img src={man} className="icons" alt="man"></img>{" "}
              <br/>
              <span className="iconCaption">Help poor</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
