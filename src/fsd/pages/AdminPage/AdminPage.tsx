"use client";

import { useThemeStore } from "@/fsd/shared/store/theme/useThemeStore";
import { AdminPageLayout } from "@/fsd/widgets/AdminPage/AdminPageLayout/AdminPageLayout";

export const AdminPage = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <AdminPageLayout theme={theme} toggleTheme={toggleTheme}>
      Content
    </AdminPageLayout>
  );
};

export default AdminPage;
