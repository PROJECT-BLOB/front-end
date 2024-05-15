import classNames from 'classnames/bind';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import UserProfile from '@/app/mypage/_components/UserProfile/UserProfile';
import CloseIcon from '@icons/x-close.svg';
import { useSignout } from '@queries/useUserQueries';
import useModalStore from '@stores/useModalStore';
import { useUserStore } from '@stores/userStore';

import MonoButton from '@components/Button/MonoButton';

import styles from './ProfileModal.module.scss';

const cx = classNames.bind(styles);

export default function ProfileModal() {
  const { toggleModal } = useModalStore();
  const { blobId } = useUserStore();
  const { mutate: signoutMutate } = useSignout();

  const router = useRouter();

  const handleClickSignout = () => {
    // 로그아웃
    signoutMutate();

    // 모달 닫고 메인으로 이동
    toggleModal();
    router.push('/');
  };

  const handleClickMypage = () => {
    router.push('/mypage');
    toggleModal();
  };

  return (
    <div className={cx('modal-container')}>
      <header className={cx('header')}>
        <span className={cx('title')}>프로필</span>
        <button type='button' className={cx('close')}>
          <Image src={CloseIcon} fill alt='닫기' onClick={toggleModal} />
        </button>
      </header>
      <main>
        <UserProfile blobId={blobId} isModal />
      </main>
      <footer className={cx('routing-buttons')}>
        <MonoButton type='button' onClick={handleClickMypage}>
          마이페이지
        </MonoButton>

        <MonoButton type='button' onClick={handleClickSignout}>
          로그아웃
        </MonoButton>
      </footer>
    </div>
  );
}
