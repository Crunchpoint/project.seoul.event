import React, { useContext } from "react";
import { MyContext } from "./Context";
import IndexContentsSub from "./IndexContentsSub";
const Recommends = () => {
  const { data } = useContext(MyContext);
  // console.log(data);
  return data?.length > 0 ? (
    <div className="recommends">
      {data.slice(0, 5).map((obj, key) => {
        return (
          <div key={key}>
            <IndexContentsSub idx={key} />
          </div>
        );
      })}
    </div>
  ) : null;
};

export default Recommends;
