"use client";

import { AdminPageLayout } from "@/fsd/widgets/AdminPage/AdminPageLayout/AdminPageLayout";
import { UserList } from "@/fsd/widgets/AdminPage/AdminPageUsersList/AdminPageUsersList";

export const AdminPage = () => {
  return (
    <AdminPageLayout>
      <UserList />
    </AdminPageLayout>
  );
};

export default AdminPage;
