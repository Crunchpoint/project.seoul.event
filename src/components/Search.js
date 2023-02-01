import React, { useContext, useEffect } from "react";
import { MyContext } from "./Context";
import SearchCate from "./SearchCate";
import SearchBar from "./SearchBar";
import SearchPlace from "./SearchPlace";

const Search = () => {
  const { limit, setLimit, lastDataRef, searchedData } = useContext(MyContext);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      setTimeout(() => {
        if (entries[0].isIntersecting) {
          setLimit(limit + 10);
        }
      }, 500);
    });
    if (lastDataRef.current) {
      observer.observe(lastDataRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [lastDataRef, setLimit, limit, searchedData]);

  return (
    <div className="search-list">
      <button className={window.scrollY > 300 ? "to-top active" : "to-top"} onClick={() => window.scrollTo(0, 0)}>
        ⇧
      </button>
      <SearchBar />
      <SearchCate />
      <SearchPlace />
      <div className="sorted-list">
        {searchedData?.slice(0, limit).map((obj, key) => {
          return (
            <div key={key} className="main-list">
              <div className="list-wrapper">
                <a href={obj.ORG_LINK}>
                  <div className="list-image">
                    <img src={obj.MAIN_IMG} alt="" />
                  </div>
                  <div className="list-contents">
                    <h2>{obj.TITLE}</h2>
                    <p>{obj.CODENAME}</p>
                    <p>
                      {obj.GUNAME} {obj.PLACE}
                    </p>
                    {/* <p>테마: {obj.THEMECODE}</p> */}
                    <p>{obj.DATE}</p>
                    <p>연령제한: {obj.USE_TRGT}</p>
                    <p>{obj.USE_FEE}</p>
                  </div>
                </a>
              </div>
            </div>
          );
        })}
        {searchedData?.length > limit && (
          <div ref={lastDataRef} className="loading-data">
            Loading...
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
