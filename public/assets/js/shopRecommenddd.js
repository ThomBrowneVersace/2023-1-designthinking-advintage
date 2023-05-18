console.log("hi");
// async function markAllShops() {
//   const [x, y] = await findCurrLocation();
//   const mapContainer = document.getElementById('map'), // 지도를 표시할 div 
//     mapOption = {
//         center: new kakao.maps.LatLng(x, y), // 지도의 중심좌표
//         level: 7 // 지도의 확대 레벨
//     };
//   const map = await displayMap(mapContainer, mapOption);
//   resizeMap();
//   relayout(map);
//   const myImageSrc = 'https://firebasestorage.googleapis.com/v0/b/advintage-d5f8c.appspot.com/o/myPos.png?alt=media&token=ebfc1a71-13af-4460-8306-3cd09a14990a'; 
//   const myImageSize = new kakao.maps.Size(24, 24); 
//   var myMarkerImage = new kakao.maps.MarkerImage(myImageSrc, myImageSize); 
//   const myPos = new kakao.maps.Marker({
//     map: map, // 마커를 표시할 지도
//     position: new kakao.maps.LatLng(x, y), // 마커를 표시할 위치
//     title : '내 위치', // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
//     image : myMarkerImage // 마커 이미지 
//   });
//   const myInfowindow = new kakao.maps.InfoWindow({
//     content: `<div style="padding:5px; display:flex; justify-content:center; width: 3rem;">현 위치</div>`
//      // 인포윈도우에 표시할 내용
//   });
//   kakao.maps.event.addListener(myPos, 'mouseover', makeOverListener(map, myPos, myInfowindow));
//   kakao.maps.event.addListener(myPos, 'mouseout', makeOutListener(myInfowindow));

// // // 주소-좌표 변환 객체를 생성합니다
// // var geocoder = new kakao.maps.services.Geocoder();

// // // 주소로 좌표를 검색합니다
// // geocoder.addressSearch('서울 광진구 광나루로 13길 13', function(result, status) {

// //     // 정상적으로 검색이 완료됐으면 
// //      if (status === kakao.maps.services.Status.OK) {

// //         var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

// //         // 결과값으로 받은 위치를 마커로 표시합니다
// //         var marker = new kakao.maps.Marker({
// //             map: map,
// //             position: coords
// //         });

// //         // 인포윈도우로 장소에 대한 설명을 표시합니다
// //         var infowindow = new kakao.maps.InfoWindow({
// //             content: '<div style="width:150px;text-align:center;padding:6px 0;">현 위치</div>'
// //         });
// //         infowindow.open(map, marker);

// //         // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
// //         map.setCenter(coords);
// //     }
// // });


// // 마커 이미지의 이미지 주소입니다
// var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
    
// for (var i = 0; i < positions.length; i ++) {
//     // 주소-좌표 변환 객체를 생성합니다
//     var geocoder = await makeGeocoder();
//     // 주소로 좌표를 검색합니다
//     const coords = await findShopLocation(geocoder, positions[i]);
//     // 마커 이미지의 이미지 크기 입니다
//     var imageSize = new kakao.maps.Size(24, 35); 
    
//     // 마커 이미지를 생성합니다    
//     var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
//     // 마커를 생성합니다
//     var marker = new kakao.maps.Marker({
//         map: map, // 마커를 표시할 지도
//         position: coords, // 마커를 표시할 위치
//         title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
//         image : markerImage // 마커 이미지 
//     });



    // function closeOverlay() {
    //   console.log("close");
    //   overlay.setMap(null);     
    // }
//     var content = '<div class="wrap">' + 
//     '    <div class="info">' + 
//     '        <div class="title">' + 
//     '            카카오 스페이스닷원' + 
//     '            <div class="close" onclick="closeOverlay()" title="닫기">aaaa</div>' + 
//     '        </div>' + 
//     '        <div class="body">' + 
//     '            <div class="img">' +
//     '                <img src="https://cfile181.uf.daum.net/image/250649365602043421936D" width="73" height="70">' +
//     '           </div>' + 
//     '            <div class="desc">' + 
//     '                <div class="ellipsis">제주특별자치도 제주시 첨단로 242</div>' + 
//     '                <div class="jibun ellipsis">(우) 63309 (지번) 영평동 2181</div>' + 
//     '                <div><a href="https://www.kakaocorp.com/main" target="_blank" class="link">홈페이지</a></div>' + 
//     '            </div>' + 
//     '        </div>' + 
//     '    </div>' +    
//     '</div>';

//     // 마커 위에 커스텀오버레이를 표시합니다
//     // 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다
//     var overlay = new kakao.maps.CustomOverlay({
//         content: content,
//         map: map,
//         position: marker.getPosition()       
//     });

//     // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
//     kakao.maps.event.addListener(marker, 'click', function() {
//       overlay.setMap(map);
//     });

//   }
// }

// function resizeMap() {
//   const mapContainer = document.getElementById('map');
//   mapContainer.style.width = '800px';
//   mapContainer.style.height = '100%'; 
// }

// function relayout(map) {    
  
//   // 지도를 표시하는 div 크기를 변경한 이후 지도가 정상적으로 표출되지 않을 수도 있습니다
//   // 크기를 변경한 이후에는 반드시  map.relayout 함수를 호출해야 합니다 
//   // window의 resize 이벤트에 의한 크기변경은 map.relayout 함수가 자동으로 호출됩니다
//   map.relayout();
// }

// function displayMap(mapContainer, mapOption) {
//   const promise = new Promise((resolve, reject) => {
//     resolve(new kakao.maps.Map(mapContainer, mapOption));
//   })
//   return promise;
// }

// // 인포윈도우를 표시하는 클로저를 만드는 함수입니다 
// function makeOverListener(map, marker, infowindow) {
//   return function() {
//       infowindow.open(map, marker);
//   };
// }

// // 인포윈도우를 닫는 클로저를 만드는 함수입니다 
// function makeOutListener(infowindow) {
//   return function() {
//       infowindow.close();
//   };
// }


// const makeGeocoder = () => {
//   return new Promise((resolve, reject) => {
//     resolve(new kakao.maps.services.Geocoder());
//   })
// }

// const findCurrLocation = () => {
//   const promise = new Promise((resolve, reject) => {
//     navigator.geolocation.getCurrentPosition((position) => {
//       const x = position.coords.latitude;
//       const y = position.coords.longitude;
//       resolve([x, y]);
//     });
//   })
//   return promise;
// }

// const findShopLocation = (geocoder, position) => {
//   const promise = new Promise((resolve, reject) => {
//   geocoder.addressSearch(position.adress, function(result, status) {
//       // 정상적으로 검색이 완료됐으면 
//       if (status === kakao.maps.services.Status.OK) {
//           resolve(new kakao.maps.LatLng(result[0].y, result[0].x));
//       }
//   });
//   })

//   return promise;
// }

// const positions = [
//   {
//     title: "페이지원",
//     adress: "서울 마포구 상수동 316-13"
//   },
//   {
//     title:"베이스",
//     adress:"서울 마포구 상수동 313-1"
//   },
//   {
//     title:"빈티지 낙원",
//     adress:"서울 마포구 망원동 394-1"
//   },
//   {
//     title:"가버먼트",
//     adress:"서울 마포구 동교동 158-24"
//   },
//   {
//     title:"에이징퍼센트",
//     adress:"서울 마포구 서교동 327-20"
//   },
//   {
//     title:"주코빈티지",
//     adress:"서울 마포구 서교동 407-18"
//   },
//   {
//     title:"한티지",
//     adress:"서울 마포구 서교동 347-14"
//   },
//   {
//     title:"한티지 상수점",
//     adress:"서울 마포구 서교동 402-3"
//   },
//   {
//     title:"세컨드클로젯",
//     adress:"서울 마포구 연남동 228-28"
//   },
//   {
//     title:"레우코즈",
//     adress:"서울 용산구 보광동 265-511"
//   },
//   {
//     title:"페이즐리캣",
//     adress:"서울 용산구 이태원동 34-21"
//   },
//   {
//     title:"홍대 빈티지크루",
//     adress:"서울 마포구 서교동 346-41"
//   },
//   {
//     title:"무에라",
//     adress:"서울 용산구 이태원동 72-17"
//   },
//   {
//     title:"매그놀리아미스",
//     adress:"서울 마포구 연남동 229-30"
//   },
//   {
//     title:"밀리우 하우스",
//     adress:"서울 마포구 동교동 149-13"
//   },
//   {
//     title:"브루클린 빈티지",
//     adress:"서울 마포구 동교동 155-36"
//   },
//   {
//     title:"빈티지아비",
//     adress:"서울 마포구 연남동 390-56"
//   },
//   {
//     title:"워즈런던빈티지",
//     adress:"서울 마포구 연남동 227-38"
//   },
//   {
//     title:"연남빈티지",
//     adress:"서울 마포구 동교동 152-7"
//   },
//   {
//     title:"빽투더빈티지",
//     adress:"서울 마포구 동교동 153-1"
//   },
//   {
//     title:"아이엠빈티지",
//     adress:"서울 마포구 동교동 166-12"
//   },
//   {
//     title:"파인애플사우나",
//     adress:"서울 마포구 서교동 329-1"
//   },
//   {
//     title:"코코빈티지",
//     adress:"서울 마포구 서교동 347-19"
//   },
//   {
//     title:"라비너스",
//     adress:"서울 마포구 서교동 398-5"
//   },
//   {
//     title:"벨엔누보",
//     adress:"서울 강남구 신사동 542-3"
//   },
//   {
//     title:"트락",
//     adress:"서울 마포구 서교동 346-51"
//   },
//   {
//     title:"와일드혹스",
//     adress:"서울 마포구 상수동 90-2"
//   },
//   {
//     title:"포쉬빈티지",
//     adress:"서울 용산구 한남동 790-17"
//   },
//   {
//     title:"노바운더리즈샵",
//     adress:"서울 마포구 합정동 441-15"
//   },
//   {
//     title:"디스레트로라이프",
//     adress:"서울 용산구 보광동 265-963"
//   },
//   {
//     title:"노란벽작업실",
//     adress:"서울 종로구 계동 80"
//   },
//   {
//     title:"스이렌서울",
//     adress:"서울 중구 을지로3가 302-15"
//   },
//   {
//     title:"빈티지보니",
//     adress:"서울 종로구 계동 77-1"
//   },
//   {
//     title:"드레스코코",
//     adress:"서울 중구 을지로6가 18-21"
//   },
//   {
//     title:"불필요상점",
//     adress:"서울 용산구 이태원동 348"
//   },
//   {
//     title:"소우이",
//     adress:"서울 용산구 이태원동 22-23"
//   },
//   {
//     title:"빈티지튤립",
//     adress:"서울 관악구 봉천동 1673-2"
//   },
//   {
//     title:"델라보테가",
//     adress:"서울 강남구 세곡동 128-11"
//   },
//   {
//     title:"꼴레뜨나인",
//     adress:"서울 강남구 신사동 551"
//   },
//   {
//     title:"밀리언아카이브",
//     adress:"서울 성동구 성수동2가 289-293"
//   },
//   {
//     title:"심미안",
//     adress:"서울 성동구 성수동2가 289-205"
//   },
//   {
//     title:"올드브릭",
//     adress:"서울 성북구 동선동1가 85-56"
//   },
//   {
//     title:"디스레트로라이프",
//     adress:"서울 종로구 누하동 17"
//   },
//   {
//     title:"오늘의빈티지",
//     adress:"서울 마포구 서교동 339-1"
//   },
//   {
//     title:"반코빈티지",
//     adress:"서울 마포구 서교동 335-26"
//   },
//   {
//     title:"희마",
//     adress:"서울 서대문구 연희동 142-5"
//   },
//   {
//     title:"링마이버튼",
//     adress:"서울 마포구 서교동 335-20"
//   },
//   {
//     title:"마크업",
//     adress:"서울 용산구 이태원동 225-102"
//   },
//   {
//     title:"게릴라라디오",
//     adress:"서울 마포구 합정동 411-1"
//   },
//   {
//     title:"다브앙",
//     adress:"서울 광진구 중곡동 297-17"
//   },
//   {
//     title:"알멘드로",
//     adress:"서울 마포구 연남동 509-28"
//   }
// ]
// const [x, y] = await findCurrLocation();
//   const mapContainer = document.getElementById('map'), // 지도를 표시할 div 
//     mapOption = {
//         center: new kakao.maps.LatLng(x, y), // 지도의 중심좌표
//         level: 7 // 지도의 확대 레벨
//     };
//   const map = await displayMap(mapContainer, mapOption);
//   resizeMap();
//   relayout(map);
//   const myImageSrc = 'https://firebasestorage.googleapis.com/v0/b/advintage-d5f8c.appspot.com/o/myPos.png?alt=media&token=ebfc1a71-13af-4460-8306-3cd09a14990a'; 
//   const myImageSize = new kakao.maps.Size(24, 24); 
//   var myMarkerImage = new kakao.maps.MarkerImage(myImageSrc, myImageSize); 
//   const myPos = new kakao.maps.Marker({
//     map: map, // 마커를 표시할 지도
//     position: new kakao.maps.LatLng(x, y), // 마커를 표시할 위치
//     title : '내 위치', // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
//     image : myMarkerImage // 마커 이미지 
//   });
//   const myInfowindow = new kakao.maps.InfoWindow({
//     content: `<div style="padding:5px; display:flex; justify-content:center; width: 3rem;">현 위치</div>`
//      // 인포윈도우에 표시할 내용
//   });
//   kakao.maps.event.addListener(myPos, 'mouseover', makeOverListener(map, myPos, myInfowindow));
//   kakao.maps.event.addListener(myPos, 'mouseout', makeOutListener(myInfowindow));

//여기부터 다시 시작

var mapContainer = document.getElementById('map'), // 지도를 표시할 div  
    mapOption = { 
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 7 // 지도의 확대 레벨
    };

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
resizeMap();
relayout(map);
        
const [x, y] = await findCurrLocation();
// 이동할 위도 경도 위치를 생성합니다 
var moveLatLon = new kakao.maps.LatLng(x, y);

// 지도 중심을 이동 시킵니다
map.panTo(moveLatLon);
markCurrentPosition(map);
 
// 마커를 표시할 위치와 내용을 가지고 있는 객체 배열입니다 
const positions = [
  {
    title: "페이지원",
    adress: "서울 마포구 상수동 316-13"
  },
  {
    title:"베이스",
    adress:"서울 마포구 상수동 313-1"
  },
  {
    title:"빈티지 낙원",
    adress:"서울 마포구 망원동 394-1"
  },
  {
    title:"가버먼트",
    adress:"서울 마포구 동교동 158-24"
  },
  {
    title:"에이징퍼센트",
    adress:"서울 마포구 서교동 327-20"
  },
  {
    title:"주코빈티지",
    adress:"서울 마포구 서교동 407-18"
  },
  {
    title:"한티지",
    adress:"서울 마포구 서교동 347-14"
  },
  {
    title:"한티지 상수점",
    adress:"서울 마포구 서교동 402-3"
  },
  {
    title:"세컨드클로젯",
    adress:"서울 마포구 연남동 228-28"
  },
  {
    title:"레우코즈",
    adress:"서울 용산구 보광동 265-511"
  },
  {
    title:"페이즐리캣",
    adress:"서울 용산구 이태원동 34-21"
  },
  {
    title:"홍대 빈티지크루",
    adress:"서울 마포구 서교동 346-41"
  },
  {
    title:"무에라",
    adress:"서울 용산구 이태원동 72-17"
  },
  {
    title:"매그놀리아미스",
    adress:"서울 마포구 연남동 229-30"
  },
  {
    title:"밀리우 하우스",
    adress:"서울 마포구 동교동 149-13"
  },
  {
    title:"브루클린 빈티지",
    adress:"서울 마포구 동교동 155-36"
  },
  {
    title:"빈티지아비",
    adress:"서울 마포구 연남동 390-56"
  },
  {
    title:"워즈런던빈티지",
    adress:"서울 마포구 연남동 227-38"
  },
  {
    title:"연남빈티지",
    adress:"서울 마포구 동교동 152-7"
  },
  {
    title:"빽투더빈티지",
    adress:"서울 마포구 동교동 153-1"
  },
  {
    title:"아이엠빈티지",
    adress:"서울 마포구 동교동 166-12"
  },
  {
    title:"파인애플사우나",
    adress:"서울 마포구 서교동 329-1"
  },
  {
    title:"코코빈티지",
    adress:"서울 마포구 서교동 347-19"
  },
  {
    title:"라비너스",
    adress:"서울 마포구 서교동 398-5"
  },
  {
    title:"벨엔누보",
    adress:"서울 강남구 신사동 542-3"
  },
  {
    title:"트락",
    adress:"서울 마포구 서교동 346-51"
  },
  {
    title:"와일드혹스",
    adress:"서울 마포구 상수동 90-2"
  },
  {
    title:"포쉬빈티지",
    adress:"서울 용산구 한남동 790-17"
  },
  {
    title:"노바운더리즈샵",
    adress:"서울 마포구 합정동 441-15"
  },
  {
    title:"디스레트로라이프",
    adress:"서울 용산구 보광동 265-963"
  },
  {
    title:"노란벽작업실",
    adress:"서울 종로구 계동 80"
  },
  {
    title:"스이렌서울",
    adress:"서울 중구 을지로3가 302-15"
  },
  {
    title:"빈티지보니",
    adress:"서울 종로구 계동 77-1"
  },
  {
    title:"드레스코코",
    adress:"서울 중구 을지로6가 18-21"
  },
  {
    title:"불필요상점",
    adress:"서울 용산구 이태원동 348"
  },
  {
    title:"소우이",
    adress:"서울 용산구 이태원동 22-23"
  },
  {
    title:"빈티지튤립",
    adress:"서울 관악구 봉천동 1673-2"
  },
  {
    title:"델라보테가",
    adress:"서울 강남구 세곡동 128-11"
  },
  {
    title:"꼴레뜨나인",
    adress:"서울 강남구 신사동 551"
  },
  {
    title:"밀리언아카이브",
    adress:"서울 성동구 성수동2가 289-293"
  },
  {
    title:"심미안",
    adress:"서울 성동구 성수동2가 289-205"
  },
  {
    title:"올드브릭",
    adress:"서울 성북구 동선동1가 85-56"
  },
  {
    title:"디스레트로라이프",
    adress:"서울 종로구 누하동 17"
  },
  {
    title:"오늘의빈티지",
    adress:"서울 마포구 서교동 339-1"
  },
  {
    title:"반코빈티지",
    adress:"서울 마포구 서교동 335-26"
  },
  {
    title:"희마",
    adress:"서울 서대문구 연희동 142-5"
  },
  {
    title:"링마이버튼",
    adress:"서울 마포구 서교동 335-20"
  },
  {
    title:"마크업",
    adress:"서울 용산구 이태원동 225-102"
  },
  {
    title:"게릴라라디오",
    adress:"서울 마포구 합정동 411-1"
  },
  {
    title:"다브앙",
    adress:"서울 광진구 중곡동 297-17"
  },
  {
    title:"알멘드로",
    adress:"서울 마포구 연남동 509-28"
  }
]

for (var i = 0; i < positions.length; i ++) {
  var geocoder = new kakao.maps.services.Geocoder();
  const shopTitle = positions[i].title;
  const shopAddress = positions[i].adress;


  // 주소로 좌표를 검색합니다
  geocoder.addressSearch(positions[i].adress, function(result, status) {
    // 정상적으로 검색이 완료됐으면 
    if (status === kakao.maps.services.Status.OK) {

      var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
      // 결과값으로 받은 위치를 마커로 표시합니다
      console.log(coords);
      var marker = new kakao.maps.Marker({
          map: map,
          position: coords
      });

      var overlay = new kakao.maps.CustomOverlay({
        map: map,
        position: marker.getPosition()       
      });

      var content = document.createElement('div');
      content.className = 'wrap';
      content.innerHTML = '<div class="info">' + 
      '        <div class="title">' + 
                   shopTitle + 
      '            <div class="close" title="닫기"><i class="fa-solid fa-xmark"></i></div>' + 
      '        </div>' + 
      '        <div class="body">' + 
      '            <div class="img">' +
      '                <img src="https://firebasestorage.googleapis.com/v0/b/advintage-d5f8c.appspot.com/o/KakaoTalk_Photo_2023-05-13-13-39-05.jpeg?alt=media&token=e378e274-278e-47f9-93ee-e475a064693f" width="73" height="70">' +
      '           </div>' + 
      '            <div class="desc">' + 
                       shopAddress + 
      '                <div><a href="https://map.kakao.com/link/to/' + shopTitle + ',' + result[0].y + ',' + result[0].x + '"' + 'target="_blank" class="link">길 찾기</a></div>' + 
      '            </div>' + 
      '        </div>' + 
      '    </div>';
      const x = content.querySelector('.close');
      x.addEventListener('click', (e) => {
        overlay.setMap(null);
      })
    
      overlay.setContent(content);
      overlay.setMap(null);
      kakao.maps.event.addListener(marker, 'click', function() {
        overlay.setMap(map);
      });
    } 
  }); 
}

const closeBtns = document.getElementsByClassName('close');
for(let i = 0; i < closeBtns.length; i++) {
  closeBtns[i].addEventListener('click', closeOverlay);
}

function markCurrentPosition(map) {
  const myImageSrc = 'https://firebasestorage.googleapis.com/v0/b/advintage-d5f8c.appspot.com/o/myPos.png?alt=media&token=ebfc1a71-13af-4460-8306-3cd09a14990a'; 
  const myImageSize = new kakao.maps.Size(24, 24); 
  var myMarkerImage = new kakao.maps.MarkerImage(myImageSrc, myImageSize); 
  const myPos = new kakao.maps.Marker({
    map: map, // 마커를 표시할 지도
    position: new kakao.maps.LatLng(x, y), // 마커를 표시할 위치
    title : '내 위치', // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
    image : myMarkerImage // 마커 이미지 
  });
  const myInfowindow = new kakao.maps.InfoWindow({
    content: `<div style="padding:5px; display:flex; justify-content:center; width: 3rem;">현 위치</div>`
     // 인포윈도우에 표시할 내용
  });
  kakao.maps.event.addListener(myPos, 'mouseover', makeOverListener(map, myPos, myInfowindow));
  kakao.maps.event.addListener(myPos, 'mouseout', makeOutListener(myInfowindow));
}

// 인포윈도우를 표시하는 클로저를 만드는 함수입니다 
function makeOverListener(map, marker, infowindow) {
    return function() {
        infowindow.open(map, marker);
    };
}

// 인포윈도우를 닫는 클로저를 만드는 함수입니다 
function makeOutListener(infowindow) {
    return function() {
        infowindow.close();
    };
}

function resizeMap() {
  const mapContainer = document.getElementById('map');
  mapContainer.style.width = '800px';
  mapContainer.style.height = '100%'; 
}

function relayout(map) {    
  
  // 지도를 표시하는 div 크기를 변경한 이후 지도가 정상적으로 표출되지 않을 수도 있습니다
  // 크기를 변경한 이후에는 반드시  map.relayout 함수를 호출해야 합니다 
  // window의 resize 이벤트에 의한 크기변경은 map.relayout 함수가 자동으로 호출됩니다
  map.relayout();
}

function findCurrLocation() {
  const promise = new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const x = position.coords.latitude;
      const y = position.coords.longitude;
      resolve([x, y]);
    });
  })
  return promise;
}