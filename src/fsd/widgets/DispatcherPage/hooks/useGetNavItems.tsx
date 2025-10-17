import { useGetDistrict } from "@/fsd/entities/District/api/useGetDistrict";
import { ROUTES } from "@/fsd/shared/config/routes";
import { useActiveDistrict } from "@/fsd/shared/store/mapCoordinates/useActiveDistrict";
import { useThemeStore } from "@/fsd/shared/store/theme/useThemeStore";
import { HomeOutlined, EnvironmentOutlined, PushpinOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { ItemType, MenuItemType } from "antd/es/menu/interface";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

export const useGetNavItems = () => {
  const { data: districts, isLoading, error } = useGetDistrict();
  const { setActiveDistrict, activeDistrict } = useActiveDistrict();
  const pathname = usePathname();
  const router = useRouter();
  const { theme } = useThemeStore();

  useEffect(() => {
    if (!districts?.length) return;
    setActiveDistrict(districts?.[0]);
  }, [districts, setActiveDistrict]);

  const selectedKeys = activeDistrict ? [`okrug-${activeDistrict.id}`] : [];

  const navItems: ItemType<MenuItemType>[] = [
    {
      key: ROUTES.DISPATCHER,
      icon: <HomeOutlined />,
      label: <Link href={ROUTES.DISPATCHER}>Домашняя</Link>,
    },
    {
      key: ROUTES.DISPATCHER_ASSIGNMENTS,
      icon: <PushpinOutlined />,
      label: <Link href={ROUTES.DISPATCHER_ASSIGNMENTS}>Задачи</Link>,
    },
  ];

  const districtsMenu = useMemo(
    () => (
      <div className="flex flex-col pl-2 mt-10">
        <Menu
          mode="inline"
          theme={theme}
          selectedKeys={selectedKeys}
          defaultOpenKeys={["Округа"]}
          items={[
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
                  if (pathname !== ROUTES.DISPATCHER) {
                    router.push(ROUTES.DISPATCHER);
                  }
                },
              })),
            },
          ]}
        />
      </div>
    ),
    [districts, selectedKeys, pathname, theme]
  );

  return { navItems, isLoading, error, districtsMenu };
};
