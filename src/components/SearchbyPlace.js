import React, { useContext } from "react";
import { MyContext } from "./Context";

const SearchbyPlace = () => {
  const { guNames, dispatch, optionValue, setOptionValue } = useContext(MyContext);

  return (
    <select
      name="place"
      id="search-by-place"
      value={optionValue}
      onChange={(e) => {
        e.target.value === "전체지역" ? dispatch({ type: "SET_PLACE", payload: "" }) : dispatch({ type: "SET_PLACE", payload: e.target.value });
        setOptionValue(e.target.value);
      }}>
      {guNames?.map((obj, key) => {
        return (
          <option key={key} value={obj}>
            {obj}
          </option>
        );
      })}
    </select>
  );
};
export default SearchbyPlace;
