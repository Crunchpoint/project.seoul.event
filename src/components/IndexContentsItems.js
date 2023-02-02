import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "./Context";
import CateBtn from "./CateBtn";

const IndexContentsItems = () => {
  const { codeNames, dispatch, setSelected, cateBtnRef, scrollIntoView } = useContext(MyContext);
  const filteredCodeNames = [];
  let nameStorage = codeNames?.map((obj, key) => {
    return obj.split("/")[0];
  });
  filteredCodeNames.push(nameStorage);

  return (
    <div className="info-links">
      {filteredCodeNames[0]?.map((obj, key) => {
        return (
          <figure key={key}>
            <Link to="/search">
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
