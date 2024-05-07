import React, { useState } from 'react';
import GooglePlacesAutocomplete, { geocodeByAddress } from 'react-google-places-autocomplete';

type Option = {
  label: string;
  value: string;
};

const AutoCompleteCity = () => {
  const [value, setValue] = useState<Option | null>(null);
  const [geolocation, setGeolocation] = useState<google.maps.LatLng | null>(null);
  const googleMapApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || '';

  const handleSelect = async (address: Option) => {
    setValue(address);
    console.log(address);

    try {
      const results = await geocodeByAddress(address.label); // label을 주소로 사용
      setGeolocation(results[0].geometry.location);
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
              width: '100%', // 입력란의 너비를 100%로 지정
              border: state.isFocused ? '2px solid red' : '1px solid #ccc', // 포커스 시 또는 일반 상태일 때의 테두리 스타일 변경
            }),
            option: (provided, state) => ({
              ...provided,
              backgroundColor: state.isFocused ? 'red' : 'white', // 제안 목록의 배경색을 포커스 시 또는 일반 상태에 따라 변경
              color: state.isFocused ? 'white' : 'black', // 제안 목록의 텍스트 색상을 포커스 시 또는 일반 상태에 따라 변경
              '&:hover': {
                backgroundColor: 'lightgrey', // 호버 시 배경색 변경
              },
            }),
            singleValue: (provided) => ({
              ...provided,
              color: 'red', // 선택된 값의 텍스트 색상 변경
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
