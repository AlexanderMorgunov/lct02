"use client";
import { Badge, Dropdown, List, MenuProps } from "antd";
import { mockNotifications } from "../mock/mockNotifications";
import { BellOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import NotificationMenuItem from "./NotificationMenuItem";

export const NotificationMenu = () => {
  const [notifications, setNotifications] = useState(mockNotifications);

  const handleDeleteNotification = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const menuItems: MenuProps["items"] = [
    {
      key: "notifications",
      label: (
        <div className="w-80 max-h-96 overflow-y-auto">
          <List
            dataSource={notifications}
            locale={{ emptyText: "Нет уведомлений" }}
            renderItem={({ id, text }) => (
              <NotificationMenuItem
                id={id}
                text={text}
                handleDelete={handleDeleteNotification}
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
      <Badge count={mockNotifications.length}>
        <BellOutlined className="text-2xl cursor-pointer !text-primary-text" />
      </Badge>
    </Dropdown>
  );
};
