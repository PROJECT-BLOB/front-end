import classNames from 'classnames/bind';
import Image from 'next/image';
import Link from 'next/link';

import ArrowCircleIcon from '@icons/arrow-circle-broken-down.svg';
import CheckIcon from '@icons/check-verified-white.svg';
import ChevronIcon from '@icons/chevron-right-double.svg';
import MapImage from '@images/map.svg';
import TimeBlobImage from '@images/time-blob.svg';
import WriteModalImage from '@images/write-modal.svg';

import IconTag from '@components/IconTag/IconTag';

import styles from './LandingPage.module.scss';

const cx = classNames.bind(styles);

export default function LandingPage() {
  return (
    <div className={cx('container')}>
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

      <section style={{ width: '100%' }}>
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
            Time-Blob 시스템
            <br /> 유용하지 않은 정보는 지도에서 금새 사라져요.
          </span>
          <div className={cx('image-timeblob', 'position-relative')}>
            <Image fill src={TimeBlobImage} alt='타임블롭 이미지' />
          </div>
          <div className={cx('image-wrapper-timeblob')}>
            <div className={cx('image-timeblob-mobile')}>
              <Image fill src={TimeBlobImage} alt='타임블롭 이미지' />
            </div>
          </div>
        </div>

        <div className={cx('service-feature-timeblob-content')}>
          <div className={cx('beloved-badge')}>
            <IconTag>Beloved 뱃지</IconTag>
            <span className={cx('feature-text-medium')}>
              유저들이 인정한 진짜 필수 정보를 한눈에 알아볼 수 있게 도와줘요.
            </span>
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
    </div>
  );
}
