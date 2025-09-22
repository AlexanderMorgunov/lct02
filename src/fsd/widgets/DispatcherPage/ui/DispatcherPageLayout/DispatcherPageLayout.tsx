"use client";
import { PageLayout } from "@/fsd/features/PageLayout/ui/PageLayout";
import { useGetNavItems } from "../../hooks/useGetNavItems";
// import { navItems } from "../../model/navItems";

interface AdminPageLayoutProps {
  children: React.ReactNode;
}

export const DispatcherPageLayout = ({ children }: AdminPageLayoutProps) => {
  const { navItems } = useGetNavItems();
  return <PageLayout navItems={navItems}>{children}</PageLayout>;
};
