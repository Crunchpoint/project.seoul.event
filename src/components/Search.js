import React, { useContext, useEffect } from "react";
import { MyContext } from "./Context";
import SearchCate from "./SearchCate";
import SearchBar from "./SearchBar";
import SearchPlace from "./SearchPlace";
import ToTopBtn from "./ToTopBtn";

const Search = () => {
  const { limit, setLimit, lastDataRef, searchedData, codeNames, sessionStorageFn } = useContext(MyContext);
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
    <div className='search-list'>
      <ToTopBtn />
      <div className='search-header'>
        <SearchPlace />
        <SearchCate props={codeNames} />
        <SearchBar />
      </div>
      <div className='sorted-list'>
        {searchedData?.slice(0, limit).map((obj, key) => {
          return (
            <div key={key} className='main-list'>
              <div className='list-wrapper'>
                <a href={obj.ORG_LINK} target='_blank' rel='noreferrer'>
                  <div className='list-image'>
                    <img src={obj.MAIN_IMG} alt='' />
                  </div>
                </a>
                <div className='list-contents'>
                  <h2>{obj.TITLE}</h2>
                  <svg onClick={() => sessionStorageFn(key, obj)} width='20' height='20' viewBox='0 0 44 41.95' version='1.1'>
                    <defs />
                    <g id='Untitled'>
                      <path
                        className={sessionStorage[key] === obj.TITLE ? "active" : ""}
                        d='M22 39.3L19.95 37.45C16.4167 34.2167 13.5 31.425 11.2 29.075C8.9 26.725 7.06667 24.625 5.7 22.775C4.33333 20.925 3.375 19.25 2.825 17.75C2.275 16.25 2 14.7333 2 13.2C2 10.2 3.00833 7.69167 5.025 5.675C7.04167 3.65833 9.53333 2.65 12.5 2.65C14.4 2.65 16.1583 3.1 17.775 4C19.3917 4.9 20.8 6.2 22 7.9C23.4 6.1 24.8833 4.775 26.45 3.925C28.0167 3.075 29.7 2.65 31.5 2.65C34.4667 2.65 36.9583 3.65833 38.975 5.675C40.9917 7.69167 42 10.2 42 13.2C42 14.7333 41.725 16.25 41.175 17.75C40.625 19.25 39.6667 20.925 38.3 22.775C36.9333 24.625 35.1 26.725 32.8 29.075C30.5 31.425 27.5833 34.2167 24.05 37.45L22 39.3Z'
                        // fill="#ffffff"
                        stroke='#000000'
                        strokeWidth='1'
                        strokeLinecap='butt'
                        strokeLinejoin='round'
                      />
                    </g>
                  </svg>
                  <p>{obj.CODENAME}</p>
                  <p>
                    {obj.GUNAME} {obj.PLACE}
                  </p>
                  {/* <p>테마: {obj.THEMECODE}</p> */}
                  <p>{obj.DATE}</p>
                  <p>연령제한: {obj.USE_TRGT}</p>
                  <p>{obj.USE_FEE}</p>
                </div>
              </div>
            </div>
          );
        })}
        {searchedData?.length > limit && (
          <div ref={lastDataRef} className='loading-data'>
            Loading...
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
