import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getFirestore, collection, query, getDocs} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDo5bC-RBUsX8xBR4i3YBDImhorl5j9Nxc",
  authDomain: "advintage-d5f8c.firebaseapp.com",
  databaseURL: "https://advintage-d5f8c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "advintage-d5f8c",
  storageBucket: "advintage-d5f8c.appspot.com",
  messagingSenderId: "40587996397",
  appId: "1:40587996397:web:235937e2ded956f7e930e4",
  measurementId: "G-67L1HC3RTZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const q = query(collection(db, "shopInfo"));

const mapContainer = document.getElementById('map'), // 지도를 표시할 div  
    mapOption = { 
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 7 // 지도의 확대 레벨
    };

const map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
resizeMap();
relayout(map);

const positions = [];
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
  positions.push(doc.data());
});
        
const [x, y] = await findCurrLocation();
// 이동할 위도 경도 위치를 생성합니다 
const moveLatLon = new kakao.maps.LatLng(x, y);

// 지도 중심을 이동 시킵니다
map.panTo(moveLatLon);
markCurrentPosition(map);

for (let i = 0; i < positions.length; i ++) {
  const geocoder = new kakao.maps.services.Geocoder();
  const shopTitle = positions[i].title;
  const shopAddress = positions[i].address;


  // 주소로 좌표를 검색합니다
  geocoder.addressSearch(positions[i].address, function(result, status) {
    // 정상적으로 검색이 완료됐으면 
    if (status === kakao.maps.services.Status.OK) {

      const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
      // 결과값으로 받은 위치를 마커로 표시합니다
      const marker = new kakao.maps.Marker({
          map: map,
          position: coords
      });

      const overlay = new kakao.maps.CustomOverlay({
        map: map,
        position: marker.getPosition()  
      });

      const content = document.createElement('div');
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
  const myMarkerImage = new kakao.maps.MarkerImage(myImageSrc, myImageSize); 
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