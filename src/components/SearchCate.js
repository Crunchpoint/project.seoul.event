import React, { useContext } from "react";
import { MyContext } from "./Context";
import { Swiper, SwiperSlide } from "swiper/react";
import CateBtn from "./CateBtn";
import "swiper/scss";

const SearchCate = ({ props }) => {
  const { swiperRef } = useContext(MyContext);
  const filteredCodeNames = [];

  let nameStorage = props?.map((obj, key) => {
    return obj.split("/")[0];
  });

  filteredCodeNames.push(nameStorage);

  return (
    <div className="search-cate">
      <Swiper ref={swiperRef} modules={[]} spaceBetween={10} slidesPerView={"auto"} centeredSlides={false} className="mySwiper">
        {filteredCodeNames[0]?.map((obj, key) => {
          return (
            <SwiperSlide key={key}>
              <CateBtn idx={key} obj={obj} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default SearchCate;
