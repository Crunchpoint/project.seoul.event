import React, { useContext } from "react";
import { MyContext } from "./Context";
import SearchbyPlace from "./SearchbyPlace";

const SearchPlace = () => {
  const { dispatch, selectedDate, elCalendar, defaultCal, daysOfWeek, setSelectedDate } = useContext(MyContext);

  const handleDateChange = (event) => {
    let date = new Date(event.target.value);
    let dayOfWeek = daysOfWeek[date.getDay()];
    setSelectedDate(dayOfWeek);
  };

  return (
    <div className="search-place">
      <SearchbyPlace />
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
