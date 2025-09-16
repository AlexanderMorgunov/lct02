"use client";

import { AdminPageLayout, AdminPageUsersList } from "@/fsd/widgets/AdminPage";
import "@ant-design/v5-patch-for-react-19";

export const AdminPage = () => {
  return (
    <AdminPageLayout>
      <AdminPageUsersList />
    </AdminPageLayout>
  );
};

export default AdminPage;
