import { MouseEventHandler, ReactNode } from 'react';

import Image from 'next/image';

import styles from './SigninButton.module.scss';

interface Props {
  providerName: string;
  iconSource: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
}

export default function SigninButton({ providerName, iconSource, onClick, children }: Props) {
  return (
    <button type='button' className={`${styles['signin-button']} ${styles[providerName]}`} onClick={onClick}>
      <Image className={`${styles.logo} ${styles[providerName]} `} src={iconSource} alt={`${children} 아이콘`} />
      <span className={styles.text}>{children}</span>
    </button>
  );
}
