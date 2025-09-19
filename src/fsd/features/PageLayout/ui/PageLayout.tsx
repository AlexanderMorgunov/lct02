"use client";
import { Layout, Avatar, Switch, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Theme } from "@/fsd/shared/config/theme/theme";
import { IconLogo } from "@/fsd/shared/ui/IconLogo";
import { useThemeStore } from "@/fsd/shared/store/theme/useThemeStore";
import { NotificationMenu } from "./NotificationMenu";
import "@ant-design/v5-patch-for-react-19";
import { ItemType, MenuItemType } from "antd/es/menu/interface";

const { Header, Sider, Content } = Layout;

interface PageLayoutProps {
  children: React.ReactNode;
  // navItems?: NavItem[];
  navItems?: ItemType<MenuItemType>[];
  navChildren?: React.ReactNode;
}

export const PageLayout = ({
  children,
  navItems,
  navChildren,
}: PageLayoutProps) => {
  const { theme, toggleTheme } = useThemeStore();
  return (
    <Layout className="h-screen">
      {/* Sidebar слева */}
      <Sider width={200} collapsible theme={theme} className="pt-12">
        {navChildren ? (
          navChildren
        ) : navItems && navItems.length > 0 ? (
          <Menu
            mode="inline"
            theme={theme}
            defaultSelectedKeys={[navItems[0]?.key as string]}
            items={navItems}
          />
        ) : null}
      </Sider>

      <Layout>
        <Header className="flex items-center justify-between px-5 text-card-foreground border-b border-border !bg-primary-bg">
          {/* Логотип */}
          <div className="flex flex-row items-center gap-4 text-2xl font-bold text-primary-text">
            <IconLogo className="w-8 h-8" /> МосТруба
            <p className="text-sm font-medium">
              - поток безопасности водоснабжения
            </p>
          </div>

          {/* Правая часть */}
          <div className="flex items-center gap-5">
            <NotificationMenu />

            <Avatar icon={<UserOutlined />} />

            <Switch
              checkedChildren="🌙"
              unCheckedChildren="☀️"
              checked={theme === Theme.DARK}
              onChange={toggleTheme}
            />
          </div>
        </Header>

        {/* Content */}
        <Content className="p-5">{children}</Content>
      </Layout>
    </Layout>
  );
};
