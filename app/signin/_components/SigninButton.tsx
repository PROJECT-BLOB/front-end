import { ReactNode } from 'react';

import Image from 'next/image';

import styles from './SigninButton.module.scss';

interface Props {
  providerName: string;
  iconSource: string;
  children: ReactNode;
}

export default function SigninButton({ providerName, iconSource, children }: Props) {
  return (
    <button type='button' className={`${styles['signin-button']} ${styles[providerName]}`}>
      <Image className={`${styles.logo} ${styles[providerName]} `} src={iconSource} alt={`${children} 아이콘`} />
      <span className={styles.text}>{children}</span>
    </button>
  );
}
