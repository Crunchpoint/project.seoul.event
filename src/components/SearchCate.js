import React, { useContext } from "react";
import { MyContext } from "./Context";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";

const SearchCate = () => {
  const { dispatch, codeNames, selected, setSelected, sortedData } = useContext(MyContext);
  const filteredCodeNames = [];

  let nameStorage = codeNames?.map((obj, key) => {
    return obj.split("/")[0];
  });
  filteredCodeNames.push(nameStorage);

  return (
    <div className="search-cate">
      <Swiper modules={[]} spaceBetween={10} slidesPerView={"6"} centeredSlides={false} className="mySwiper">
        <SwiperSlide>
          <button
            className={selected === "전체" ? "selected" : ""}
            onClick={(e) => {
              dispatch({ type: "SET_CATEGORY", payload: "" });
              setSelected("전체");
            }}>
            전체
          </button>
        </SwiperSlide>
        {filteredCodeNames[0]?.map((obj, key) => {
          return (
            <SwiperSlide key={key}>
              <button
                value={sortedData.category}
                className={selected === obj ? "selected" : ""}
                onClick={(e) => {
                  dispatch({ type: "SET_CATEGORY", payload: obj });
                  setSelected(obj);
                }}>
                {obj}
              </button>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default SearchCate;
