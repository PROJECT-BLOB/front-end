import Image from 'next/image';
import Link from 'next/link';

import home from '@public/icons/home.svg';
import notFound from '@public/images/404.png';

import styles from './not-found.module.scss';

export default function NotFound() {
  return (
    <div className={styles['not-found']}>
      <Image src={notFound} alt='not-found' className={styles.image} />
      <div className={styles['mention-wrapper']}>
        <p className={styles.mention}>잘못된 접근입니다.</p>
        <Link href='/' className={styles['to-main']}>
          <Image src={home} alt='home' /> 메인으로 이동
        </Link>
      </div>
    </div>
  );
}
