import React, { useContext, useEffect } from "react";
import SearchBarSub from "./SearchBarSub";
import { MyContext } from "./Context";

const SearchBar = () => {
  const { setSearch, elSearchBar, elCalendar, dispatch, setSelectedDate, daysOfWeek, defaultCal, setOptionValue, swiperRef, today, setSelected, relatedRef, searchedData } = useContext(MyContext);
  let idx = 0;
  useEffect(() => {
    elSearchBar.current.focus();
  }, [elSearchBar]);

  const handleRelated = (e) => {
    if (e.keyCode === 13) {
      setSearch(relatedRef.current[idx - 1].innerText);
      elSearchBar.current.placeholder = relatedRef.current[idx - 1].innerText;
      elSearchBar.current.value = "";
    } else if (e.keyCode === 40 && idx < searchedData.length) {
      elSearchBar.current.value = relatedRef.current[idx].innerText;
      idx++;
    } else if (e.keyCode === 38 && idx > 0) {
      idx--;
      elSearchBar.current.value = relatedRef.current[idx].innerText;
    }
    // setTimeout(() => {
    //   elSearchBar.current.focus();
    //   elSearchBar.current.setSelectionRange(elSearchBar.current.value.length, elSearchBar.current.value.length);
    // }, 5);
    // setTimeout(() => {
    //   elSearchBar.current.dispatchEvent(new KeyboardEvent("keydown", { key: "End" }));
    // }, 100);
  };

  return (
    <div className="search-bar">
      <div className="search-bar-wrapper">
        <input
          ref={elSearchBar}
          type="search"
          placeholder="제목을 입력하세요"
          onChange={(e) => {
            setSearch(e.target.value);
            elSearchBar.current.placeholder = "제목을 입력하세요";
          }}
          onClick={(e) => {}}
          onKeyDown={(e) => handleRelated(e)}
        />
        <SearchBarSub idx={idx} />
      </div>
      <button
        className="reset-btn"
        onClick={(e) => {
          dispatch({ type: "SET_CATEGORY", payload: "" });
          dispatch({ type: "SET_DATE", payload: defaultCal });
          dispatch({ type: "SET_PLACE", payload: "" });
          setSelectedDate(daysOfWeek[today.getDay()]);
          setSelected("전체");
          setOptionValue("전체지역");
          setSearch("");
          swiperRef.current.swiper.slideTo(0);
          elCalendar.current.value = defaultCal;
          elSearchBar.current.value = "";
          elSearchBar.current.placeholder = "제목을 입력하세요";
        }}>
        초기화
      </button>
    </div>
  );
};

export default SearchBar;
