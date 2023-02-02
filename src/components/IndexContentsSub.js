import React, { useContext } from "react";
import { MyContext } from "./Context";

const IndexContentsSub = ({ idx }) => {
  const { data, ranNum } = useContext(MyContext);

  return data?.length > 0 && ranNum?.length > 0 ? (
    <a href={data[ranNum[idx]]?.ORG_LINK}>
      <img src={data[ranNum[idx]]?.MAIN_IMG} alt="#" />
    </a>
  ) : null;
};

export default IndexContentsSub;
