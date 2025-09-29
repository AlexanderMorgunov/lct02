"use client";
import { PageLayout } from "@/fsd/features/PageLayout/ui/PageLayout";
import { useGetNavItems } from "../../hooks/useGetNavItems";
import { Chat } from "@/fsd/features/Chat";
import { NotificationMenu } from "@/fsd/features/PageLayout/ui/NotificationMenu";
import { ROUTES } from "@/fsd/shared/config/routes";

interface AdminPageLayoutProps {
  children: React.ReactNode;
}

export const DispatcherPageLayout = ({ children }: AdminPageLayoutProps) => {
  const { navItems, districtsMenu } = useGetNavItems();
  return (
    <>
      <PageLayout
        className="h-screen"
        navItems={navItems}
        NotificationMenu={<NotificationMenu />}
        helpPageLink={ROUTES.DISPATCHER_HELP}
        navChildren={districtsMenu}
      >
        {children}
      </PageLayout>
      <Chat />
    </>
  );
};
