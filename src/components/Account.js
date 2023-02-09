import { MyContext } from "./Context";
import React, { useContext } from "react";

const Account = () => {
  const { user, kakaoLogin, kakaoLogout } = useContext(MyContext);

  console.log(user);
  return (
    <div className="account-main">
      {user ? (
        <div className="kakao-logOut">
          <button onClick={kakaoLogout}>로그아웃</button>
          <img src={user.profileImg} alt="" />
          <h4>{user.nickname}</h4>
          <h4>{user.email}</h4>
        </div>
      ) : (
        <button
          className="kakao-logIn"
          onClick={() => {
            kakaoLogin();
            setTimeout(() => {
              window.location.replace("/");
            }, 600);
          }}>
          <img src="//k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg" width="222" alt="카카오 로그인 버튼" />
        </button>
      )}
    </div>
  );
};
export default Account;
