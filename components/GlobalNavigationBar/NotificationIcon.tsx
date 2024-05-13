import React from 'react';

import NotificationIconIconWithoutNew from '@icons/bell-01.svg?component';
import NotificationIconWithNew from '@icons/bell-alarm-24.svg?component';

interface NotificationProps {
  hasNewNotification: boolean;
  onClick: () => void;
}

/*
 * TODO: 알림(notification) 할일
 * 알림 타입 만들기-> 완
 * 알림 axios 만들기->완
 * NotificationQuery 만들기 -> useNotificationQuery-> 완
 * 서버상태: NotificationStore 만들기 -> useNotificationStore
 * */

export default function NotificationIcon({ hasNewNotification = false, onClick }: NotificationProps) {
  return (
    <div>
      {hasNewNotification ? (
        <NotificationIconWithNew width={24} height={24} onClick={onClick} />
      ) : (
        <NotificationIconIconWithoutNew width={24} height={24} onClick={onClick} />
      )}
    </div>
  );
}
