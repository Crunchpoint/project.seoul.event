import React, { useContext } from "react";
import { MyContext } from "./Context";
import SideContentsText from "./SideContentsText";
const SideContents = () => {
  const {} = useContext(MyContext);
  return (
    <div className="side-contents">
      <div className="side-contents-inner">
        <SideContentsText />
      </div>
    </div>
  );
};

export default SideContents;
