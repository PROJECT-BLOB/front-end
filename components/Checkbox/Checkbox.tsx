import { PropsWithChildren, useState } from 'react';

import styles from './Checkbox.module.scss';

export type CheckboxProps = PropsWithChildren<{
  disabled?: boolean;
  value: string;
  checkedItemHandler: (value: string, isChecked: boolean) => void;
}>;

export default function Checkbox({ children, value, disabled, checkedItemHandler }: CheckboxProps) {
  const [checked, setChecked] = useState(false);

  const checkHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setChecked(isChecked);
    checkedItemHandler(value, isChecked);
  };

  return (
    <label className={styles.label}>
      <input
        className={styles.hiddenCheckbox}
        type='checkbox'
        checked={checked}
        onChange={checkHandler}
        disabled={disabled}
      />
      <span className={styles.showCheckbox} />
      {children}
    </label>
  );
}
