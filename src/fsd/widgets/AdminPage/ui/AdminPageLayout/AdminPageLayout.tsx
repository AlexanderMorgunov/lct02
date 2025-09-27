import { PageLayout } from "@/fsd/features/PageLayout/ui/PageLayout";
import { ROUTES } from "@/fsd/shared/config/routes";
import { HomeOutlined } from "@ant-design/icons";
import { ItemType, MenuItemType } from "antd/es/menu/interface";
import Link from "next/link";

interface AdminPageLayoutProps {
  children: React.ReactNode;
}

const navItems: ItemType<MenuItemType>[] = [
  {
    key: "На домашнюю",
    label: <Link href={ROUTES.ADMIN}>На домашнюю</Link>,
    icon: <HomeOutlined />,
  },
];

export const AdminPageLayout = ({ children }: AdminPageLayoutProps) => {
  return (
    <PageLayout navItems={navItems} helpPageLink={ROUTES.ADMIN_HELP}>
      {children}
    </PageLayout>
  );
};
