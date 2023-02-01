import React, { useContext } from "react";
import { MyContext } from "./Context";

const SearchPlace = () => {
  const { guNames, dispatch, selectedDate, elCalendar, optionValue } = useContext(MyContext);

  return (
    <div className="search-place">
      <div className="selected-date">
        {elCalendar.current?.value}&nbsp;{selectedDate}
      </div>
      <select
        name="place"
        id="search-by-place"
        defaultValue={optionValue}
        onChange={(e) => {
          e.target.value === "전체" ? dispatch({ type: "SET_PLACE", payload: "" }) : dispatch({ type: "SET_PLACE", payload: e.target.value });
        }}>
        <option value="전체">전체지역</option>
        {guNames?.map((obj, key) => {
          return (
            <option key={key} value={obj}>
              {obj}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SearchPlace;
