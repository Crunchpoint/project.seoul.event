import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { MyContext } from "./Context";
import { motion } from "framer-motion";
const SideContentsText = () => {
  const {} = useContext(MyContext);
  const pathName = useLocation().pathname;

  return (
    <>
      {pathName === "/" ? (
        <motion.div
          className="side-contents-text"
          initial={{ y: 50, opacity: 0 }}
          animate={{
            y: -50,
            opacity: [0, 1],
            transition: {
              duration: 0.5,
              ease: "easeInOut",
            },
          }}>
          <p>애니메이션 수정중</p>
          <h2>이벤트</h2>
          <p>이벤트를 확인해보세요.</p>
        </motion.div>
      ) : pathName === "/search" ? (
        <motion.div
          className="side-contents-text2"
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: -50,
            opacity: [0, 1],
            transition: {
              duration: 0.5,
              ease: "easeInOut",
            },
          }}>
          <p>애니메이션 수정중</p>
          <h2>검색</h2>
          <p>검색을 해보세요.</p>
        </motion.div>
      ) : pathName === "/culturalspc" ? (
        <motion.div
          className="side-contents-text"
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: -50,
            opacity: [0, 1],
            transition: {
              duration: 0.5,
              ease: "easeInOut",
            },
          }}>
          <p>애니메이션 수정중</p>
          <h2>문화공간</h2>
          <p>문화공간을 확인해보세요.</p>
        </motion.div>
      ) : pathName === "/map" ? (
        <motion.div
          className="side-contents-text"
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: -50,
            opacity: [0, 1],
            transition: {
              duration: 0.5,
              ease: "easeInOut",
            },
          }}>
          <p>애니메이션 수정중</p>
          <h2>지도</h2>
          <p>지도를 확인해보세요.</p>
        </motion.div>
      ) : pathName === "/recommends" ? (
        <motion.div
          className="side-contents-text"
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: -50,
            opacity: [0, 1],
            transition: {
              duration: 0.5,
              ease: "easeInOut",
            },
          }}>
          <p>애니메이션 수정중</p>
          <h2>추천</h2>
          <p>추천을 확인해보세요.</p>
        </motion.div>
      ) : null}
    </>
  );
};
export default SideContentsText;
