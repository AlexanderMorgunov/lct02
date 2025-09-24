import { useGetDistrict } from "@/fsd/entities/District/api/useGetDistrict";
import { ROUTES } from "@/fsd/shared/config/routes";
import { useMapCoordinates } from "@/fsd/shared/store/mapCoordinates/useMapCoordinates";
import { HomeOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { ItemType, MenuItemType } from "antd/es/menu/interface";
import Link from "next/link";

export const useGetNavItems = () => {
  const { data: districts, isLoading, error } = useGetDistrict();
  const { setCoordinates } = useMapCoordinates();

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
          setCoordinates({ lat: district.lat, long: district.long });
        },
      })),
    },
  ];

  return { navItems, isLoading, error };
};
