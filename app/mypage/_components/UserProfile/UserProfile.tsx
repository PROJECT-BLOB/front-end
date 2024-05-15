import classNames from 'classnames/bind';
import Image from 'next/image';

import { UserDetail } from '@/types/User';
import HeartIcon from '@public/icons/check-heart.svg';
import { useDetailQueries } from '@queries/useUserQueries';
import useModalStore, { ModalName } from '@stores/useModalStore';

import Avatar from '@components/Avatar/Avatar';
import MonoButton from '@components/Button/MonoButton';

import styles from './UserProfile.module.scss';

const cx = classNames.bind(styles);

export default function UserProfile({
  blobId,
  isMypage,
  isModal,
}: {
  blobId: string;
  isMypage?: boolean;
  isModal?: boolean;
}) {
  const { toggleModal, setCurrentName } = useModalStore();
  function handleClickOpenModal(name: ModalName) {
    setCurrentName(name);
    toggleModal();
  }

  const padding = isModal ? 'p-small' : 'p-large';

  const { data, isLoading, isError, error } = useDetailQueries(blobId);

  if (isLoading) return <div>로딩중...</div>;

  if (isError) return <div>에러 발생: {error.toString()}</div>;

  const userData: UserDetail | undefined = data?.data;

  return (
    <div className={cx('container', padding)}>
      <Avatar size='large' imageSource={userData?.profileUrl || ''} />
      {isMypage && (
        <MonoButton type='button' size='large' onClick={() => handleClickOpenModal('updateProfile')}>
          프로필 수정
        </MonoButton>
      )}

      <div className={cx('user-detail')}>
        <p className={cx('user-nickname-section')}>
          <span className={cx('text-black', 'large', 'weight-600')}>{userData?.nickname}</span>
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
    </div>
  );
}
