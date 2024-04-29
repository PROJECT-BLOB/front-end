import { PropsWithChildren, useState } from 'react';

type CheckboxProps = PropsWithChildren<{
  id: string;
  value: string;
  checkedItemHandler: (value: string, isChecked: boolean) => void;
}>;

export default function Checkbox({ children, id, value, checkedItemHandler }: CheckboxProps) {
  const [checked, setChecked] = useState(false);

  const checkHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setChecked(isChecked);
    checkedItemHandler(value, isChecked);
  };

  return (
    <label>
      <input id={id} type='checkbox' checked={checked} onChange={checkHandler} />
      {children}
    </label>
  );
}
