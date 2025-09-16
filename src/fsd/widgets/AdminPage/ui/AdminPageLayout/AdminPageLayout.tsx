import { PageLayout } from "@/fsd/features/PageLayout/ui/PageLayout";
import { HomeOutlined, SettingOutlined } from "@ant-design/icons";

interface AdminPageLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  {
    title: "На домашнюю",
    href: "/admin",
    icon: <HomeOutlined />,
  },
  {
    title: "Настройки",
    href: "/admin/settings",
    icon: <SettingOutlined />,
  },
];

export const AdminPageLayout = ({ children }: AdminPageLayoutProps) => {
  return <PageLayout navItems={navItems}>{children}</PageLayout>;
};
