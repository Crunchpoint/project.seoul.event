import React, { createContext, useEffect, useReducer, useRef, useState } from "react";
import { throttle } from "lodash";
import axios from "axios";

const dataUrl = `http://openapi.seoul.go.kr:8088/${process.env.REACT_APP_API_KEY}/json/culturalEventInfo/1/1000/`;
const dataUrl2 = `http://openapi.seoul.go.kr:8088/${process.env.REACT_APP_API_KEY}/json/culturalEventInfo/1001/2000/`;
const dataUrl3 = `http://openapi.seoul.go.kr:8088/${process.env.REACT_APP_API_KEY}/json/culturalEventInfo/2001/3000/`;
const dataUrl4 = `http://openapi.seoul.go.kr:8088/${process.env.REACT_APP_API_KEY}/json/culturalEventInfo/3001/3500/`;
const dataUrl5 = "./assets/json/PlaceUrl.json";

const infoFn = (state, action) => {
  switch (action.type) {
    case "SET_CATEGORY":
      return { ...state, category: action.payload };
    case "SET_DATE":
      return { ...state, date: action.payload };
    case "SET_PLACE":
      return { ...state, place: action.payload };
    default:
      return state;
  }
};

const Context = ({ children }) => {
  const newDate = new Date(),
    today = new Date(newDate.getTime() + (newDate.getTimezoneOffset() + 9 * 60) * 60000),
    year = today.getFullYear(),
    month = today.getMonth(),
    date = today.getDate(),
    day = today.getDay();
  const [ranNum, setRanNum] = useState();
  // eslint-disable-next-line no-unused-vars
  const storageData = JSON.parse(localStorage.getItem("storageData"));
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchedData, setSearchedData] = useState([]);
  const [search, setSearch] = useState("");
  const [codeNames, setCodenames] = useState([]);
  const [guNames, setGuNames] = useState([]);
  const [eventDates, setEventDates] = useState([]);
  const [placePic, setPlacePic] = useState([]);
  const [scrollTop, setScrollTop] = useState(0);
  const [selected, setSelected] = useState("전체");
  const [activeTab, setActiveTab] = useState("");
  const [optionValue, setOptionValue] = useState("전체지역");
  const [limit, setLimit] = useState(10);
  const [defaultCal, setDefaultCal] = useState(today.toISOString().substr(0, 10));
  const [latLon, setLatLon] = useState([]);
  const elSearchBar = useRef();
  const elCalendar = useRef();
  const lastDataRef = useRef(null);
  const cateBtnRef = useRef([]);
  const swiperRef = useRef(null);
  const relatedRef = useRef([]);
  const codeName = new Set([]);
  const guName = new Set([]);
  const eventDate = new Set([]);
  const daysOfWeek = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
  const [selectedDate, setSelectedDate] = useState(daysOfWeek[today.getDay()]);
  // 리듀서 데이터
  const [sortedData, dispatch] = useReducer(infoFn, {
    category: "",
    date: defaultCal,
    place: "",
  });

  // axios 데이터 (최초 한번만 실행)
  useEffect(() => {
    async function axiosData() {
      await axios
        .all([axios.get(dataUrl), axios.get(dataUrl2), axios.get(dataUrl3), axios.get(dataUrl4), axios.get(dataUrl5)])
        .then(
          axios.spread((res1, res2, res3, res4, res5) => {
            localStorage.setItem("storageData", JSON.stringify(res1));
            // 전체 데이터
            const combinedData = [...res1.data.culturalEventInfo.row, ...res2.data.culturalEventInfo.row, ...res3.data.culturalEventInfo.row, ...res4.data.culturalEventInfo.row];
            setData(combinedData);
            // 필터링 데이터
            const filteredData = res1.data.culturalEventInfo.row.filter((obj) => {
              return obj.END_DATE > today.toJSON() && obj.STRTDATE < today.toJSON();
            });
            setFilteredData(filteredData);
            // 구네임 데이터
            res1.data.culturalEventInfo.row.map((obj) => {
              return guName.add("전체지역").add(obj.GUNAME);
            });
            // 구네임 필터링
            let filteredGuNames = [...guName].filter((obj) => {
              return obj !== "";
            });
            setGuNames([...filteredGuNames]);
            // 코드네임 데이터
            res1.data.culturalEventInfo.row.map((obj) => {
              return codeName.add("전체").add(obj.CODENAME.split("-")[0]);
            });
            // 코드네임 카테고리 위치 변경
            let copy = [...codeName];
            let replaceCate = copy.splice(2, 1);
            copy.splice(12, 0, replaceCate[0]);
            setCodenames(copy);
            // 이벤트 날짜 데이터
            res1.data.culturalEventInfo.row.map((obj) => {
              eventDate.add(obj.DATE);
              return setEventDates([...eventDate]);
            });
            // 장소 이미지 데이터
            setPlacePic(res5.data.data);
          })
        )
        .catch((error) => {
          console.log(error);
        });
    }
    axiosData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // 다중 검색 필터링
  useEffect(() => {
    const filteredData = data.filter((item) => {
      let categoryMatched = sortedData.category === "" || item.CODENAME.includes(sortedData.category);
      let placeMatched = sortedData.place === "" || item.GUNAME.includes(sortedData.place);
      let dateMatched = sortedData.date === "" || item.END_DATE > sortedData.date;
      let textMatched = item.TITLE.toUpperCase().includes(search.toUpperCase());
      return categoryMatched && dateMatched && placeMatched && textMatched;
    });
    setSearchedData(filteredData);
  }, [sortedData, search, data]);
  // 스크롤 이밴트
  useEffect(() => {
    const handleScroll = throttle((event) => {
      setScrollTop(window.scrollY);
    }, 100);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [data]);
  // 현재 위치
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLatLon([position.coords.latitude, position.coords.longitude]);
    });
  }, []);
  // 카테고리 버튼 이벤트
  const handleCateBtn = (e, key, obj, dispatch, setSelected) => {
    obj === "전체" ? dispatch({ type: "SET_CATEGORY", payload: "" }) : dispatch({ type: "SET_CATEGORY", payload: obj });
    setSelected(obj);
    setTimeout(() => {
      swiperRef.current.swiper.slideTo(key - 2, 300);
    }, 10);
  };
  useEffect(() => {
    const randomNum = [];
    const usedIndex = new Set();
    while (randomNum.length < 10 && data.length > 0) {
      let randomIndex = Math.floor(Math.random() * data.length);
      if (!usedIndex.has(randomIndex)) {
        randomNum.push(randomIndex);
        usedIndex.add(randomIndex);
      }
    }
    setRanNum(randomNum);
  }, [setRanNum, data]);

  return (
    <MyContext.Provider
      value={{
        data,
        dispatch,
        sortedData,
        filteredData,
        setFilteredData,
        ranNum,
        setRanNum,
        guNames,
        eventDates,
        placePic,
        codeNames,
        today,
        year,
        month,
        date,
        day,
        search,
        setSearch,
        scrollTop,
        elSearchBar,
        elCalendar,
        selected,
        setSelected,
        selectedDate,
        setSelectedDate,
        daysOfWeek,
        activeTab,
        setActiveTab,
        optionValue,
        setOptionValue,
        defaultCal,
        setDefaultCal,
        limit,
        setLimit,
        lastDataRef,
        throttle,
        searchedData,
        setSearchedData,
        latLon,
        handleCateBtn,
        cateBtnRef,
        swiperRef,
        relatedRef,
      }}>
      {children}
    </MyContext.Provider>
  );
};

export const MyContext = createContext(null);
export default Context;
