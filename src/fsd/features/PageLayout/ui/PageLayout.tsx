"use client";
import { Layout, Switch, Menu, Tooltip } from "antd";
import { Theme } from "@/fsd/shared/config/theme/theme";
import { IconLogo } from "@/fsd/shared/ui/IconLogo";
import { useThemeStore } from "@/fsd/shared/store/theme/useThemeStore";
import "@ant-design/v5-patch-for-react-19";
import { ItemType, MenuItemType } from "antd/es/menu/interface";
import { AvatarMenu } from "@/fsd/features/PageLayout/ui/AvatarMenu";
import { useState } from "react";
import { IconHelp } from "@/fsd/shared/ui/IconHelp";
import Link from "next/link";
import { cn } from "@/fsd/shared/utils/cn/cn";
import { useCurrentUser } from "@/fsd/entities/Auth/api/useCurrentUser";

const { Header, Sider, Content } = Layout;

interface PageLayoutProps {
  children: React.ReactNode;
  navItems?: ItemType<MenuItemType>[];
  navChildren?: React.ReactNode;
  className?: string;
  NotificationMenu?: React.ReactNode;
  helpPageLink?: string;
  defaultSelectedKeys?: string[];
}

export const PageLayout = ({
  children,
  navItems,
  navChildren,
  className,
  NotificationMenu,
  helpPageLink,
  defaultSelectedKeys
}: PageLayoutProps) => {
  const { theme, toggleTheme } = useThemeStore();
  const defaultKey = ["Округа"];
  const [openKeys, setOpenKeys] = useState<string[]>(defaultKey);
  const [collapsed, setCollapsed] = useState(false);
  const { data: user } = useCurrentUser();

  return (
    <Layout className={cn("h-screen", className)}>
      {/* Sidebar слева */}
      <Sider
        width={200}
        collapsible
        theme={theme}
        className="pt-12"
        onCollapse={(value) => {
          setCollapsed(value);
          const newVal = value ? [] : defaultKey;
          setOpenKeys(newVal);
        }}
      >
        {navItems && navItems.length > 0 ? (
          <Menu
            mode="inline"
            theme={theme}
            defaultSelectedKeys={defaultSelectedKeys ?? [navItems[0]?.key as string]}
            items={navItems}
            openKeys={openKeys}
            expandIcon={null}
          />
        ) : null}
        {navChildren && navChildren}
        {helpPageLink && (
          <div className="absolute bottom-25 right-0 w-full">
            <Tooltip
              key="help"
              title={collapsed ? "Помощь" : null}
              placement={"rightTop"}
            >
              <Link
                href={helpPageLink}
                className="w-full flex items-center justify-center gap-2"
              >
                <IconHelp className="w-5 h-5  !text-danger" />
                {!collapsed && (
                  <p className="text-sm font-medium text-primary-text">
                    Помощь
                  </p>
                )}
              </Link>
            </Tooltip>
          </div>
        )}
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
            {NotificationMenu && NotificationMenu}

            <span className="flex items-center gap-2">
              <AvatarMenu />
              {user?.name}
            </span>

            <Switch
              checkedChildren="🌙"
              unCheckedChildren="☀️"
              checked={theme === Theme.DARK}
              onChange={toggleTheme}
            />
          </div>
        </Header>

        {/* Content */}
        <Content className="p-5 overflow-y-auto">{children}</Content>
      </Layout>
    </Layout>
  );
};
