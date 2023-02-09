import React, { useContext } from "react";
import { MyContext } from "./Context";
import FooterLinks from "./FooterLinks";

const Footer = () => {
  const {} = useContext(MyContext);

  return (
    <footer className="footer">
      <div className="tab-bar-container">
        <div className="tab-bar-inner">
          <FooterLinks />
        </div>
      </div>
      <div className="tab-bar-bg"></div>
    </footer>
  );
};

export default Footer;
