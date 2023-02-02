import React, { useContext } from "react";
import { MyContext } from "./Context";

const CateBtn = ({ idx, obj }) => {
  const { dispatch, selected, setSelected, handleCateBtn, cateBtnRef } = useContext(MyContext);

  return (
    <button ref={(e) => (cateBtnRef.current[idx] = e)} className={selected === obj ? "selected" : ""} onClick={(e) => handleCateBtn(e.target, idx, obj, dispatch, setSelected)}>
      <p>{obj}</p>
    </button>
  );
};

export default CateBtn;
