import { useState } from 'react';

import MiniMapSearch from '@/app/map/_components/Map/MiniMap';

import Checkbox from '@components/Checkbox/Checkbox';

export default function PositionDetail() {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (value: string, isChecked: boolean) => {
    setIsChecked(isChecked);
  };

  return (
    <>
      <div>
        <p>미니맵 표시</p>
        <p>Quote</p>
      </div>
      <Checkbox value='someValue' checkedItemHandler={handleCheckboxChange} />
      {isChecked && <MiniMapSearch />}
    </>
  );
}
