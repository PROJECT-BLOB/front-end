import classNames from 'classnames/bind';
import Image from 'next/image';

import HeartIcon from '@public/icons/check-heart.svg';

import Avatar from '@components/Avatar/Avatar';

import styles from './UserProfile.module.scss';

const cx = classNames.bind(styles);

// TODO: 타입 정의
export default function UserProfile({ userData }: any) {
  return (
    <div className={cx('container')}>
      <Avatar size='large' imageSource={userData?.profileUrl} />
      <div className={cx('user-detail')}>
        <p className={cx('user-nickname-section')}>
          <span className={cx('user-nickname')}>닉네임</span>
          <span className={cx('liked-count-wrapper')}>
            <Image className={cx('liked-count-icon')} src={HeartIcon} alt='하트 이미지' />
            <span className={cx('liked-count')}>Lv.{userData?.likedCount}</span>
          </span>
        </p>
        <p className={cx('user-count-section')}>
          <span className={cx('count')}>
            <span>전체 작성글 수</span>
            <span className={cx('count-number')}>n개</span>
          </span>
          <span className={cx('count')}>
            <span>댓글 수</span>
            <span className={cx('count-number')}>n개</span>
          </span>
        </p>
      </div>
      <p className={cx('bio')}>바이오</p>
    </div>
  );
}
