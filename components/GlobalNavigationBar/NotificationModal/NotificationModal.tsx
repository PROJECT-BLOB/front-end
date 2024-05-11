import classNames from 'classnames/bind';
import Image from 'next/image';

import CloseIcon from '@icons/x-close.svg';
import { useReadNotificationAll } from '@queries/useNotificationQueries';
import useModalStore from '@stores/useModalStore';

import NotificationList from './NotificationList';
import styles from './NotificationModal.module.scss';

const cx = classNames.bind(styles);

export default function NotificationModal() {
  const { toggleModal } = useModalStore();

  function handleClickDeleteAll() {
    const { data } = useReadNotificationAll();
    console.log('알림을 모두 삭제합니다.', data);
  }

  return (
    <div className={cx('modal-container')}>
      <header className={cx('header')}>
        <span className={cx('title')}>알림</span>
        <span className={cx('close')}>
          <Image src={CloseIcon} fill alt='닫기' onClick={toggleModal} />
        </span>
      </header>
      <main className={cx('notification-list-container')}>
        <button type='button' className={cx('delete-button')} onClick={handleClickDeleteAll}>
          모두 삭제
        </button>
        <NotificationList />
      </main>
    </div>
  );
}
