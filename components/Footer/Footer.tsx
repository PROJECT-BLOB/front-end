import classNames from 'classnames/bind';
import Image from 'next/image';

import Logo from '@icons/logo-ver2-small.svg';

import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

export default function Footer() {
  return (
    <div className={cx('container')}>
      <div className={cx('logo')}>
        <Image src={Logo} alt='logo' />
      </div>
      <div className={cx('text-wrapper', 'text')}>
        <p className={cx('label')}>
          <span>여행 기록 서비스, BLOB</span>
          <span>Contact : codeitblob01@gmail.com</span>
        </p>
        <span className={cx('caption')}>@2024 BlOB. All rights reserved</span>
      </div>
    </div>
  );
}
