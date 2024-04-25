import { useState, useEffect } from 'react';

// Google Maps API 초기화
const initMap = () => {
  return new google.maps.Map(document.getElementById('map'), {
    center: { lat: 37.7749, lng: -122.4194 }, // 초기 중심 좌표값 (샌프란시스코)
    zoom: 12,
  });
};

const MapComponent = () => {
  const [map, setMap] = useState(null);
  const [currentAddress, setCurrentAddress] = useState('');

  useEffect(() => {
    // Google Maps API 스크립트 동적으로 로드
    const googleMapScript = document.createElement('script');
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
    googleMapScript.async = true;
    window.document.body.appendChild(googleMapScript);
    googleMapScript.addEventListener('load', () => {
      setMap(initMap());
    });
  }, []);

  useEffect(() => {
    if (map) {
      // 사용자가 지도를 드래그하거나 확대/축소할 때 이벤트 처리
      map.addListener('dragend', () => {
        const center = map.getCenter();
        getAddressFromLatLng(center);
      });
    }
  }, [map]);

  // 좌표값을 주소로 변환하는 함수
  const getAddressFromLatLng = (latLng: google.maps.LatLng) => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          setCurrentAddress(results[0].formatted_address);
        } else {
          setCurrentAddress('주소를 찾을 수 없습니다.');
        }
      } else {
        setCurrentAddress('주소를 찾을 수 없습니다.');
      }
    });
  };

  // 글쓰기 버튼 클릭 시 실행되는 함수
  const handleWriteButtonClick = () => {
    // currentAddress를 이용하여 글쓰기 내용에 주소를 띄웁니다.
    console.log('현재 주소:', currentAddress);
  };

  return (
    <div>
      <div id='map' style={{ width: '100%', height: '400px' }}></div>
      <button onClick={handleWriteButtonClick}>글쓰기</button>
    </div>
  );
};

export default MapComponent;
