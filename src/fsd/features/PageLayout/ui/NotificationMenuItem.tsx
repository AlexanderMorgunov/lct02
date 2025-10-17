import { Button, List } from "antd";
import React from "react";
import { CloseOutlined, InfoCircleOutlined } from "@ant-design/icons";
import Link from "next/link";
import { ROUTES } from "@/fsd/shared/config/routes";

interface INotificationMenuItem {
  id: string;
  text: string;
  handleDelete: (id: string) => void;
  location_id: number;
}

const NotificationMenuItem = ({
  id,
  text,
  handleDelete,
  location_id,
}: INotificationMenuItem) => {
  return (
    <List.Item
      key={id}
      className="cursor-pointer text-sm rounded-md  hover:bg-primary-bg !px-1"
    >
      <div className="flex items-center justify-between w-full">
        {/* Иконка слева */}
        <div className="flex items-center gap-4">
          <Link
            href={`${ROUTES.DISPATCHER_LOCATION}/${location_id}`}
            className="flex gap-4 text-primary-text"
          >
            <InfoCircleOutlined />
            <span>{text}</span>
          </Link>
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
