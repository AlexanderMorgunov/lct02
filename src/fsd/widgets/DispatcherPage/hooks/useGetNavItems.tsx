import { useGetDistrict } from "@/fsd/entities/District/api/useGetDistrict";
import { ROUTES } from "@/fsd/shared/config/routes";
import {
  AreaChartOutlined,
  AlertOutlined,
  HomeOutlined,
  DashboardOutlined,
  FundProjectionScreenOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { ItemType, MenuItemType } from "antd/es/menu/interface";
import Link from "next/link";

export const useGetNavItems = () => {
  const { data: districts, isLoading, error } = useGetDistrict();

  console.log(districts);

  const navItems: ItemType<MenuItemType>[] = [
    {
      key: "Домашняя",
      icon: <HomeOutlined />,
      label: <Link href={ROUTES.DISPATCHER}>Домашняя</Link>,
    },
    {
      key: "Показания",
      icon: <DashboardOutlined />,
      label: <Link href={ROUTES.DISPATCHER_INDICATIONS}>Показания</Link>,
    },
    {
      key: "Аварии",
      icon: <AlertOutlined />,
      label: <Link href={ROUTES.DISPATCHER_ACCIDENTS}>Аварии</Link>,
    },
    {
      key: "Аналитика",
      icon: <AreaChartOutlined />,
      label: <Link href={ROUTES.DISPATCHER_ANALYTICS}>Аналитика</Link>,
    },
    {
      key: "Прогноз",
      icon: <FundProjectionScreenOutlined />,
      label: <Link href={ROUTES.DISPATCHER_FORECAST}>Прогноз</Link>,
    },
    {
      key: "Округа",
      icon: <EnvironmentOutlined />,
      label: "Округа",
      children: districts?.map((district) => ({
        key: `okrug-${district.id}`,
        label: <Link href={`/okrug/${district.id}`}>{district.title}</Link>,
        icon: <EnvironmentOutlined />,
      })),
      //   children: [
      //     {
      //       key: "okrug-1",
      //       label: <Link href="/okrug/1">Центральный</Link>,
      //       icon: <EnvironmentOutlined />,
      //     },
      //     {
      //       key: "okrug-2",
      //       label: <Link href="/okrug/2">Северный</Link>,
      //       icon: <EnvironmentOutlined />,
      //     },
      //     {
      //       key: "okrug-3",
      //       label: <Link href="/okrug/3">Южный</Link>,
      //       icon: <EnvironmentOutlined />,
      //     },
      //   ],
    },
  ];

  return { navItems, isLoading, error };
};
