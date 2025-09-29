import { ReactNode } from "react";
import { WorkerPageLayout } from "@/fsd/widgets/WorkerPage";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return <WorkerPageLayout>{children}</WorkerPageLayout>;
}