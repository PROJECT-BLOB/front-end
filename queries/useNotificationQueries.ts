import { useQuery } from '@tanstack/react-query';

import getNotificationList from '@apis/notification/getNotificationList';
import readNotification from '@apis/notification/readNotification';
import readNotificationAll from '@apis/notification/readNotificationAll';
import { POSTS_PAGE_LIMIT } from '@constants/pageValues';

import { notifications } from './keys/notificationQueryKeys';
import useInfiniteScrollQuery from './useInfiniteScrollQuery';

export function useFetchNotificationList() {
  return useInfiniteScrollQuery({
    queryKey: notifications.all.queryKey,
    queryFn: (page: number) => getNotificationList({ page, size: POSTS_PAGE_LIMIT }),
  });
}

export function useReadNotification(notificationId: number) {
  return useQuery({
    queryKey: notifications.detail(notificationId).queryKey,
    queryFn: () => readNotification(notificationId),
  });
}

export function useReadNotificationAll() {
  return useQuery({
    queryKey: notifications.all.queryKey,
    queryFn: () => readNotificationAll(),
  });
}
