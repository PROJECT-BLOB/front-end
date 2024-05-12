import { NotificationListProps } from '@/types/Notification';
import instance from '@apis/axios';

interface GetNotificationListProps {
  page: number;
  size: number;
}

export default async function getNotificationList(
  body: GetNotificationListProps,
): Promise<{ data: NotificationListProps; status: number }> {
  const { data, status } = await instance.get<NotificationListProps>(`/notification`, {
    params: { page: body.page, size: body.size },
  });

  return { data, status };
}
