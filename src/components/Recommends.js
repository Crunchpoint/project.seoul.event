import React, { useContext } from "react";
import { MyContext } from "./Context";
import IndexContentsSub from "./IndexContentsSub";
const Recommends = () => {
  const { data } = useContext(MyContext);

  return data?.length > 0 ? (
    <div className="recommends">
      <div className="recommends-wrapper">
        {data.slice(0, 5).map((obj, key) => {
          return (
            <div key={key}>
              <IndexContentsSub idx={key} />
            </div>
          );
        })}
      </div>
    </div>
  ) : null;
};

export default Recommends;
