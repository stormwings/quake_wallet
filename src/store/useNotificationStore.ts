import { create } from 'zustand';

interface NotificationState {
  hasUnreadNews: boolean;
  lastViewedNewsTimestamp: number | null;
  markNewsAsRead: () => void;
  setHasUnreadNews: (hasUnread: boolean) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  hasUnreadNews: true,
  lastViewedNewsTimestamp: null,
  markNewsAsRead: () =>
    set({
      hasUnreadNews: false,
      lastViewedNewsTimestamp: Date.now(),
    }),
  setHasUnreadNews: (hasUnread) => set({ hasUnreadNews: hasUnread }),
}));
