import React, { useContext } from "react";
import { MyContext } from "./Context";
const Recent = () => {
  const { sessionStorageFn } = useContext(MyContext);
  return (
    <div className="recent-liked">
      <h2>내 관심 목록을 확인 하세요.</h2>
      <ul className="like-list">
        {Object.keys(sessionStorage).map((key, index) => {
          return (
            <li key={index}>
              <div>{sessionStorage.getItem(key)}</div>
              <button onClick={() => sessionStorageFn(key)}>삭제</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Recent;
