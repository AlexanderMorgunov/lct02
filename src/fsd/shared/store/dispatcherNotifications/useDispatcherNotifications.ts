"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface IDispatcherNotification {
  id: string;
  location_id: number;
  title: string;
}

interface IDispatcherNotificationsStore {
  notifications: IDispatcherNotification[];
  addNotification: (notification: IDispatcherNotification) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

let debounceTimer: NodeJS.Timeout | null = null;
const DEBOUNCE_DELAY = 10; // мс
const MAX_NOTIFICATIONS = 100;

export const useDispatcherNotifications =
  create<IDispatcherNotificationsStore>()(
    persist(
      (set) => ({
        notifications: [],
        addNotification: (notification) => {
          if (debounceTimer) clearTimeout(debounceTimer);

          debounceTimer = setTimeout(() => {
            set((state) => {
              // проверка на дубликаты
              const exists = state.notifications.some(
                (n) => n.id === notification.id
              );
              if (exists) return state;

              const updated = [notification, ...state.notifications];

              // обрезаем до MAX_NOTIFICATIONS
              return { notifications: updated.slice(0, MAX_NOTIFICATIONS) };
            });
          }, DEBOUNCE_DELAY);
        },
        removeNotification: (id) =>
          set((state) => ({
            notifications: state.notifications.filter((n) => n.id !== id),
          })),
        clearNotifications: () => set({ notifications: [] }),
      }),
      {
        name: "dispatcher-notifications",
      }
    )
  );
