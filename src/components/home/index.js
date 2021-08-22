import React, { useEffect } from "react";
import SimpleImageSlider from "react-simple-image-slider";
import "./home.css";
import Volunteers from "../volunteers/index";
import About from "./../About/About";
import photo1 from "./photo4.jpg";
import photo2 from "./photo2.jpg";
import photo3 from "./photo3.jpg";
import medical from "./medical.png";
import educational from "./educational.png";
import debt from "./debt.png";
import building from "./building.png";
import ContactUs from "../contactUs/index";
import { useHistory, Link } from "react-router-dom";
import Footer from "../footer/index";
import { scroller } from "react-scroll";

const Home = ({ setPath, homePageSection }) => {
  const images = [{ url: photo2 }, { url: photo3 }, { url: photo1 }];
  const history = useHistory();
  setPath("/");

  useEffect(() => {
    if (homePageSection !== "") {
      console.log(homePageSection);
      scroller.scrollTo(homePageSection, { smooth: true });
    }
  }, [homePageSection]);

  
  return (
    <div>
      <SimpleImageSlider
       style={{ margin: '0 auto', border: '1px solid rgb(31, 38, 59)' ,opacity:'0.8'}}
        width={1260}
        height={550}
        startIndex={0}
        images={images}
        slideDuration={0.5}
        navStyle={2}
        navSize={50}
        showNavs={true}
        useGPURender={true}
        bgColor={"rgb(31, 38, 59)"}
      />
      <br/>
      <About />
      <br/>
      <div id="categories" className="categories" >
        <div className="introduction">
        <h1>Cases</h1>
          <p className="introText">
            We support a myriad of causes. Choose any of the categories to see
            them.
             Or you can choose other categories{" "}
            <Link className="Link" to="/cases/categeories/General">
              here.
            </Link>
          </p>
          <div
            className="categoryBox3"
            onClick={(e) => {
              history.push("/cases/categeories/General");
            }}
          >
            <p className="text">Other Categories</p>
          </div>
        </div>
        <div className="mainCategories">
          <div
            className="categoryBox1"
            onClick={(e) => {
              history.push(`/cases/categeories/Education`);
            }}
          >
            <img src={educational} className="categoriesPics" alt='educational'></img>
            <p className="text">Educational</p>
          </div>
          <div
            className="categoryBox2"
            onClick={(e) => {
              history.push(`/cases/categeories/Treatment`);
            }}
          >
            <img src={medical} className="categoriesPics" alt='medical'></img>
            <p className="text">Health</p>
          </div>
          <div
            className="categoryBox2"
            onClick={(e) => {
              history.push(`/cases/categeories/Dept`);
            }}
          >
            <img src={debt} className="categoriesPics" alt='dept'></img>
            <p className="text">Debts</p>
          </div>
          <div
            className="categoryBox1"
            onClick={(e) => {
              history.push(`/cases/categeories/Building`);
            }}
          >
            <img src={building} className="categoriesPics" alt='building'></img>
            <p className="text">Rebuilding</p>
          </div>
        </div>
      </div>
      <br />
      <Volunteers />
      <br/>
        <ContactUs />
        <Footer />
    </div>
  );
};

export default Home;
