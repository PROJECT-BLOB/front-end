/* eslint-disable react/no-array-index-key */
import { useState } from 'react';

import Checkbox from './Checkbox';

interface CheckboxListProps {
  checkboxList: Array<string>;
}

export default function CheckboxList({ checkboxList }: CheckboxListProps) {
  const [checkedItems, setCheckedItems] = useState(new Set<string>());

  const checkedItemHandler = (value: string, isChecked: boolean) => {
    const newCheckedItems = new Set(checkedItems);

    if (isChecked) {
      newCheckedItems.add(value);
    } else if (!isChecked && checkedItems.has(value)) {
      newCheckedItems.delete(value);
    }

    setCheckedItems(newCheckedItems);
  };

  return (
    <div>
      {/* 사용예시 */}
      <Checkbox value='disabled' disabled checkedItemHandler={checkedItemHandler}>
        Disabled예시
      </Checkbox>
      {checkboxList.map((item, index) => (
        <Checkbox key={index} value={item} checkedItemHandler={checkedItemHandler}>
          {item}
        </Checkbox>
      ))}
    </div>
  );
}
