import { MouseEventHandler, PropsWithChildren } from 'react';

import Image, { StaticImageData } from 'next/image';

import styles from './SigninButton.module.scss';

interface SigninButtonProps {
  providerName: string;
  iconSource: StaticImageData;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export default function SigninButton({
  providerName,
  iconSource,
  onClick,
  children,
}: PropsWithChildren<SigninButtonProps>) {
  return (
    <button type='button' className={`${styles['signin-button']} ${styles[providerName]}`} onClick={onClick}>
      <Image className={`${styles.logo} ${styles[providerName]} `} src={iconSource} alt={`${children} 아이콘`} />
      <span className={styles.text}>{children}</span>
    </button>
  );
}
