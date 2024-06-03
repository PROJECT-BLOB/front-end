import classNames from 'classnames/bind';
import Image from 'next/image';

import ArrowCircleIcon from '@icons/arrow-circle-broken-down.svg';

import styles from '../LandingPage.module.scss';

const cx = classNames.bind(styles);

export default function Section1() {
  return (
    <section className={cx('title-section', 'text-white')}>
      <span className={cx('main-text', 'medium')}>
        여행중인가요? <br />
        시작하세요 <br />
      </span>
      <span className={cx('main-text', 'large')}>Blob</span>
      <span className={cx('sub-text-mobile')}>
        Blob은 지도 위에서 실시간으로 메모를 남기는 서비스입니다. 여행 중이거나 특별한 장소에서의 경험을 공유하고 다른
        사람들과 연결할 수 있는 플랫폼입니다. 이제 어디서든 자신의 이야기를 남기고 세상과 소통하세요
      </span>
      <span className={cx('sub-text')}>
        Blob은 지도 위에서 실시간으로 메모를 남기는 서비스입니다.
        <br /> 여행 중이거나 특별한 장소에서의 경험을 공유하고 다른 사람들과 연결할 수 있는 플랫폼입니다.
        <br /> 이제 어디서든 자신의 이야기를 남기고 세상과 소통하세요
      </span>
      <button type='button' className={cx('icon-arrow', 'position-relative')}>
        <Image fill src={ArrowCircleIcon} alt='화살표' />
      </button>
    </section>
  );
}
