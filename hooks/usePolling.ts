import { useEffect } from 'react';

import getNotificationList from '@apis/notification/getNotificationList';
import { useNotificationStore } from '@stores/useNotificationStore';

// Polling 주기 (밀리초)
const POLLING_INTERVAL = 100000; // 몇초로 하는게 적당할까요...일단 1분으로 해둠

export default function usePolling() {
  const { previousNotificationId, setPreviousNotificationId, setHasNewNotification } = useNotificationStore();

  useEffect(() => {
    const fetchNotificationData = async () => {
      try {
        const { data } = await getNotificationList({ page: 0, size: 1 });

        const newNotificationId: number = data.content[0]?.notificationId ?? -1;

        const isNewNotificationAdded = newNotificationId > previousNotificationId;
        console.log('isNewNotificationAdded', isNewNotificationAdded);

        if (isNewNotificationAdded) {
          setHasNewNotification(true);
        }

        setPreviousNotificationId(newNotificationId);
      } catch (error) {
        console.error(error);
      }
    };

    const intervalId = setInterval(fetchNotificationData, POLLING_INTERVAL);

    return () => {
      clearInterval(intervalId); // 컴포넌트가 unmount 되면 interval 제거
    };
  }, [setHasNewNotification, previousNotificationId, setPreviousNotificationId]);
}
