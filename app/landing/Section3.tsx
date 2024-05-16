import classNames from 'classnames/bind';
import Image from 'next/image';

import CheckIcon from '@icons/check-verified-white.svg';
import MapImage from '@images/map.svg';
import TimeBlobImage from '@images/time-blob.svg';
import WriteModalImage from '@images/write-modal.svg';

import IconTag from '@components/IconTag/IconTag';

import styles from '../LandingPage.module.scss';

const cx = classNames.bind(styles);

export default function LandingPage() {
  return (
    <section
      style={{
        width: '100%',
      }}
    >
      <div className={cx('index')}>
        <div className={cx('line')} />
        <span>서비스 특징</span>
        <div className={cx('line')} />
      </div>

      <div className={cx('service-feature-filtering')}>
        <p className={cx('filtering-paraghaph')}>
          <span className={cx('feature-text-large')}>지도위에 펼쳐진 생생한 현지정보들! </span>
          <span className={cx('feature-text-medium')}>이제 검색창에서 헤매지 마세요</span>
        </p>
        <p className={cx('feature-text-small')}>
          지도위에 표시된 Blob과 필터링으로 간편하게!
          <br /> 북마크를 활용해서 나만의 여행 지도를 만들어봐요.
        </p>
      </div>
      <div className={cx('image-wrapper-map')}>
        <div className={cx('image-map')}>
          <Image fill src={MapImage} alt='지도 이미지' style={{ objectFit: 'cover' }} />
        </div>
      </div>

      <div className={cx('service-feature-timeblob')}>
        <span className={cx('feature-text-large')}>가장 믿을 수 있는 정보, Blob </span>
        <span className={cx('feature-text-small')}>
          Blob-Time 시스템
          <br /> 유용하지 않은 정보는 지도에서 금새 사라져요.
        </span>
      </div>

      <div className={cx('service-feature-timeblob-content')}>
        <div className={cx('beloved-badge')}>
          <IconTag>Beloved 뱃지</IconTag>
          <span className={cx('feature-text-medium')}>
            유저들이 인정한 진짜 필수 정보를 한눈에 알아볼 수 있게 도와줘요.
          </span>
        </div>
        <div className={cx('image-wrapper-timeblob')}>
          <div className={cx('image-timeblob-mobile')}>
            <Image fill src={TimeBlobImage} alt='타임블롭 이미지' />
          </div>
        </div>
        <div className={cx('image-timeblob', 'position-relative')}>
          <Image fill src={TimeBlobImage} alt='타임블롭 이미지' />
        </div>
      </div>

      <div className={cx('service-feature-distance')}>
        <div className={cx('certification-mark-box')}>
          <IconTag IconSource={CheckIcon} color='blue'>
            50m이내 작성됨 인증마크
          </IconTag>
          <div className={cx('feature-text-medium')}>
            지도에 표시된 위치와 작성자간의 거리를 통해 현지 정보를 확인하세요
          </div>
        </div>
        <div className={cx('image-wrapper-write-modal')}>
          <div className={cx('image-write-modal-mobile')}>
            <Image fill src={WriteModalImage} alt='글쓰기 모달 이미지' style={{ objectFit: 'cover' }} />
          </div>
        </div>
        <div className={cx('image-write-modal', 'position-relative')}>
          <Image fill src={WriteModalImage} alt='글쓰기 모달 이미지' style={{ objectFit: 'cover' }} />
        </div>
      </div>
    </section>
  );
}
