import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { MyContext } from "./Context";

const SearchBarSub = ({ idx }) => {
  const { searchedData, searchedData2, elSearchBar, setSearch, relatedRef, relatedSrcOn } = useContext(MyContext);
  const pathName = useLocation().pathname;

  return (
    elSearchBar.current?.value.length > 0 && (
      <div className={relatedSrcOn === true ? "list-wrapper active" : "list-wrapper"}>
        <ul>
          {pathName === "/search"
            ? searchedData.map((obj, key) => {
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
              })
            : searchedData2.map((obj, key) => {
                return (
                  <li
                    className={elSearchBar.current?.value === obj.FAC_NAME ? "active" : ""}
                    ref={(e) => (relatedRef.current[key] = e)}
                    key={key}
                    onClick={(e) => {
                      setSearch(obj.FAC_NAME);
                      elSearchBar.current.placeholder = obj.FAC_NAME;
                      elSearchBar.current.value = "";
                    }}>
                    {obj.FAC_NAME}
                  </li>
                );
              })}
        </ul>
      </div>
    )
  );
};

export default SearchBarSub;
