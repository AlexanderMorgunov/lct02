"use client";
import { Badge, Dropdown, List, MenuProps } from "antd";
import { BellOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import NotificationMenuItem from "./NotificationMenuItem";
import { useSocket } from "@/fsd/shared/hooks/useSocket";
import { IDispatcherNotifications } from "@/fsd/shared/store/dispatcherNotifications/type";
import { useDispatcherNotifications } from "@/fsd/shared/store/dispatcherNotifications/useDispatcherNotifications";

export const NotificationMenu = () => {
  const { addNotification, notifications, removeNotification } =
    useDispatcherNotifications();

  const data = useSocket<IDispatcherNotifications>({
    event: "accident",
  });

  const getId = (data: IDispatcherNotifications) => {
    return `${data.location_id}-${data.date_at}-${data.time_of_day}`;
  };

  useEffect(() => {
    if (data) {
      const { location_id, date_at } = data;
      const title = `${date_at} Новое происшествие локация ${location_id}`;
      const id = getId(data);
      addNotification({ id, location_id, title });
    }
  }, [data, addNotification]);

  const handleDeleteNotification = (id: string) => {
    removeNotification(id);
  };

  const menuItems: MenuProps["items"] = [
    {
      key: "notifications",
      label: (
        <div className="w-80 max-h-96 overflow-y-auto">
          <List
            dataSource={notifications}
            locale={{ emptyText: "Нет уведомлений" }}
            renderItem={({ id, title, location_id }) => (
              <NotificationMenuItem
                id={id}
                text={title}
                handleDelete={handleDeleteNotification}
                location_id={location_id}
              />
            )}
          />
        </div>
      ),
    },
  ];

  return (
    <Dropdown
      trigger={["click"]}
      placement="bottomRight"
      menu={{ items: menuItems }}
    >
      <Badge count={notifications.length}>
        <BellOutlined className="text-2xl cursor-pointer !text-primary-text" />
      </Badge>
    </Dropdown>
  );
};
