import {Avatar, Dropdown, MenuProps} from "antd";
import { UserOutlined } from "@ant-design/icons";
import NotificationMenuItem from "@/fsd/features/PageLayout/ui/NotificationMenuItem";
import React from "react";
import { IconLogout } from "@/fsd/shared/ui/IconLogout";
import {Logout} from "@/fsd/features/Logout";


export const AvatarMenu = () => {
  const menuItems: MenuProps["items"] = [
    {
      key: "avatarMenuLogout",
      label: (<Logout />),
    },
  ];

  return (
    <Dropdown
      trigger={["click"]}
      placement="bottomRight"
      menu={{ items: menuItems }}
    >
      <Avatar className={'cursor-pointer'} icon={<UserOutlined />} />
    </Dropdown>
  );
}