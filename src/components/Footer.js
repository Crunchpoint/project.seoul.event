import React, { useContext, useEffect } from "react";
import { MyContext } from "./Context";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const { dispatch, setSelected, activeTab, setActiveTab, setOptionValue, defaultCal, setSearch, setExpanded, setTargetLoc, latLon } = useContext(MyContext);
  const pathName = useLocation().pathname;

  useEffect(() => {
    if (pathName !== "/search") {
      setSelected("전체");
      setOptionValue("");
      dispatch({ type: "SET_CATEGORY", payload: "" });
      dispatch({ type: "SET_PLACE", payload: "" });
      dispatch({ type: "SET_DATE", payload: defaultCal });
    }
    if (pathName === "/search" || pathName === "/culturalspc" || pathName === "/" || pathName === "/map" || pathName === "/recommends") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setExpanded("");
      // setTargetLoc({ name: "", lat: latLon[0], lng: latLon[1] });
      dispatch({ type: "SET_CATEGORY", payload: "" });
    }
    if (pathName === "/search" || pathName === "/culturalspc" || pathName === "/" || pathName === "/recommends") {
      setTargetLoc({ name: "현재 위치", lat: latLon[0], lng: latLon[1] });
    }
    if (pathName === "/search" || pathName === "/culturalspc") {
      setSearch("");
    }
  }, [pathName]);

  useEffect(() => {
    setActiveTab(pathName);
  }, [pathName, setActiveTab]);

  return (
    <footer className="footer">
      <div className="tab-bar-container">
        <div className="tab-bar-inner">
          <div className={activeTab === "/search" ? "active tab" : "tab"}>
            <Link to="/search">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 5H20" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14 8H17" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M21 11.5C21 16.75 16.75 21 11.5 21C6.25 21 2 16.75 2 11.5C2 6.25 6.25 2 11.5 2" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M22 22L20 20" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p>검색</p>
            </Link>
          </div>
          <div className={activeTab === "/culturalspc" ? "active tab" : "tab"}>
            <Link to="/culturalspc">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p>문화공간</p>
            </Link>
          </div>
          <div className={activeTab === "/" ? "active tab" : "tab"}>
            <Link to="/ ">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 22H22" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path
                  d="M2.94995 22L2.99995 9.96999C2.99995 9.35999 3.28995 8.78004 3.76995 8.40004L10.77 2.95003C11.49 2.39003 12.4999 2.39003 13.2299 2.95003L20.23 8.39003C20.72 8.77003 21 9.34999 21 9.96999V22"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinejoin="round"
                />
                <path d="M13 17H11C10.17 17 9.5 17.67 9.5 18.5V22H14.5V18.5C14.5 17.67 13.83 17 13 17Z" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinejoin="round" />
                <path
                  d="M9.5 13.75H7.5C6.95 13.75 6.5 13.3 6.5 12.75V11.25C6.5 10.7 6.95 10.25 7.5 10.25H9.5C10.05 10.25 10.5 10.7 10.5 11.25V12.75C10.5 13.3 10.05 13.75 9.5 13.75Z"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinejoin="round"
                />
                <path
                  d="M16.5 13.75H14.5C13.95 13.75 13.5 13.3 13.5 12.75V11.25C13.5 10.7 13.95 10.25 14.5 10.25H16.5C17.05 10.25 17.5 10.7 17.5 11.25V12.75C17.5 13.3 17.05 13.75 16.5 13.75Z"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinejoin="round"
                />
                <path d="M19.0001 7L18.9701 4H14.5701" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p>홈</p>
            </Link>
          </div>
          <div className={activeTab === "/map" ? "active tab" : "tab"}>
            <Link to="/map">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M22 9.00002V15C22 17.5 21.5 19.25 20.38 20.38L14 14L21.73 6.27002C21.91 7.06002 22 7.96002 22 9.00002Z"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21.73 6.27L6.26999 21.73C3.25999 21.04 2 18.96 2 15V9C2 4 4 2 9 2H15C18.96 2 21.04 3.26 21.73 6.27Z"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20.38 20.38C19.25 21.5 17.5 22 15 22H9.00003C7.96003 22 7.06002 21.91 6.27002 21.73L14 14L20.38 20.38Z"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.24002 7.97997C6.92002 5.04997 11.32 5.04997 12 7.97997C12.39 9.69997 11.31 11.16 10.36 12.06C9.67001 12.72 8.58003 12.72 7.88003 12.06C6.93003 11.16 5.84002 9.69997 6.24002 7.97997Z"
                  stroke="#292D32"
                  strokeWidth="1.5"
                />
                <path d="M9.0946 8.69995H9.10359" stroke="#292D32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p>지도</p>
            </Link>
          </div>
          <div className={activeTab === "/recommends" ? "active tab" : "tab"}>
            <Link to="/recommends">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7.47998 18.35L10.58 20.75C10.98 21.15 11.88 21.35 12.48 21.35H16.28C17.48 21.35 18.78 20.45 19.08 19.25L21.48 11.95C21.98 10.55 21.08 9.34997 19.58 9.34997H15.58C14.98 9.34997 14.48 8.84997 14.58 8.14997L15.08 4.94997C15.28 4.04997 14.68 3.04997 13.78 2.74997C12.98 2.44997 11.98 2.84997 11.58 3.44997L7.47998 9.54997"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                />
                <path
                  d="M2.38 18.35V8.55002C2.38 7.15002 2.98 6.65002 4.38 6.65002H5.38C6.78 6.65002 7.38 7.15002 7.38 8.55002V18.35C7.38 19.75 6.78 20.25 5.38 20.25H4.38C2.98 20.25 2.38 19.75 2.38 18.35Z"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p>추천</p>
            </Link>
          </div>
        </div>
      </div>
      <div className="tab-bar-bg"></div>
    </footer>
  );
};

export default Footer;
