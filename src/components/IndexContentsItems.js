import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "./Context";
import CateBtn from "./CateBtn";

const IndexContentsItems = () => {
  const { codeNames } = useContext(MyContext);
  const filteredCodeNames = [];
  let nameStorage = codeNames?.map((obj, key) => {
    return obj.split("/")[0];
  });
  filteredCodeNames.push(nameStorage);
  filteredCodeNames[0].splice(0, 1);

  return (
    <div className="info-links">
      {filteredCodeNames[0]?.map((obj, key) => {
        return (
          <figure key={key}>
            <Link to="/search">
              <img src="" alt="" />
              <CateBtn idx={key} obj={obj} />
              <figcaption>{obj}</figcaption>
            </Link>
          </figure>
        );
      })}
    </div>
  );
};

export default IndexContentsItems;
