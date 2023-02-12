import React, { useContext, useEffect } from "react";
import { MyContext } from "./Context";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const FooterLinks = () => {
  const { dispatch, setSelected, activeTab, setActiveTab, setOptionValue, defaultCal, setSearch, setExpanded, setTargetLoc, latLon, setMainCont } = useContext(MyContext);
  const pathName = useLocation().pathname;

  useEffect(() => {
    if (pathName !== "/search") {
      setOptionValue("");
      dispatch({ type: "SET_CATEGORY", payload: "" });
      dispatch({ type: "SET_PLACE", payload: "" });
      dispatch({ type: "SET_DATE", payload: defaultCal });
    }
    if (pathName === "/search" || pathName === "/culturalspc" || pathName === "/" || pathName === "/map" || pathName === "/recommends") {
      setSelected("전체");
      window.scrollTo({ top: 0, behavior: "smooth" });
      setExpanded("");
      dispatch({ type: "SET_CATEGORY", payload: "" });
    }
    if (pathName === "/search" || pathName === "/culturalspc" || pathName === "/" || pathName === "/recommends") {
      setTargetLoc({ name: "현재 위치", lat: latLon[0], lng: latLon[1] });
    }
    if (pathName === "/search" || pathName === "/culturalspc") {
      setSearch("");
    }
    if (pathName !== "/map") {
      setMainCont(false);
    }
  }, [pathName]);

  useEffect(() => {
    setActiveTab(pathName);
  }, [pathName, setActiveTab]);
  return (
    <>
      <div className={activeTab === "/search" ? "active tab" : "tab"}>
        <Link to="/search">
          <motion.div className="box" whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
            <svg fill="#000000" width="35" height="35" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
              <path d="m14.91 13.09-3.68-3.21a4.86 4.86 0 0 0 .86-2.77A5.34 5.34 0 0 0 6.59 2a5.35 5.35 0 0 0-5.5 5.15 5.34 5.34 0 0 0 5.5 5.15 5.71 5.71 0 0 0 3.82-1.44L14.08 14zM6.59 11a4.09 4.09 0 0 1-4.25-3.9 4.09 4.09 0 0 1 4.25-3.9 4.09 4.09 0 0 1 4.25 3.9A4.08 4.08 0 0 1 6.59 11z" />
            </svg>
            {/* <p>검색</p> */}
          </motion.div>
        </Link>
      </div>
      <div className={activeTab === "/culturalspc" ? "active tab" : "tab"}>
        <Link to="/culturalspc">
          <motion.div className="box" whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
            <svg fill="#000000" width="40" height="40" viewBox="0 -64 640 640" xmlns="http://www.w3.org/2000/svg">
              <path d="M434.7 64h-85.9c-8 0-15.7 3-21.6 8.4l-98.3 90c-.1.1-.2.3-.3.4-16.6 15.6-16.3 40.5-2.1 56 12.7 13.9 39.4 17.6 56.1 2.7.1-.1.3-.1.4-.2l79.9-73.2c6.5-5.9 16.7-5.5 22.6 1 6 6.5 5.5 16.6-1 22.6l-26.1 23.9L504 313.8c2.9 2.4 5.5 5 7.9 7.7V128l-54.6-54.6c-5.9-6-14.1-9.4-22.6-9.4zM544 128.2v223.9c0 17.7 14.3 32 32 32h64V128.2h-96zm48 223.9c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zM0 384h64c17.7 0 32-14.3 32-32V128.2H0V384zm48-63.9c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16c0-8.9 7.2-16 16-16zm435.9 18.6L334.6 217.5l-30 27.5c-29.7 27.1-75.2 24.5-101.7-4.4-26.9-29.4-24.8-74.9 4.4-101.7L289.1 64h-83.8c-8.5 0-16.6 3.4-22.6 9.4L128 128v223.9h18.3l90.5 81.9c27.4 22.3 67.7 18.1 90-9.3l.2-.2 17.9 15.5c15.9 13 39.4 10.5 52.3-5.4l31.4-38.6 5.4 4.4c13.7 11.1 33.9 9.1 45-4.7l9.5-11.7c11.2-13.8 9.1-33.9-4.6-45.1z" />
            </svg>
          </motion.div>
          {/* <p>문화공간</p> */}
        </Link>
      </div>
      <div className={activeTab === "/" ? "active tab" : "tab"}>
        <Link to="/ ">
          <motion.div className="box" whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
            <svg fill="#000000" width="42" height="42" viewBox="-4.5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <title>home</title>
              <path d="M19.469 12.594l3.625 3.313c0.438 0.406 0.313 0.719-0.281 0.719h-2.719v8.656c0 0.594-0.5 1.125-1.094 1.125h-4.719v-6.063c0-0.594-0.531-1.125-1.125-1.125h-2.969c-0.594 0-1.125 0.531-1.125 1.125v6.063h-4.719c-0.594 0-1.125-0.531-1.125-1.125v-8.656h-2.688c-0.594 0-0.719-0.313-0.281-0.719l10.594-9.625c0.438-0.406 1.188-0.406 1.656 0l2.406 2.156v-1.719c0-0.594 0.531-1.125 1.125-1.125h2.344c0.594 0 1.094 0.531 1.094 1.125v5.875z"></path>
            </svg>
            {/* <p>홈</p> */}
          </motion.div>
        </Link>
      </div>
      <div className={activeTab === "/map" ? "active tab map" : "tab"}>
        <Link to="/map">
          <motion.div className="box" whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
            <svg width="35" height="35" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <title>location-solid</title>
              <g id="Layer_2" data-name="Layer 2">
                <g id="invisible_box" data-name="invisible box">
                  <rect width="48" height="48" fill="none" />
                </g>
                <g id="icons_Q2" data-name="icons Q2">
                  <path d="M24,2C14.1,2,7,10.1,7,20S18.5,41.3,22.6,45.4a1.9,1.9,0,0,0,2.8,0C29.5,41.3,41,30.1,41,20S33.9,2,24,2Zm0,22a7,7,0,1,1,7-7A7,7,0,0,1,24,24Z" />
                </g>
              </g>
            </svg>{" "}
            {/* <p>지도</p> */}
          </motion.div>
        </Link>
      </div>
      <div className={activeTab === "/recommends" ? "active tab" : "tab"}>
        <Link to="/recommends">
          <motion.div className="box" whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
            <svg fill="#000000" width="35" height="35" viewBox="0 0 24 24" id="a11298b2-e15e-46f5-bfd2-69e168954b14" data-name="Livello 1" xmlns="http://www.w3.org/2000/svg">
              <title>prime</title>
              <path d="M8,11.47A18.74,18.74,0,0,0,10.69,8.9a18.74,18.74,0,0,0,1.76-2.42A6.42,6.42,0,0,0,13,5.41l1.74-4.57a4.45,4.45,0,0,1,2.83,2A4,4,0,0,1,18,4.77a2.67,2.67,0,0,1-.09.55L16.72,9.05h5.22a2,2,0,0,1,2,1.85,19.32,19.32,0,0,1-.32,5.44,33.83,33.83,0,0,1-1.23,4.34,3.78,3.78,0,0,1-3.58,2.49,25.54,25.54,0,0,1-6.28-.66A45.85,45.85,0,0,1,8,21.26V11.47Z" />
              <path d="M5,9H1a1,1,0,0,0-1,1V22a1,1,0,0,0,1,1H5a1,1,0,0,0,1-1V10A1,1,0,0,0,5,9ZM3,21a1,1,0,1,1,1-1A1,1,0,0,1,3,21Z" />
            </svg>{" "}
            {/* <p>추천</p> */}
          </motion.div>
        </Link>
      </div>
    </>
  );
};
export default FooterLinks;
