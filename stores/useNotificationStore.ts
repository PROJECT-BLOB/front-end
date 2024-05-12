/* eslint-disable object-shorthand */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface NotificationStore {
  hasNewNotification: boolean;
  previousNotificationId: number;
  setHasNewNotification: (hasNewNotification: boolean) => void;
  setPreviousNotificationId: (notificationId: number) => void;
}

export const useNotificationStore = create(
  persist<NotificationStore>(
    (set) => ({
      hasNewNotification: false,
      previousNotificationId: 0,
      setHasNewNotification: (hasNewNotification: boolean) => set({ hasNewNotification }),
      setPreviousNotificationId: (notificationId) => set({ previousNotificationId: notificationId }),
    }),
    {
      name: 'notificationStorage',
    },
  ),
);
