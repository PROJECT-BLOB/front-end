import React, { FormEvent, useCallback, useEffect, useState } from 'react';

import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import classNames from 'classnames/bind';
import Image from 'next/image';

import { SearchedCity } from '@/types/Map';
import settingIcon from '@icons/settings-04.svg';
import { useMapStore } from '@stores/useMapStore';

import styles from './Autocomplete.module.scss';
// 이부분에 스타일링 하시면 됩니다.
import styles2 from './AutocompleteMini.module.scss';

type AutocompleteType = 'normal' | 'mini';
interface AutocompleteProps {
  type?: AutocompleteType;
}

export default function Autocomplete({ type = 'normal' }: AutocompleteProps) {
  const map = useMap();
  const places = useMapsLibrary('places');

  // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompleteSessionToken
  const [sessionToken, setSessionToken] = useState<google.maps.places.AutocompleteSessionToken>();
  // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service
  const [autocompleteService, setAutocompleteService] = useState<google.maps.places.AutocompleteService | null>(null);
  // https://developers.google.com/maps/documentation/javascript/reference/places-service
  const [placesService, setPlacesService] = useState<google.maps.places.PlacesService | null>(null);

  const [predictionResults, setPredictionResults] = useState<Array<google.maps.places.AutocompletePrediction>>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const setLastSearchCity = useMapStore((state) => state.setLastSearchCity);
  const setLastMapCenter = useMapStore((state) => state.setLastMapCenter);

  const cx = type === 'normal' ? classNames.bind(styles) : classNames.bind(styles2);

  useEffect(() => {
    if (!places || !map) return;

    setAutocompleteService(new places.AutocompleteService());
    setPlacesService(new places.PlacesService(map));
    setSessionToken(new places.AutocompleteSessionToken());

    return () => setAutocompleteService(null);
  }, [map, places]);

  // 검색 결과를 가져온다.
  const fetchPredictions = useCallback(
    async (inputValue: string) => {
      if (!autocompleteService || !inputValue) {
        setPredictionResults([]);

        return;
      }

      const request = { input: inputValue, sessionToken, types: ['(cities)'] };
      const response = await autocompleteService.getPlacePredictions(request);

      setPredictionResults(response.predictions);
    },
    [autocompleteService, sessionToken],
  );

  // TODO: hook-form 변경
  const onInputChange = useCallback(
    (event: FormEvent<HTMLInputElement>) => {
      const value = (event.target as HTMLInputElement)?.value;

      setInputValue(value);
      fetchPredictions(value);
    },
    [fetchPredictions],
  );

  // 검색결과 클릭 핸들러
  const handleSuggestionClick = useCallback(
    (placeId: string) => {
      if (!places) {
        return;
      }

      const detailRequestOptions = {
        placeId,
        // fields: ['geometry', 'formatted_address', 'name'],
        sessionToken,
      };

      const detailsRequestCallback = (placeDetails: google.maps.places.PlaceResult | null) => {
        console.log(placeDetails);
        const { location } = placeDetails?.geometry || {};

        if (!location) {
          return;
        }

        const newSearchedCenter = location.toJSON();

        const newSearchResult: SearchedCity = {
          city: placeDetails?.vicinity ?? '',
          location: newSearchedCenter,
          country:
            placeDetails?.address_components?.find((component) => component.types.includes('country'))?.long_name ?? '',
        };
        setLastSearchCity(newSearchResult);
        setLastMapCenter(newSearchedCenter);
        setPredictionResults([]);
        setInputValue(placeDetails?.formatted_address ?? '');
        setSessionToken(new places.AutocompleteSessionToken());
      };

      placesService?.getDetails(detailRequestOptions, detailsRequestCallback);
    },
    [places, placesService, sessionToken],
  );

  return (
    <div className={cx('container')}>
      <div className={cx('input-container')}>
        <input
          value={inputValue}
          onInput={(event: FormEvent<HTMLInputElement>) => onInputChange(event)}
          placeholder='궁금한 도시를 검색해보세요 :)'
        />
        <Image className={cx('shown')} src={settingIcon} alt='세팅아이콘' />
      </div>

      {predictionResults.length > 0 && (
        <ul className='custom-list'>
          {predictionResults.map(({ place_id, description }) => {
            return (
              //   eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
              <li
                key={place_id}
                className='custom-list-item'
                onClick={() => handleSuggestionClick(place_id)}
                onKeyDown={() => handleSuggestionClick(place_id)}
              >
                {description}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
