// TODO: 안쓸지도 모름-나중에 삭제

import { PropsWithChildren } from 'react';

import styles from './Radio.module.scss';

export type RadioProps = PropsWithChildren<{
  checked: boolean;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}>;

export default function Radio({ children, checked, name, value, onChange }: RadioProps) {
  return (
    <label className={styles.label}>
      <input
        className={styles.hiddenRadio}
        type='radio'
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <span className={styles.showRadio} />
      {children}
    </label>
  );
}
