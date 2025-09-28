import { useGetDistrict } from "@/fsd/entities/District/api/useGetDistrict";
import { ROUTES } from "@/fsd/shared/config/routes";
import { useActiveDistrict } from "@/fsd/shared/store/mapCoordinates/useActiveDistrict";
import { HomeOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { ItemType, MenuItemType } from "antd/es/menu/interface";
import Link from "next/link";

export const useGetNavItems = () => {
  const { data: districts, isLoading, error } = useGetDistrict();
  const { setActiveDistrict } = useActiveDistrict();

  const navItems: ItemType<MenuItemType>[] = [
    {
      key: "Домашняя",
      icon: <HomeOutlined />,
      label: <Link href={ROUTES.DISPATCHER}>Домашняя</Link>,
    },
    {
      key: "Округа",
      icon: <EnvironmentOutlined />,
      label: "Округа",
      children: districts?.map((district) => ({
        key: `okrug-${district.id}`,
        label: district.title,
        icon: <EnvironmentOutlined />,
        onClick: () => {
          setActiveDistrict(district);
        },
      })),
    },
  ];

  return { navItems, isLoading, error };
};
