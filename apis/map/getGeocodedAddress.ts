import axios from 'axios';

import LatLngLiteral = google.maps.LatLngLiteral;

export const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;

export const BASE_URL = `https://maps.googleapis.com/maps/api/geocode/json`;

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 3000,
});

export default async function getGeocodedAddress(location: LatLngLiteral) {
  const { lat, lng } = location;
  const URL = `${BASE_URL}?latlng=${lat},${lng}&key=${API_KEY}`;
  const { data, status } = await instance.get(URL);
  const address: string = data.results[0].formatted_address;

  if (!address) throw new Error('No address found for the given location');

  return { data: address, status };
}
