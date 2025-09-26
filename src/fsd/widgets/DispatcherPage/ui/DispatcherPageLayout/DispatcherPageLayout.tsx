"use client";
import { PageLayout } from "@/fsd/features/PageLayout/ui/PageLayout";
import { useGetNavItems } from "../../hooks/useGetNavItems";
import { Chat } from "@/fsd/features/Chat";

interface AdminPageLayoutProps {
  children: React.ReactNode;
}

export const DispatcherPageLayout = ({ children }: AdminPageLayoutProps) => {
  const { navItems } = useGetNavItems();
  return (
    <>
      <PageLayout className="h-screen" navItems={navItems}>
        {children}
      </PageLayout>
      <Chat />
    </>
  );
};
