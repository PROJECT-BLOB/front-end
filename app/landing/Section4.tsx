import classNames from 'classnames/bind';
import Image from 'next/image';
import Link from 'next/link';

import ChevronIcon from '@icons/chevron-right-double.svg';

import styles from '../LandingPage.module.scss';

const cx = classNames.bind(styles);

export default function LandingPage() {
  return (
    <section className={cx('start-section')}>
      <div className={cx('text-white', 'small')}>
        여행의 소중한 순간을 공유하세요!
        <br /> 여행 팁부터 특별한 숨은 명소까지, 새로운 여행 경험을 함께 나눠보세요.
      </div>
      <Link href='/signin' style={{ textDecoration: 'none' }}>
        <button type='button' className={cx('button-colored')}>
          <span>Blob 시작하기</span>
          <div className={cx('icon-chevron', 'position-relative')}>
            <Image fill src={ChevronIcon} alt='블롭 시작하기 버튼' />
          </div>
        </button>
      </Link>
    </section>
  );
}
