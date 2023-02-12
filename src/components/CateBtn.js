import React, { useContext } from "react";
import { MyContext } from "./Context";
import { motion } from "framer-motion";

const CateBtn = ({ idx, obj }) => {
  const { dispatch, selected, setSelected, handleCateBtn, cateBtnRef, setExpanded } = useContext(MyContext);

  return (
    <motion.button
      ref={(e) => (cateBtnRef.current[idx] = e)}
      className={selected === obj ? "selected" : ""}
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      onClick={(e) => {
        handleCateBtn(e.target, idx, obj, dispatch, setSelected);
        setExpanded("");
      }}>
      <p>{obj}</p>
    </motion.button>
  );
};

export default CateBtn;
