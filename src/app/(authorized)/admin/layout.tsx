import { AdminPageLayout } from "@/fsd/widgets/AdminPage";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return <AdminPageLayout>{children}</AdminPageLayout>;
}
