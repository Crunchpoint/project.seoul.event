import React, { useContext } from "react";
import { MyContext } from "./Context";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import "swiper/scss";

const IndexContentsPlace = () => {
  const { guNames, placePic, dispatch, setOptionValue } = useContext(MyContext);

  return placePic.length > 0 ? (
    <div className="place-links">
      <h2>장소별</h2>
      <Swiper spaceBetween={15} slidesPerView={"auto"} centeredSlides={false} className="mySwiper">
        {guNames?.map((obj, key) => {
          return (
            <SwiperSlide key={key}>
              <figure>
                <Link to="/search">
                  <img src={placePic[key].url} alt="" />
                  <figcaption
                    onClick={(e) => {
                      obj === "전체지역" ? dispatch({ type: "SET_PLACE", payload: "" }) : dispatch({ type: "SET_PLACE", payload: obj });
                      setOptionValue(obj);
                    }}>
                    {obj}
                  </figcaption>
                </Link>
              </figure>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  ) : (
    <p></p>
  );
};

export default IndexContentsPlace;
