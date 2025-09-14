import { Layout, Avatar, Badge, Switch, Menu } from "antd";
import {
  BellOutlined,
  HomeOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { Theme } from "@/fsd/shared/config/theme/theme";
import { IconLogo } from "@/fsd/shared/ui/IconLogo";

const { Header, Sider, Content } = Layout;

interface AdminPageLayoutProps {
  children: React.ReactNode;
  theme: Theme;
  toggleTheme: () => void;
}

export const AdminPageLayout = ({
  children,
  theme,
  toggleTheme,
}: AdminPageLayoutProps) => {
  return (
    <Layout className="h-screen">
      {/* Sidebar слева */}
      <Sider width={200} collapsible theme={theme}>
        <Menu
          mode="inline"
          theme={theme}
          defaultSelectedKeys={["home"]}
          items={[
            {
              key: "home",
              icon: <HomeOutlined />,
              label: <Link href="/admin">Home</Link>,
            },
            {
              key: "settings",
              icon: <SettingOutlined />,
              label: <Link href="/admin/settings">Settings</Link>,
            },
          ]}
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
