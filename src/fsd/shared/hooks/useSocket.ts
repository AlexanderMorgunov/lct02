import { useEffect, useState } from "react";
import { socket } from "../network/socket";

interface IUseSocket<T> {
  event: string;
  params?: Record<string, unknown>;
  initialData?: T;
}

export const useSocket = <T = unknown>({
  event,
  params,
  initialData,
}: IUseSocket<T>) => {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    // подписка на событие с параметрами
    if (params) {
      socket.emit("subscribe:" + event, params);
    }

    socket.on(event, (payload: T) => {
      setData(payload);
    });

    return () => {
      socket.off(event);
      if (params) {
        socket.emit("unsubscribe:" + event, params);
      }
    };
  }, [event, params]);

  return data || initialData;
};
