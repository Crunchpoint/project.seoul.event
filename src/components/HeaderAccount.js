import React, { useContext } from "react";
import { MyContext } from "./Context";
import { Link } from "react-router-dom";

const HeaderAccount = () => {
  const { user, kakaoLogin, kakaoLogout, logInBox, setLogInBox } = useContext(MyContext);
  const logInFn = (e) => {
    document.addEventListener("click", (e) => {
      e.target.className === "profile-img-item" || e.target.className.animVal === "profile-img-item" ? setLogInBox(true) : setLogInBox(false);
    });
  };
  return (
    <div className="account-btn" onClick={(e) => logInFn(e)}>
      <div className="profile-img">
        {user ? (
          <img className="profile-img-item" src={user.profileImg} alt="" />
        ) : (
          <div className="profile-img-item">
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
          </div>
        )}
      </div>
      <div className={logInBox ? "profile-select active" : "profile-select"}>
        {user ? (
          <ul className="user-on">
            <li>
              <img src={user.profileImg} alt="" />
            </li>
            <li>
              <h2>{user.nickname}</h2>
              <p>{user.email}</p>
              <a href="https://accounts.kakao.com/weblogin/account?&lang=ko" target={"_blank"} rel="noreferrer">
                프로필 수정
              </a>
            </li>
            <li
              className="kakao-logOut"
              onClick={() => {
                kakaoLogout();
              }}>
              <p>로그아웃</p>
            </li>
            <Link to="/recent">
              <li>관심목록</li>
            </Link>
          </ul>
        ) : (
          <ul className="user-none">
            <li
              className="kakao-logIn"
              onClick={() => {
                kakaoLogin();
              }}>
              카카오 로그인
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};
export default HeaderAccount;
