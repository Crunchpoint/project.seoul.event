import React, { useContext } from "react";
import { MyContext } from "./Context";

const IndexContentsSub = ({ idx }) => {
  const { ranNum, filteredData } = useContext(MyContext);

  return filteredData?.length > 0 && ranNum?.length > 0 ? (
    <a href={filteredData[ranNum[idx]]?.ORG_LINK} target="_blank" rel="noreferrer">
      <div className="text-box">
        <p>오늘의 추천</p>
        <p>{filteredData[ranNum[idx]]?.CODENAME}</p>
        <h2>{filteredData[ranNum[idx]]?.TITLE}</h2>
      </div>
      <img src={filteredData[ranNum[idx]]?.MAIN_IMG} alt="#" />
    </a>
  ) : null;
};

export default IndexContentsSub;
