import { useMutation, useQueryClient } from '@tanstack/react-query';

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

export function useReadNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: readNotification,
    onSuccess: ({ data }) => {
      console.log(data);

      queryClient.invalidateQueries({ queryKey: notifications.all.queryKey });
    },
    onError: (error) => {
      console.error('실패ㅜㅜ:', error);
    },
  });
}

export function useReadNotificationAll() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: readNotificationAll,
    onSuccess: ({ data }) => {
      console.log(data);

      queryClient.invalidateQueries({ queryKey: notifications.all.queryKey });
    },
    onError: (error) => {
      console.error('실패ㅜㅜ:', error);
    },
  });
}
