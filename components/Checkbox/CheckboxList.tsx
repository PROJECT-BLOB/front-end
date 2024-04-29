import { useState } from 'react';

import Checkbox from './Checkbox';

export default function CheckboxList() {
  const [checkedItems, setCheckedItems] = useState(new Set<string>());
  const checkBoxList = ['Apple', 'Banana', 'Pare', 'Grape', 'Melon', 'Water Melon', 'Pineapple']; // 임시 데이터

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
      {checkBoxList.map((item, index) => (
        <Checkbox key={index} id={item} value={item} checkedItemHandler={checkedItemHandler}>
          {item}
        </Checkbox>
      ))}
    </div>
  );
}
