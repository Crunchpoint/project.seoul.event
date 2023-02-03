import React, { useContext } from "react";
import IndexContentsItems from "./IndexContentsItems";
import IndexContentsPlace from "./IndexContentsPlace";
import IndexContentsDate from "./IndexContentsDate";
import IndexContentsSub from "./IndexContentsSub";
import { MyContext } from "./Context";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";

const IndexContents = () => {
  const { data, ranNum } = useContext(MyContext);

  // run this code only once when the component is mounted
  return data?.length > 0 && ranNum?.length > 0 ? (
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
          {data.slice(0, 5).map((obj, key) => {
            return (
              <SwiperSlide key={key}>
                <IndexContentsSub idx={key} />
              </SwiperSlide>
            );
          })}
          <button className="recommend">
            <Link to="/recommends"> + 모두보기</Link>
          </button>
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
