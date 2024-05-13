import classNames from 'classnames/bind';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import UserProfile from '@/app/mypage/_components/UserProfile/UserProfile';
import CloseIcon from '@icons/x-close.svg';
import useModalStore from '@stores/useModalStore';
import { useUserStore } from '@stores/userStore';

import MonoButton from '@components/Button/MonoButton';

import useSignout from './_hooks/useSignout';
import styles from './ProfileModal.module.scss';

const cx = classNames.bind(styles);

export default function ProfileModal() {
  const { toggleModal } = useModalStore();
  const { blobId } = useUserStore();
  const { handleSignout } = useSignout();

  const router = useRouter();

  const handleClickSignout = async () => {
    await handleSignout();
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
        <UserProfile blobId={blobId} />
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
