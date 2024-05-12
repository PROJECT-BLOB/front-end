import LatLngLiteral = google.maps.LatLngLiteral;

// 기존 Location 타입을 api 사용 타입과 일치시켰습니다.
export type Location = LatLngLiteral;
// export interface Location {
//   lat: number;
//   lng: number;
// }

// 최근 검색한 도시 타입입니다.useMapStore의 lastSearchedCity에 사용됩니다.
export interface SearchedCity {
  country: string;
  city: string;
  location: LatLngLiteral | undefined;
}
