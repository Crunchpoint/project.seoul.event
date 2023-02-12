import React, { useContext } from "react";
import { MyContext } from "./Context";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const IndexContentsDate = () => {
  const { year, month, date, dispatch, setSelectedDate, setDefaultCal } = useContext(MyContext);
  let calcDate = [];
  let dateArray = [];

  [...Array(14)].forEach((_, i) => {
    let today = new Date(year, month, date + i),
      tMonth = today.getMonth() + 1,
      tDate = today.getDate(),
      tDay = today.getDay();
    tDay = ["일", "월", "화", "수", "목", "금", "토"][tDay];
    dateArray.push([tMonth, tDate, tDay]);
    calcDate.push(new Date(today.getTime() + 9 * 60 * 60 * 1000).toJSON());
  });
  return (
    <div className="date-links">
      <h2>날짜별</h2>
      <Swiper
        modules={[]}
        spaceBetween={15}
        slidesPerView={"auto"}
        centeredSlides={false}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        className="mySwiper">
        {dateArray.map((obj, key) => {
          return (
            <SwiperSlide key={key}>
              <motion.div whileHover={{ scale: 1.2 }}>
                <Link
                  to="/search"
                  onClick={() => {
                    dispatch({ type: "SET_DATE", payload: calcDate[key] });
                    setDefaultCal(calcDate[key].substr(0, 10));
                    setSelectedDate(obj[2] + "요일");
                  }}>
                  <p className={obj[2] === "토" ? "colorBlue" : obj[2] === "일" ? "colorRed" : ""}>{obj[2]}</p>
                  <p className={obj[2] === "토" ? "colorBlue" : obj[2] === "일" ? "colorRed" : ""}>
                    {obj[0]}/{obj[1]}
                  </p>
                </Link>
              </motion.div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default IndexContentsDate;
