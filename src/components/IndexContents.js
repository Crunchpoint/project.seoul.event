import React, { useContext, useEffect } from "react";
import IndexContentsItems from "./IndexContentsItems";
import IndexContentsPlace from "./IndexContentsPlace";
import IndexContentsDate from "./IndexContentsDate";
import { MyContext } from "./Context";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";

const IndexContents = () => {
  const { data, ranNum, setRanNum } = useContext(MyContext);

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
                <a href={data[ranNum[key]]?.ORG_LINK}>
                  <img src={data[ranNum[key]]?.MAIN_IMG} alt="#" />
                </a>
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
