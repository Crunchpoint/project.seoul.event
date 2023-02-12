import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { MyContext } from "./Context";
import { motion } from "framer-motion";

const SideContentsR = () => {
  const { mainCont, setMainCont } = useContext(MyContext);
  const pathName = useLocation().pathname;
  const mainContFn = () => {
    setMainCont(!mainCont);
  };
  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
  };
  return (
    <>
      {pathName === "/map" ? (
        <motion.div
          className="side-contentsR"
          data-ison={mainCont}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { duration: 0.75, delay: 0.15, ease: "easeInOut" } }}
          onClick={() => {
            mainContFn();
          }}>
          <motion.button className="handle" layout transition={spring}></motion.button>
        </motion.div>
      ) : null}
    </>
  );
};

export default SideContentsR;
