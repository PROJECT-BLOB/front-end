import React, { useState } from 'react';
import useGoogle from 'react-google-autocomplete/lib/usePlacesAutocompleteService';

import { List } from 'antd';

type Props = {
  place: string;
  setPlace: React.Dispatch<React.SetStateAction<string>>;
};

const AutoComplete = ({ place, setPlace }: Props) => {
  const { placePredictions, getPlacePredictions, isPlacePredictionsLoading } = useGoogle({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  });
  const [chosen, setChosen] = useState('');

  return (
    <div className='relative flex flex-col w-full'>
      <span>여행지</span>
      <input
        className='w-full p-2 my-2 border rounded'
        value={place}
        placeholder='여행지 입력'
        onChange={(evt: any) => {
          getPlacePredictions({ input: evt.target.value });
          setChosen(evt.target.value);
          setPlace(evt.target.value);
        }}
      />
      {chosen && (
        <div className='absolute h-[10rem] left-0 overflow-x-hidden flex whitespace-nowrap flex-col w-full my-1 bg-white border z-[9999] rounded top-20'>
          {!isPlacePredictionsLoading && (
            <List
              className='px-2'
              dataSource={placePredictions}
              renderItem={(item: any) => (
                <List.Item
                  className='cursor-pointer'
                  onClick={() => {
                    setChosen('');
                    setPlace(item.description);
                  }}
                >
                  <List.Item.Meta title={item.description} />
                </List.Item>
              )}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default AutoComplete;
