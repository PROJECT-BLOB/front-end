import { PropsWithChildren } from 'react';

import Image, { StaticImageData } from 'next/image';

import BelovedIcon from '@icons/check-heart-white.svg';

import styles from './IconTag.module.scss';

interface IconTagProps {
  IconSource?: StaticImageData;
  color?: string;
}

export default function IconTag({ IconSource, color = 'default', children }: PropsWithChildren<IconTagProps>) {
  const backgroundColor = color === 'default' ? 'pink-gradient' : 'blue';

  return (
    <p className={`${styles['tag-container']} ${styles[backgroundColor]}`}>
      <span className={styles['icon-container']}>
        <Image fill src={IconSource || BelovedIcon} alt='태그 아이콘' />
      </span>
      <span className={styles.text}>{children}</span>
    </p>
  );
}
