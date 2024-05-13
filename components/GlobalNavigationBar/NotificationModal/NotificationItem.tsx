import classNames from 'classnames/bind';
import Image from 'next/image';

import { Notification } from '@/types/Notification';
import HeartIcon from '@icons/check-heart-pink.svg';
import CloseIcon from '@icons/x-close.svg';
import { useReadNotification } from '@queries/useNotificationQueries';

import styles from './NotificationItem.module.scss';

const cx = classNames.bind(styles);

export default function NotificationItem({ notification }: { notification: Notification }) {
  const { mutate: deleteNotificationMutate } = useReadNotification();

  const handleClickDeleteNotification = () => {
    deleteNotificationMutate(notification.notificationId);

    console.log(notification.notificationId, '번 알림을 삭제합니다.');
  };

  return (
    <div className={cx('container')}>
      <span className={cx('icon')}>
        <Image fill src={HeartIcon} alt='하트 아이콘' />
      </span>
      <span className={cx('content', 'cursor-pointer')}>{notification.message}</span>
      <span className={cx('icon', 'cursor-pointer')}>
        <Image fill src={CloseIcon} alt='알림 삭제' onClick={handleClickDeleteNotification} />
      </span>
    </div>
  );
}
