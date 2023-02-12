import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "./Context";

const CulturalSpcContents = ({ obj, idx }) => {
  const { expanded, setExpanded, setTargetLoc } = useContext(MyContext);

  const handleExpand = (idx) => {
    setExpanded(idx === expanded ? null : idx);
  };

  return (
    <>
      <figure>
        <a href={obj.HOMEPAGE} target="_blank" rel="noreferrer">
          <img src={obj.MAIN_IMG} alt="" />
        </a>
      </figure>
      <div className="cultural-space-contents">
        <div className="text-wrapper">
          <p>{obj.FAC_NAME.replace(/&quot;|<[^>]*>/g, "")}</p>
          <p>{obj.SUBJCODE}</p>
        </div>
        <Link to="/map">
          <button onClick={() => setTargetLoc({ name: obj.FAC_NAME, lat: obj.X_COORD, lng: obj.Y_COORD })}>위치보기</button>
        </Link>
      </div>
      <div className={expanded === idx ? "see-more active" : "see-more"}>
        <button onClick={() => handleExpand(idx)}></button>
        <div>
          <p>{obj.ADDR.replace(/\)/g, "")}</p>
          <p>{obj.PHNE}</p>
          <p>휴일: {obj.CLOSEDAY}</p>
          <p>{obj.FAC_DESC.replace(/&nbsp;|&#39;|&gt;|&lt;|&#45;|&quot;|<[^>]*>/g, "")}</p>
        </div>
      </div>
    </>
  );
};

export default CulturalSpcContents;
