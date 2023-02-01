import React, { useContext, useEffect } from "react";
import { MyContext } from "./Context";

const SearchBar = () => {
  const { setSearch, elSearchBar, elCalendar, dispatch, setSelectedDate, daysOfWeek, defaultCal } = useContext(MyContext);

  const handleDateChange = (event) => {
    let date = new Date(event.target.value);
    let dayOfWeek = daysOfWeek[date.getDay()];
    setSelectedDate(dayOfWeek);
  };

  useEffect(() => {
    elSearchBar.current.focus();
  }, [elSearchBar]);

  return (
    <div className="search-bar">
      <input
        ref={elSearchBar}
        type="search"
        placeholder="제목을 입력하세요"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
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

export default SearchBar;
