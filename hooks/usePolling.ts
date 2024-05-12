import { useEffect } from 'react';

import { Notification } from '@/types/Notification';
import getNotificationList from '@apis/notification/getNotificationList';
import { useNotificationStore } from '@stores/useNotificationStore';

// Polling 주기 (밀리초)
const POLLING_INTERVAL = 100000; // 몇초로 하는게 적당할까요...일단 1분으로 해둠

export default function usePolling() {
  const { previousNotifications, setPreviousNotifications, setHasNewNotification } = useNotificationStore();

  useEffect(() => {
    const fetchNotificationData = async () => {
      try {
        // TODO: 알림 기능 수정해야됨..
        // 최근 알림을 전이랑 비교하는 방식으로 새로운 알림이 있는지 확인하고 있는데
        // 이러면 알림을 지우는 경우에도 hasNewNotification으로 간주됨...
        // 백에서 알림이 추가될 때 클라이언트에게 알려주는 방식으로 해야되는거 아닐까?ㅜㅠㅜ
        // 해결방법을 모르겠어요....

        const { data } = await getNotificationList({ page: 0, size: 1 });

        const newNotifications: Array<Notification | null> = data.content ?? [];

        const newNotificationIds = newNotifications.map(
          (notification: Notification | null) => notification?.notificationId,
        );

        // TODO: 타입에러 죽여버려..
        const previousNotificationIds = previousNotifications.map((notification: any) => notification?.notificationId);

        const isNewNotificationAdded = newNotificationIds.some((id) => !previousNotificationIds.includes(id));

        if (isNewNotificationAdded) {
          setHasNewNotification(true);
        }

        // TODO: 타입에러 죽여버려..
        setPreviousNotifications(newNotifications);
      } catch (error) {
        console.error(error);
      }
    };

    const intervalId = setInterval(fetchNotificationData, POLLING_INTERVAL);

    return () => {
      clearInterval(intervalId); // 컴포넌트가 unmount 되면 interval 제거
    };
  }, [setHasNewNotification, previousNotifications, setPreviousNotifications]);
}
