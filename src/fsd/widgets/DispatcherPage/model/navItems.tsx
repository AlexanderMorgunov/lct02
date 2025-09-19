import { ROUTES } from "@/fsd/shared/config/routes";
import {
  AreaChartOutlined,
  SettingOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { ItemType, MenuItemType } from "antd/es/menu/interface";
import Link from "next/link";

export const navItems: ItemType<MenuItemType>[] = [
  {
    key: "Статистика",
    icon: <AreaChartOutlined />,
    label: <Link href={ROUTES.DISPATCHER}>Статистика</Link>,
    theme: "dark",
  },
  {
    key: "Аварии",
    icon: <SettingOutlined />,
    label: <Link href="#">Аварии</Link>,
  },
  {
    key: "Округа",
    icon: <EnvironmentOutlined />,
    label: "Округа",
    children: [
      {
        key: "okrug-1",
        label: <Link href="/okrug/1">Центральный</Link>,
        icon: <EnvironmentOutlined />,
      },
      {
        key: "okrug-2",
        label: <Link href="/okrug/2">Северный</Link>,
        icon: <EnvironmentOutlined />,
      },
      {
        key: "okrug-3",
        label: <Link href="/okrug/3">Южный</Link>,
        icon: <EnvironmentOutlined />,
      },
    ],
  },
];
