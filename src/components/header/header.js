import React from 'react';
import './header.css'
import { Link } from "react-router-dom";
import logo from './logo .png'


const Header = ()=>{
    return(
        <div className="Logo">
        <Link to="/" className="Link">
        {" "}
        <img
          src={logo } 
          style={{
            hight: "50px",
            width: "50px",
            cursor:"pointer" ,
            zIndex:7
          }}alt="logo"
        />
      </Link>
          
            
        </div>
    )
}

export default Header;