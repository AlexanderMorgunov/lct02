import { DispatcherPageLayout } from "@/fsd/widgets/DispatcherPage/ui/DispatcherPageLayout/DispatcherPageLayout";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return <DispatcherPageLayout>{children}</DispatcherPageLayout>;
}
