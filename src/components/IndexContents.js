import React, { useContext } from "react";
import IndexContentsItems from "./IndexContentsItems";
import IndexContentsPlace from "./IndexContentsPlace";
import IndexContentsDate from "./IndexContentsDate";
import IndexContentsSub from "./IndexContentsSub";
import { MyContext } from "./Context";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";

const IndexContents = () => {
  const { ranNum, filteredData } = useContext(MyContext);

  // run this code only once when the component is mounted
  return filteredData?.length > 0 && ranNum?.length > 0 ? (
    <>
      <div className="container1">
        <div className="swiper-title">
          <h2>오늘의 추천 문화 정보</h2>
          <p>Seoul Event에서 오늘의 추천 문화정보를 확인하세요.</p>
        </div>
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={15}
          slidesPerView={"auto"}
          centeredSlides={true}
          loop={Infinity}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          className="mySwiper">
          {filteredData.slice(0, 5).map((obj, key) => {
            return (
              <SwiperSlide key={key}>
                <IndexContentsSub idx={key} />
              </SwiperSlide>
            );
          })}
        </Swiper>
        <IndexContentsItems />
      </div>
      <div className="container2">
        <IndexContentsPlace />
      </div>
      <div className="container3">
        <IndexContentsDate />
      </div>
    </>
  ) : (
    <h2>loading</h2>
  );
};

export default IndexContents;
