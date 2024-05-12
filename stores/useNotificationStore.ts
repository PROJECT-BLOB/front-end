/* eslint-disable object-shorthand */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface NotificationStore {
  hasNewNotification: boolean;
  previousNotifications: Array<Notification | null>;
  setHasNewNotification: (hasNewNotification: boolean) => void;
  setPreviousNotifications: (notifications: Array<Notification | null>) => void;
}

// export const useNotificationStore = create<NotificationStore>((set) => ({
//   hasNewNotification: false,
//   previousNotifications: [],
//   setHasNewNotification: (hasNewNotification: boolean) => set({ hasNewNotification: hasNewNotification }),
//   setPreviousNotifications: (notifications) => set({ previousNotifications: notifications }),
// }));

export const useNotificationStore = create(
  persist<NotificationStore>(
    (set) => ({
      hasNewNotification: false,
      previousNotifications: [],
      setHasNewNotification: (hasNewNotification: boolean) => set({ hasNewNotification }),
      setPreviousNotifications: (notifications) => set({ previousNotifications: notifications }),
    }),
    {
      name: 'notificationStorage',
    },
  ),
);
