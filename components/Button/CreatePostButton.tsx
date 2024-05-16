import React from 'react';

import Image from 'next/image';

import EllipseIcon from '@icons/ellipse-63.svg?component';
import PlusIcon from '@icons/plus.svg';

import styles from './CreatePostButton.module.scss';

interface CreatePostButtonProps {
  onClick?: () => void;
}

export default function CreatePostButton({ onClick }: CreatePostButtonProps = {}) {
  return (
    <button type='button' className={styles.background} onClick={onClick}>
      <EllipseIcon className={styles.ellipse} />
      <Image className={styles.plus} src={PlusIcon} alt='글쓰기 아이콘' />
    </button>
  );
}
