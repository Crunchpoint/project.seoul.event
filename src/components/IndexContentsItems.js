import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "./Context";

const IndexContentsItems = () => {
  const { codeNames, dispatch, setSelected } = useContext(MyContext);
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
            <Link
              to="/search"
              onClick={() => {
                dispatch({ type: "SET_CATEGORY", payload: obj });
                setSelected(obj);
              }}>
              <button></button>
              <figcaption>{obj}</figcaption>
            </Link>
          </figure>
        );
      })}
    </div>
  );
};

export default IndexContentsItems;
