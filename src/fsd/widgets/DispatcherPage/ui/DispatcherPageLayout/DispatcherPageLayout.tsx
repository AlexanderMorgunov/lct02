import { PageLayout } from "@/fsd/features/PageLayout/ui/PageLayout";
import { ROUTES } from "@/fsd/shared/config/routes";
import { HomeOutlined, SettingOutlined } from "@ant-design/icons";

interface AdminPageLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  {
    title: "На домашнюю",
    href: ROUTES.DISPATCHER,
    icon: <HomeOutlined />,
  },
  {
    title: "Настройки",
    href: ROUTES.DISPATCHER_SETTINGS,
    icon: <SettingOutlined />,
  },
];

export const DispatcherPageLayout = ({ children }: AdminPageLayoutProps) => {
  return <PageLayout navItems={navItems}>{children}</PageLayout>;
};
