"use client";
import { PageLayout } from "@/fsd/features/PageLayout/ui/PageLayout";
import { navItems } from "../../model/navItems";

interface AdminPageLayoutProps {
  children: React.ReactNode;
}

export const DispatcherPageLayout = ({ children }: AdminPageLayoutProps) => {
  return <PageLayout navItems={navItems}>{children}</PageLayout>;
};
