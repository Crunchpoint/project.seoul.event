import React, { useContext } from "react";
import { MyContext } from "./Context";

const SearchBarSub = ({ idx }) => {
  const { searchedData, elSearchBar, setSearch, relatedRef } = useContext(MyContext);

  return (
    elSearchBar.current?.value.length > 0 && (
      <div className="list-wrapper">
        <ul className={elSearchBar.current?.value.length ? "active" : ""}>
          {searchedData.map((obj, key) => {
            return (
              <li
                className={elSearchBar.current?.value === obj.TITLE ? "active" : ""}
                ref={(e) => (relatedRef.current[key] = e)}
                key={key}
                onClick={(e) => {
                  setSearch(obj.TITLE);
                  elSearchBar.current.placeholder = obj.TITLE;
                  elSearchBar.current.value = "";
                }}>
                {obj.TITLE}
              </li>
            );
          })}
        </ul>
      </div>
    )
  );
};

export default SearchBarSub;
