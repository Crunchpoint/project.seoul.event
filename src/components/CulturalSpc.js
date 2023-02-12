import React, { useContext, useEffect } from "react";
import { MyContext } from "./Context";
import CulturalSpcContents from "./CulturalSpcContents";
import ToTopBtn from "./ToTopBtn";
import SearchCate from "./SearchCate";
import SearchBar from "./SearchBar";

const CulturalSpc = () => {
  const { limit2, setLimit2, lastDataRef2, subjCodes, searchedData2 } = useContext(MyContext);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      setTimeout(() => {
        if (entries[0].isIntersecting) {
          setLimit2(limit2 + 10);
        }
      }, 500);
    });
    if (lastDataRef2.current) {
      observer.observe(lastDataRef2.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [lastDataRef2, setLimit2, limit2, searchedData2]);

  return (
    <section className="cultural-space">
      <ToTopBtn />
      <h1>서울시 종합 문화공간 정보를 확인 해보세요</h1>
      <div className="cultural-space-wrapper">
        <div className="cultural-header">
          <SearchCate props={subjCodes} />
          <SearchBar />
        </div>
        <ul>
          {searchedData2?.slice(0, limit2).map((obj, key) => {
            return (
              <li key={key} className="cultural-space-items">
                <CulturalSpcContents obj={obj} idx={key} />
              </li>
            );
          })}
        </ul>
        {searchedData2?.length > limit2 && (
          <div ref={lastDataRef2} className="loading-data">
            Loading...
          </div>
        )}
      </div>
    </section>
  );
};

export default CulturalSpc;
