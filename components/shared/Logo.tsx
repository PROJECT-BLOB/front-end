import Link from 'next/link';

import LogoIcon from '@icons/logo-ver2-small.svg?component';

import styles from './Logo.module.scss';

interface LogoProps {
  url?: string;
  size?: 'small' | 'medium' | 'large';
}

export default function Logo({ url = '/', size = 'small' }: LogoProps) {
  return (
    <Link href={url}>
      <LogoIcon className={`${styles[size]}`} />
    </Link>
  );
}
