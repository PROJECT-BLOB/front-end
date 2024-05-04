import Link from 'next/link';

import LogoIcon from '@icons/logo-BLOB.svg?component';

import styles from './Logo.module.scss';

interface LogoProps {
  url?: string;
}

export default function Logo({ url = '/' }: LogoProps) {
  return (
    <Link href={url}>
      <LogoIcon className={styles.logo} />
    </Link>
  );
}
