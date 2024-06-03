import classNames from 'classnames/bind';
import Link from 'next/link';

import styles from '../LandingPage.module.scss';

const cx = classNames.bind(styles);

export default function LandingPage() {
  return (
    <section className={cx('core-feature-section')}>
      <div className={cx('index')}>
        <div className={cx('line')} />
        <span>핵심기능</span>
        <div className={cx('line')} />
      </div>

      <div className={cx('core-functionality-box')}>
        <div className={cx('description-box', 'color-green')}>
          <p className={cx('paragraph')}>
            <span className={cx('p-text-large')}>
              실시간 위치 기반 <br />
              정보공유
            </span>
            <span className={cx('p-text-default')}>
              다섯가지 태그로
              <br /> 쉽고 빠르게
            </span>
          </p>
          <Link href='/map' style={{ textDecoration: 'none', width: '100%' }}>
            <button type='button' className={cx('button-black')}>
              맵에서 실시간 정보 확인하기
            </button>
          </Link>
        </div>

        <div className={cx('description-box', 'color-gray')}>
          <p className={cx('paragraph')}>
            <span className={cx('p-text-large')}>
              궁금한 도시 정보만
              <br />
              한번에 모아보기
            </span>
            <span className={cx('p-text-default')}>
              필터링을 통해
              <br /> 보고싶은 도시정보만 쉽고 빠르게
            </span>
          </p>
          <Link href='/feed' style={{ textDecoration: 'none', width: '100%' }}>
            <button type='button' className={cx('button-black')}>
              피드에서 도시정보 모아보기
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
