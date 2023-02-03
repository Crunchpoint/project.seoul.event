import React, { useContext } from "react";
import { MyContext } from "./Context";

const SearchPlace = () => {
  const { guNames, dispatch, selectedDate, elCalendar, optionValue, defaultCal, setOptionValue, daysOfWeek, setSelectedDate } = useContext(MyContext);

  const handleDateChange = (event) => {
    let date = new Date(event.target.value);
    let dayOfWeek = daysOfWeek[date.getDay()];
    setSelectedDate(dayOfWeek);
  };
  return (
    <div className="search-place">
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
      <div className="selected-date">
        {elCalendar.current?.value}&nbsp;{selectedDate}
      </div>
      <input
        ref={elCalendar}
        defaultValue={defaultCal}
        onChange={(e) => {
          dispatch({ type: "SET_DATE", payload: e.target.value });
          handleDateChange(e);
        }}
        type="date"
      />
    </div>
  );
};

export default SearchPlace;
