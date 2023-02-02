import React, { useContext, useEffect } from "react";
import { MyContext } from "./Context";
const { kakao } = window;

const Map = () => {
  const { latLon } = useContext(MyContext);

  useEffect(() => {
    let placeOverlay = new kakao.maps.CustomOverlay({ zIndex: 1 }),
      contentNode = document.createElement("div"), // 커스텀 오버레이의 컨텐츠 엘리먼트 입니다
      markers = [], // 마커를 담을 배열입니다
      currCategory = ""; // 현재 선택된 카테고리를 가지고 있을 변수입니다

    let mapContainer = document.getElementById("map"), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
        level: 2, // 지도의 확대 레벨
        maxLevel: 3,
      };
    // 지도를 생성합니다
    let map = new kakao.maps.Map(mapContainer, mapOption);

    // 현재 위치를 받아오는 변수
    let locPosition;
    latLon.length > 0 ? (locPosition = new kakao.maps.LatLng(latLon[0], latLon[1])) : (locPosition = new kakao.maps.LatLng(37.56634, 126.97945));
    // 지도 중심좌표를 접속위치로 변경합니다
    map.setCenter(locPosition);
    displayMarker(locPosition);

    function displayMarker(locPosition) {
      // 마커를 생성합니다
      let marker = new kakao.maps.Marker({
        map: map,
        position: locPosition,
      });
    }

    // btn-loc 클릭시 현재 위치로 이동
    const btnLoc = document.getElementById("loc-btn");
    btnLoc.addEventListener("click", () => {
      latLon.length > 0 ? (locPosition = new kakao.maps.LatLng(latLon[0], latLon[1])) : (locPosition = new kakao.maps.LatLng(37.56634, 126.97945));
      // 지도 중심좌표를 접속위치로 변경합니다
      map.panTo(locPosition);
    });

    // 장소 검색 객체를 생성합니다
    let ps = new kakao.maps.services.Places(map);
    // // 수정중
    // // 키워드로 장소를 검색합니다
    // ps.keywordSearch("이태원 맛집", placesSearchCB);

    // // 키워드 검색 완료 시 호출되는 콜백함수 입니다
    // function placesSearchCB(data, status, pagination) {
    //   if (status === kakao.maps.services.Status.OK) {
    //     // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
    //     // LatLngBounds 객체에 좌표를 추가합니다
    //     var bounds = new kakao.maps.LatLngBounds();

    //     for (var i = 0; i < data.length; i++) {
    //       displayMarker(data[i]);
    //       bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
    //     }

    //     // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    //     map.setBounds(bounds);
    //   }
    // }
    // // 수정중
    // 지도에 idle 이벤트를 등록합니다
    kakao.maps.event.addListener(map, "idle", searchPlaces);

    // 커스텀 오버레이의 컨텐츠 노드에 css class를 추가합니다
    contentNode.className = "placeinfo_wrap";

    // 커스텀 오버레이의 컨텐츠 노드에 mousedown, touchstart 이벤트가 발생했을때
    // 지도 객체에 이벤트가 전달되지 않도록 이벤트 핸들러로 kakao.maps.event.preventMap 메소드를 등록합니다
    addEventHandle(contentNode, "mousedown", kakao.maps.event.preventMap);
    addEventHandle(contentNode, "touchstart", kakao.maps.event.preventMap);

    // 커스텀 오버레이 컨텐츠를 설정합니다
    placeOverlay.setContent(contentNode);

    // 각 카테고리에 클릭 이벤트를 등록합니다
    addCategoryClickEvent();

    // 엘리먼트에 이벤트 핸들러를 등록하는 함수입니다
    function addEventHandle(target, type, callback) {
      if (target.addEventListener) {
        target.addEventListener(type, callback);
      } else {
        target.attachEvent("on" + type, callback);
      }
    }

    // 카테고리 검색을 요청하는 함수입니다
    function searchPlaces() {
      if (!currCategory) {
        return;
      }

      // 커스텀 오버레이를 숨깁니다
      placeOverlay.setMap(null);

      // 지도에 표시되고 있는 마커를 제거합니다
      removeMarker();

      ps.categorySearch(currCategory, placesSearchCB, { useMapBounds: true });
    }

    // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        // 정상적으로 검색이 완료됐으면 지도에 마커를 표출합니다
        displayPlaces(data);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        // 검색결과가 없는경우 해야할 처리가 있다면 이곳에 작성해 주세요
      } else if (status === kakao.maps.services.Status.ERROR) {
        // 에러로 인해 검색결과가 나오지 않은 경우 해야할 처리가 있다면 이곳에 작성해 주세요
      }
    }

    // 지도에 마커를 표출하는 함수입니다
    function displayPlaces(places) {
      // 몇번째 카테고리가 선택되어 있는지 얻어옵니다
      // 이 순서는 스프라이트 이미지에서의 위치를 계산하는데 사용됩니다
      let order = document.getElementById(currCategory).getAttribute("data-order");

      for (let i = 0; i < places.length; i++) {
        // 마커를 생성하고 지도에 표시합니다
        let marker = addMarker(new kakao.maps.LatLng(places[i].y, places[i].x), order);

        // 마커와 검색결과 항목을 클릭 했을 때
        // 장소정보를 표출하도록 클릭 이벤트를 등록합니다
        (function (marker, place) {
          kakao.maps.event.addListener(marker, "click", function () {
            // 마커 클릭시 지도 중심 이동
            map.panTo(new kakao.maps.LatLng(place.y, place.x));
            setTimeout(() => {
              displayPlaceInfo(place);
            }, 350);
          });
        })(marker, places[i]);
      }
    }

    // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
    function addMarker(position, order) {
      let imageSrc = "./assets/images/spritesheet.png", // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new kakao.maps.Size(27, 28), // 마커 이미지의 크기
        imgOptions = {
          spriteSize: new kakao.maps.Size(162, 27), // 스프라이트 이미지의 크기
          spriteOrigin: new kakao.maps.Point(order * 27, 0, 0, 0), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
          offset: new kakao.maps.Point(11, 28), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
        marker = new kakao.maps.Marker({
          position: position, // 마커의 위치
          image: markerImage,
        });

      marker.setMap(map); // 지도 위에 마커를 표출합니다
      markers.push(marker); // 배열에 생성된 마커를 추가합니다

      return marker;
    }

    // 지도 위에 표시되고 있는 마커를 모두 제거합니다
    function removeMarker() {
      for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      markers = [];
    }

    // 클릭한 마커에 대한 장소 상세정보를 커스텀 오버레이로 표시하는 함수입니다
    function displayPlaceInfo(place) {
      let content = `<div class="placeinfo">   <a class="title" href="${place.place_url}" target="_blank" title="${place.place_name}">${place.place_name}</a>`;

      if (place.road_address_name) {
        content +=
          '    <span title="' +
          place.road_address_name +
          '">' +
          place.road_address_name +
          "</span>" +
          '  <span class="jibun" title="' +
          place.address_name +
          '">(지번 : ' +
          place.address_name +
          ")</span>";
      } else {
        content += '    <span title="' + place.address_name + '">' + place.address_name + "</span>";
      }

      content += `<span class="tel">${place.phone}<div class="after"></div>`;

      contentNode.innerHTML = content;
      placeOverlay.setPosition(new kakao.maps.LatLng(place.y, place.x));
      placeOverlay.setMap(map);
    }

    // 각 카테고리에 클릭 이벤트를 등록합니다
    function addCategoryClickEvent() {
      let category = document.getElementById("category"),
        children = category.children;

      for (let i = 0; i < children.length; i++) {
        children[i].onclick = onClickCategory;
      }
    }

    // 카테고리를 클릭했을 때 호출되는 함수입니다
    function onClickCategory() {
      let id = this.id,
        className = this.className;

      placeOverlay.setMap(null);

      if (className === "on") {
        currCategory = "";
        changeCategoryClass();
        removeMarker();
      } else {
        currCategory = id;
        changeCategoryClass(this);
        searchPlaces();
      }
    }

    // 클릭된 카테고리에만 클릭된 스타일을 적용하는 함수입니다
    function changeCategoryClass(el) {
      let category = document.getElementById("category"),
        children = category.children,
        i;

      for (i = 0; i < children.length; i++) {
        children[i].className = "";
      }

      if (el) {
        el.className = "on";
      }
    }

    // // 주소-좌표 변환 객체를 생성합니다
    // var geocoder = new kakao.maps.services.Geocoder();

    // // 주소로 좌표를 검색합니다
    // geocoder.addressSearch("서울특별시 강남구 테헤란로5길 24", function (result, status) {
    //   // 정상적으로 검색이 완료됐으면
    //   if (status === kakao.maps.services.Status.OK) {
    //     var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

    //     // 결과값으로 받은 위치를 마커로 표시합니다
    //     var marker = new kakao.maps.Marker({
    //       map: map,
    //       position: coords,
    //     });
    //     // 인포윈도우로 장소에 대한 설명을 표시합니다
    //     var infowindow = new kakao.maps.InfoWindow({
    //       content: '<div style="width:150px;text-align:center;padding:6px 0;">공연장 이름</div>',
    //     });
    //     infowindow.open(map, marker);
    //   }
    // });
  }, [latLon]);

  return (
    <div className="map_wrap">
      <div id="map"></div>
      <ul id="category">
        <li id="BK9" data-order="0">
          <span className="category_bg bank"></span>
          은행
        </li>
        <li id="PK6" data-order="1">
          <span className="category_bg car-park"></span>
          주차장
        </li>
        <li id="SW8" data-order="2">
          <span className="category_bg train"></span>
          지하철
        </li>
        <li id="FD6" data-order="3">
          <span className="category_bg restaurant"></span>
          식당
        </li>
        <li id="CE7" data-order="4">
          <span className="category_bg cafe"></span>
          카페
        </li>
        <li id="CS2" data-order="5">
          <span className="category_bg store"></span>
          편의점
        </li>
      </ul>
      <div id="loc-btn">
        <button id="btn-loc" />
      </div>
    </div>
  );
};

export default Map;