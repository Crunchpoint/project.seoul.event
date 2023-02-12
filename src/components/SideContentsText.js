import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { MyContext } from "./Context";
import { motion } from "framer-motion";
const SideContentsText = () => {
  const { selected, searchedData, searchedData2 } = useContext(MyContext);
  const pathName = useLocation().pathname;

  const pages = [
    { path: "/", title: "안녕하세요", description: "로그인을 하고 이벤트 정보를 확인해보세요." },
    {
      path: "/search",
      title: "검색",
      description: selected === "전체" ? "키워드입력 또는 카테고리를 선택해보세요." : `${selected} 카테고리를 선택하셨습니다.`,
      result: `${searchedData.length} 개의 검색 결과가 있습니다.`,
    },
    {
      path: "/culturalspc",
      title: "문화공간",
      description: selected === "전체" ? "키워드입력 또는 카테고리를 선택해보세요." : `${selected} 카테고리를 선택하셨습니다.`,
      result: `${searchedData2.length} 개의 검색 결과가 있습니다.`,
    },
    { path: "/map", title: "지도", description: "주변 정보를 확인해보세요." },
    { path: "/recommends", title: "추천", description: "오늘의 추천 문화정보 입니다. " },
  ];

  return (
    <>
      {pages.map((el) => {
        if (pathName === el.path) {
          return (
            <motion.div key={el.path} className="side-contents-text" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1, transition: { duration: 0.75, ease: "easeInOut" } }}>
              <h2>{el.title}</h2>
              <motion.p key={selected} initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } }}>
                {el.description}
              </motion.p>
              <motion.p
                key={el.path === "/search" ? searchedData : el.path === "/culturalspc" ? searchedData2 : null}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.15, ease: "easeInOut" } }}>
                {el.result}
              </motion.p>
            </motion.div>
          );
        } else {
          return null;
        }
      })}
    </>
  );
};
export default SideContentsText;
