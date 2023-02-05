import React, { useContext } from "react";
import { MyContext } from "./Context";

const CulturalSpcContents = ({ obj, idx }) => {
  const { expanded, setExpanded } = useContext(MyContext);

  const handleExpand = (idx) => {
    setExpanded(idx === expanded ? null : idx);
  };
  console.log(expanded);
  return (
    <>
      <figure>
        <a href={obj.HOMEPAGE} target="_blank" rel="noreferrer">
          <img src={obj.MAIN_IMG} alt="" />
        </a>
      </figure>
      <div className="cultural-space-contents">
        <p>{obj.SUBJCODE}</p>
        <p>{obj.FAC_NAME}</p>
      </div>
      <div className={expanded === idx ? "see-more active" : "see-more"}>
        <button onClick={() => handleExpand(idx)}></button>
        <div>
          <p>{obj.ADDR.replace(/\)/g, "")}</p>
          <p>{obj.PHNE}</p>
          <p>휴일: {obj.CLOSEDAY}</p>
          <p>{obj.FAC_DESC.replace(/&nbsp;|&#39;|&gt;|&lt;|&#45;|<[^>]*>/g, "")}</p>
        </div>
      </div>
    </>
  );
};

export default CulturalSpcContents;
