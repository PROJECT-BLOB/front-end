'use client';

import Link from 'next/link';

import BlobButton from '@components/Button/BlobButton';

import styles from './MenuBar.module.scss';

export default function SigninMenubar() {
  return (
    <Link className={styles.login} href={'/signin'}>
      <BlobButton text='로그인' type='button' color='button-colord-contain' />
    </Link>
  );
}
