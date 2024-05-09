import React, { useState } from 'react';
import GooglePlacesAutocomplete, { geocodeByAddress } from 'react-google-places-autocomplete';

type Option = {
  label: string;
  value: string;
};

interface AutoCompleteCityProps {
  onSelectCity: (cityName: string, lat: number, lng: number) => void; // 선택된 도시 이름과 위도 경도를 부모 컴포넌트로 전달하기 위한 콜백 함수
}

const AutoCompleteCity = ({ onSelectCity }: AutoCompleteCityProps) => {
  const [value, setValue] = useState<Option | null>(null);
  const [geolocation, setGeolocation] = useState<google.maps.LatLng | null>(null);
  const googleMapApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || '';

  const handleSelect = async (address: Option) => {
    setValue(address);
    console.log(address);

    try {
      const results = await geocodeByAddress(address.label); // label을 주소로 사용
      const [firstResult] = results; // 결과 배열의 첫 번째 요소를 가져옴
      const { geometry } = firstResult; // geometry 속성 추출
      const { location } = geometry; // location 속성 추출
      setGeolocation(location);
      onSelectCity(address.label, location.lat(), location.lng()); // 선택된 도시 이름과 위도 경도를 부모 컴포넌트로 전달
    } catch (error) {
      console.error('Error fetching geolocation:', error);
    }
  };

  return (
    <div>
      <GooglePlacesAutocomplete
        selectProps={{
          styles: {
            control: (provided, state) => ({
              ...provided,
              width: '20.6875rem;', // 입력란의 너비를 100%로 지정
              border: state.isFocused ? '1px solid red' : '1px solid #ccc', // 포커스 시 또는 일반 상태일 때의 테두리 스타일 변경
            }),
            option: (provided, state) => ({
              ...provided,
              backgroundColor: state.isFocused ? 'red' : 'white', // 제안 목록의 배경색을 포커스 시 또는 일반 상태에 따라 변경
              color: 'black',
              '&:hover': {
                backgroundColor: 'linear-gradient(90deg, #FFF2EA 0%, #FFF0F8 100%)', // 호버 시 배경색 변경
              },
            }),
            singleValue: (provided) => ({
              ...provided,
              color: 'black', // 선택된 값의 텍스트 색상 변경
            }),
          },
          value,
          onChange: (newValue) => {
            setValue(newValue ? newValue.value : null);

            if (newValue) {
              handleSelect(newValue);
            }
          },
        }}
        apiKey={googleMapApiKey}
        autocompletionRequest={{
          types: ['(cities)'], // 도시 수준 검색으로 제한
        }}
      />
      {geolocation && (
        <p>
          Latitude: {geolocation.lat()}, Longitude: {geolocation.lng()}
        </p>
      )}
    </div>
  );
};

export default AutoCompleteCity;
