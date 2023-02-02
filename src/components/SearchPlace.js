import React, { useContext } from "react";
import { MyContext } from "./Context";

const SearchPlace = () => {
  const { guNames, dispatch, selectedDate, elCalendar, optionValue, setSelected, setOptionValue, defaultCal, swiperRef, setSelectedDate, daysOfWeek, today } = useContext(MyContext);

  return (
    <div className="search-place">
      <button
        className="reset-btn"
        onClick={(e) => {
          swiperRef.current.swiper.slideTo(0);
          dispatch({ type: "SET_CATEGORY", payload: "" });
          dispatch({ type: "SET_DATE", payload: defaultCal });
          dispatch({ type: "SET_PLACE", payload: "" });
          elCalendar.current.value = defaultCal;
          setSelectedDate(daysOfWeek[today.getDay()]);
          setSelected("전체");
          setOptionValue("전체지역");
        }}>
        clear
      </button>
      <div className="selected-date">
        {elCalendar.current?.value}&nbsp;{selectedDate}
      </div>
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
    </div>
  );
};

export default SearchPlace;
