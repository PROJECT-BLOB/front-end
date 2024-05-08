import React, { FormEvent, useCallback, useEffect, useState } from 'react';

import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';

import './autocomplete.css';

interface AutocompleteProps {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
  setCurrentPosition: (position: google.maps.LatLngLiteral) => void;
}

export default function Autocomplete({ onPlaceSelect, setCurrentPosition }: AutocompleteProps) {
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

        if (location) {
          setCurrentPosition(location.toJSON());
        }

        onPlaceSelect(placeDetails);
        setPredictionResults([]);
        setInputValue(placeDetails?.formatted_address ?? '');
        setSessionToken(new places.AutocompleteSessionToken());
      };

      placesService?.getDetails(detailRequestOptions, detailsRequestCallback);
    },
    [onPlaceSelect, places, placesService, sessionToken],
  );

  return (
    <div className='autocomplete-container'>
      <input
        value={inputValue}
        onInput={(event: FormEvent<HTMLInputElement>) => onInputChange(event)}
        placeholder='BLOB NOW!'
      />

      {predictionResults.length > 0 && (
        <ul className='custom-list'>
          {predictionResults.map(({ place_id, description }) => {
            return (
              <li key={place_id} className='custom-list-item' onClick={() => handleSuggestionClick(place_id)}>
                {description}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
