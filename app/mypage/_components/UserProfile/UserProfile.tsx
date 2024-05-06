import classNames from 'classnames/bind';
import Image from 'next/image';

import HeartIcon from '@public/icons/check-heart.svg';
import { useDetailQueries } from '@queries/useUserQueries';
import useModalStore, { ModalName } from '@stores/useModalStore';
import { UserDetail } from '@types/User';

import Avatar from '@components/Avatar/Avatar';

import styles from './UserProfile.module.scss';
import UpdateProfileModal from '../UpdateProfileModal/UpdateProfileModal';

const cx = classNames.bind(styles);

// TODO: 타입 정의
export default function UserProfile({ userId }: { userId: number }) {
  const { toggleModal, name, setCurrentName } = useModalStore();

  function handleClickOpenModal(name: ModalName) {
    setCurrentName(name);
    toggleModal();
  }

  const { data, isLoading, isError, error } = useDetailQueries(userId);

  if (isLoading) return <div>로딩중...</div>;

  if (isError) return <div>에러 발생: {error.toString()}</div>;

  const userData: UserDetail | undefined = data?.data;

  console.log('userData', userData);

  return (
    <div className={cx('container')}>
      <Avatar size='large' imageSource={userData?.profileUrl || ''} />
      <button
        className={cx('button', 'text-black', 'x-small', 'weight-600')}
        type='button'
        onClick={() => handleClickOpenModal('updateProfile')}
      >
        프로필 수정
      </button>
      <div className={cx('user-detail')}>
        <p className={cx('user-nickname-section')}>
          <span className={cx('text-black', 'large', 'weight-600')}>{userData?.nickName}</span>
          <span className={cx('liked-count-wrapper')}>
            <Image className={cx('liked-count-icon')} src={HeartIcon} alt='하트 이미지' />
            <span className={cx('text-colored', 'weight-600')}>Lv.{userData?.likedCount}</span>
          </span>
        </p>
        <p className={cx('user-count-section')}>
          <span className={cx('count')}>
            <span className={cx('text-black', 'middle')}>전체 작성글 수</span>
            <span className={cx('text-black', 'middle', 'weight-500')}>{userData?.postCount}개</span>
          </span>
          <span className={cx('count')}>
            <span className={cx('text-black', 'middle')}>댓글 수</span>
            <span className={cx('text-black', 'middle', 'weight-500')}>{userData?.commentCount}개</span>
          </span>
        </p>
      </div>
      <p className={cx('text-black', 'small', 'bio-width')}>{userData?.bio}</p>

      {name === 'updateProfile' && <UpdateProfileModal />}
    </div>
  );
}
