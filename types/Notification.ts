export interface Notification {
  notificationId: number;
  postId: number;
  message: string;
}

export interface NotificationListProps {
  content: Array<Notification>;
  count: number;
  currentPage: number;
  hasMore: boolean;
}
