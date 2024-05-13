import React from 'react';

import NotificationIconIconWithoutNew from '@icons/bell-01.svg?component';
import NotificationIconWithNew from '@icons/bell-alarm-24.svg?component';

interface NotificationProps {
  hasNewNotification: boolean;
  onClick: () => void;
}

export default function NotificationIcon({ hasNewNotification = false, onClick }: NotificationProps) {
  return (
    <div>
      {hasNewNotification ? (
        <NotificationIconWithNew width={24} height={24} onClick={onClick} style={{ cursor: 'pointer' }} />
      ) : (
        <NotificationIconIconWithoutNew width={24} height={24} onClick={onClick} style={{ cursor: 'pointer' }} />
      )}
    </div>
  );
}
