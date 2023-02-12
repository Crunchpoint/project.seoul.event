import React, { createContext, useEffect, useReducer, useRef, useState } from "react";
import { throttle } from "lodash";
import axios from "axios";

const dataUrl = "https://port-0-express-server-sop272gldlaid6z.gksl2.cloudtype.app/";
const dataUrl10 = "./assets/json/PlaceUrl.json";

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
  const { Kakao } = window;
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
  const [data2, setData2] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchedData, setSearchedData] = useState([]);
  const [searchedData2, setSearchedData2] = useState([]);
  const [recommendedData, setRecommendedData] = useState([]);
  const [highResImg, setHighResImg] = useState([]);
  const [search, setSearch] = useState("");
  const [codeNames, setCodenames] = useState([]);
  const [subjCodes, setSubjCodes] = useState([]);
  const [guNames, setGuNames] = useState([]);
  const [eventDates, setEventDates] = useState([]);
  const [placePic, setPlacePic] = useState([]);
  const [scrollTop, setScrollTop] = useState(0);
  const [selected, setSelected] = useState("전체");
  const [activeTab, setActiveTab] = useState("");
  const [optionValue, setOptionValue] = useState("전체지역");
  const [limit, setLimit] = useState(10);
  const [limit2, setLimit2] = useState(10);
  const [defaultCal, setDefaultCal] = useState(today.toISOString().substr(0, 10));
  const [latLon, setLatLon] = useState([]);
  const [relatedSrcOn, setRelatedSrcOn] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [targetLoc, setTargetLoc] = useState({ name: "현재 위치", lat: "", lng: "" });
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [logInBox, setLogInBox] = useState(false);
  const [mainCont, setMainCont] = useState(false);
  const [like, setLike] = useState(false);
  const elSearchBar = useRef();
  const elCalendar = useRef();
  const lastDataRef = useRef(null);
  const lastDataRef2 = useRef(null);
  const cateBtnRef = useRef([]);
  const swiperRef = useRef(null);
  const relatedRef = useRef([]);
  const codeName = new Set([]);
  const subjCode = new Set([]);
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
        .all([axios.get(dataUrl), axios.get(dataUrl10)])
        .then(
          axios.spread((res1, res10) => {
            // 로컬스토리지에 데이터 저장
            localStorage.setItem("storageData", JSON.stringify(res1));
            // 전체 데이터
            const combinedData = [...storageData.data[0]];
            setData(combinedData);
            // 필터링 데이터(오늘 날짜 이후의 데이터)
            setData2(storageData.data[1]);
            const filteredData = storageData.data[0].filter((obj) => {
              return obj.END_DATE > today.toJSON() && obj.STRTDATE < today.toJSON();
            });
            setFilteredData(filteredData);
            // 이미지 데이터
            const filtedImages = storageData.data[0].map((obj) => {
              return obj.MAIN_IMG;
            });
            setRecommendedData(filtedImages);
            // 구네임 데이터
            storageData.data[0].map((obj) => {
              return guName.add("전체지역").add(obj.GUNAME);
            });
            // 구네임 필터링
            let filteredGuNames = [...guName].filter((obj) => {
              return obj !== "";
            });
            setGuNames([...filteredGuNames]);
            // 코드네임 데이터
            storageData.data[0].map((obj) => {
              return codeName.add("전체").add(obj.CODENAME.split("-")[0]);
            });
            // 코드네임 카테고리 위치 변경
            let copy = [...codeName];
            let replaceCate = copy.splice(4, 1);
            copy.splice(12, 0, replaceCate[0]);
            setCodenames(copy);
            // 코드네임2 데이터
            storageData.data[1].map((obj) => {
              return subjCode.add("전체").add(obj.SUBJCODE);
            });
            let copy2 = [...subjCode];
            let replaceCate2 = copy2.splice(1, 1);
            copy2.splice(7, 0, replaceCate2[0]);
            setSubjCodes(copy2);
            // 이벤트 날짜 데이터
            storageData.data[0].map((obj) => {
              eventDate.add(obj.DATE);
              return setEventDates([...eventDate]);
            });
            // 장소 이미지 데이터
            setPlacePic(res10.data.data);
          })
        )
        .catch((error) => {
          console.log(error);
        });
    }
    axiosData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // 다중 검색 필터링 for data1
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
  // 다중 검색 필터링 for data2
  useEffect(() => {
    const filteredData2 = data2.filter((item) => {
      let categoryMatched = sortedData.category === "" || item.SUBJCODE.includes(sortedData.category);
      let placeMatched = sortedData.place === "" || item.ADDR.includes(sortedData.place);
      let textMatched = item.FAC_NAME.toUpperCase().includes(search.toUpperCase());
      return categoryMatched && placeMatched && textMatched;
    });
    setSearchedData2(filteredData2);
  }, [sortedData, search, data2]);
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
  // 카카오 로그인
  const initKakao = async () => {
    const jsKey = process.env.REACT_APP_KAKAO_KEY;
    if (Kakao && !Kakao.isInitialized()) {
      await Kakao.init(jsKey);
      // console.log(`kakao 초기화 ${Kakao.isInitialized()}`);
    }
  };
  const kakaoLogin = async () => {
    await Kakao.Auth.login({
      success(res) {
        // console.log(res);
        Kakao.Auth.setAccessToken(res.access_token);
        // console.log("카카오 로그인 성공");

        Kakao.API.request({
          url: "/v2/user/me",
          success(res) {
            // console.log("카카오 인가 요청 성공");
            setIsLogin(true);
            const kakaoAccount = res.kakao_account;
            localStorage.setItem("email", kakaoAccount.email);
            localStorage.setItem("profileImg", kakaoAccount.profile.profile_image_url);
            localStorage.setItem("nickname", kakaoAccount.profile.nickname);
            window.location.replace("/");
          },
          fail(error) {
            console.log(error);
          },
        });
      },
      fail(error) {
        console.log(error);
      },
    });
  };
  const kakaoLogout = () => {
    Kakao.Auth.logout((res) => {
      console.log(Kakao.Auth.getAccessToken());
      // console.log(res);
      localStorage.removeItem("email");
      localStorage.removeItem("profileImg");
      localStorage.removeItem("nickname");
      setUser(null);
      window.location.replace("/");
    });
  };
  useEffect(() => {
    initKakao();
    Kakao.Auth.getAccessToken() ? setIsLogin(true) : setIsLogin(false);
  }, [Kakao.Auth, isLogin]);
  useEffect(() => {
    // console.log(isLogin);
    if (isLogin) {
      setUser({
        email: localStorage.getItem("email"),
        profileImg: localStorage.getItem("profileImg"),
        nickname: localStorage.getItem("nickname"),
      });
    }
  }, [isLogin]);
  // 카테고리 버튼 이벤트
  const handleCateBtn = (e, key, obj, dispatch, setSelected) => {
    dispatch({ type: "SET_CATEGORY", payload: obj === "전체" ? "" : obj });
    setSelected(obj);
    setTimeout(() => {
      swiperRef.current.swiper.slideTo(key - 1, 200);
    }, 10);
  };
  // 랜덤 숫자 생성
  useEffect(() => {
    const randomNum = [];
    const usedIndex = new Set();
    while (randomNum.length < 10 && filteredData.length > 0) {
      let randomIndex = Math.floor(Math.random() * filteredData.length);
      if (!usedIndex.has(randomIndex)) {
        randomNum.push(randomIndex);
        usedIndex.add(randomIndex);
      }
    }
    setRanNum(randomNum);
  }, [setRanNum, filteredData]);
  const sessionStorageFn = (key, obj) => {
    if (sessionStorage[key]) {
      sessionStorage.removeItem(key);
    } else {
      sessionStorage.setItem(key, obj.TITLE);
    }
    setLike(!like);
  };
  return (
    <MyContext.Provider
      value={{
        data,
        data2,
        dispatch,
        sortedData,
        filteredData,
        setFilteredData,
        recommendedData,
        setRecommendedData,
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
        limit2,
        setLimit2,
        lastDataRef,
        lastDataRef2,
        throttle,
        searchedData,
        setSearchedData,
        searchedData2,
        setSearchedData2,
        latLon,
        handleCateBtn,
        cateBtnRef,
        swiperRef,
        relatedRef,
        relatedSrcOn,
        setRelatedSrcOn,
        highResImg,
        setHighResImg,
        expanded,
        setExpanded,
        subjCodes,
        setSubjCodes,
        targetLoc,
        setTargetLoc,
        user,
        kakaoLogin,
        kakaoLogout,
        logInBox,
        setLogInBox,
        mainCont,
        setMainCont,
        like,
        setLike,
        sessionStorageFn,
      }}>
      {children}
    </MyContext.Provider>
  );
};

export const MyContext = createContext(null);
export default Context;
// 고화질 이미지 데이터 맵 (굉장히 느려서 사용하지 않음)
// useEffect(() => {
//   recommendedData.map((obj, key) => {
//     const hResImg = new Image();
//     hResImg.src = obj;
//     return (hResImg.onload = () => {
//       // console.log(hResImg);
//       if (hResImg.height > 2000) {
//         setHighResImg((prevHighResImg) => [
//           ...prevHighResImg,
//           {
//             id: key + 1,
//             height: hResImg.height,
//             width: hResImg.width,
//           },
//         ]);
//       }
//     });
//   });
// }, [recommendedData]);
