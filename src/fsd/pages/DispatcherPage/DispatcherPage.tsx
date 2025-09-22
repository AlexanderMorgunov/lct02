'use client';

import { DispatcherMap } from "@/fsd/widgets/DispatcherPage/ui/DispatcherMap/DispatcherMap";
import { useGetRegions } from "@/fsd/entities/Regions";
import { Spin } from "antd";

export const DispatcherPage = () => {
  const { data, isLoading } = useGetRegions();

  if (isLoading) return <Spin size="large" fullscreen />;

  return data && !isLoading ? <DispatcherMap regions={data ?? []} /> : null;
};
