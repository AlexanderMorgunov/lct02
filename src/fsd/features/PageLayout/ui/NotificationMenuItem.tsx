import { Button, List } from "antd";
import React from "react";
import { CloseOutlined, InfoCircleOutlined } from "@ant-design/icons";

interface INotificationMenuItem {
  id: number;
  text: string;
  handleDelete: (id: number) => void;
}

const NotificationMenuItem = ({
  id,
  text,
  handleDelete,
}: INotificationMenuItem) => {
  return (
    <List.Item
      key={id}
      className="cursor-pointer text-sm rounded-md px-2 hover:opacity-70"
    >
      <div className="flex items-center justify-between w-full">
        {/* Иконка слева */}
        <div className="flex items-center gap-4">
          <InfoCircleOutlined />
          <span>{text}</span>
        </div>

        {/* Кнопка удаления */}
        <Button
          type="text"
          size="small"
          danger
          icon={<CloseOutlined />}
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            handleDelete(id);
          }}
        />
      </div>
    </List.Item>
  );
};

export default NotificationMenuItem;
