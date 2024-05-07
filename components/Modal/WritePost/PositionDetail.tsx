import { useState } from 'react';

import Checkbox from '@components/Checkbox/Checkbox';

export default function PositionDetail() {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (value: string, isChecked: boolean) => {
    setIsChecked(isChecked);
  };

  return (
    <>
      <div>
        <p>상세위치 표시</p>
        <p>상세위치를 적으면 지도에 표시됩니다.</p>
      </div>
      <Checkbox value='someValue' checkedItemHandler={handleCheckboxChange} />
      {isChecked && <input type='text' />}
    </>
  );
}
