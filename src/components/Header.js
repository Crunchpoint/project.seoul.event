import React from "react";
import HeaderAccount from "./HeaderAccount";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <header className='header'>
      <div className='header-container'>
        <div className='header-inner'>
          <h1 className='logo'>
            <figure>
              <Link to='/'>
                <img src={process.env.PUBLIC_URL + "/assets/images/logo4.png"} alt='#' />
              </Link>
            </figure>
          </h1>
          <HeaderAccount />
        </div>
      </div>
    </header>
  );
};

export default Main;
