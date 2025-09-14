import { Layout, Avatar, Badge, Switch, Menu } from "antd";
import { BellOutlined, UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Theme } from "@/fsd/shared/config/theme/theme";
import { IconLogo } from "@/fsd/shared/ui/IconLogo";
import { useThemeStore } from "@/fsd/shared/store/theme/useThemeStore";
import { NavItem } from "../model/types";

const { Header, Sider, Content } = Layout;

interface PageLayoutProps {
  children: React.ReactNode;
  navItems: NavItem[];
}

export const PageLayout = ({ children, navItems }: PageLayoutProps) => {
  const { theme, toggleTheme } = useThemeStore();
  return (
    <Layout className="h-screen">
      {/* Sidebar слева */}
      <Sider width={200} collapsible theme={theme}>
        <Menu
          mode="inline"
          theme={theme}
          defaultSelectedKeys={[navItems[0].title]}
          items={navItems.map(({ title, href, icon }) => ({
            key: title,
            icon,
            label: <Link href={href}>{title}</Link>,
          }))}
        />
      </Sider>

      <Layout>
        <Header className="flex items-center justify-between px-5 text-card-foreground border-b border-border !bg-primary-bg">
          {/* Логотип */}
          <div className="flex flex-row items-center gap-4 text-2xl font-bold text-primary-text">
            <IconLogo className="w-8 h-8" /> МосТруба
          </div>

          {/* Правая часть */}
          <div className="flex items-center gap-5">
            <Badge count={5}>
              <BellOutlined className="text-2xl cursor-pointer !text-primary-text" />
            </Badge>

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
