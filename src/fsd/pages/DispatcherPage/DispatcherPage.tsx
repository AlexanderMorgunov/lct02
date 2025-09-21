'use client';

import { $api } from "@/fsd/shared/network/api";
import { DispatcherMap } from "@/fsd/widgets/DispatcherPage/ui/DispatcherMap/DispatcherMap";
import { IRegion } from "@/fsd/entities/Regions";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";

export const DispatcherPage = () => {
  const { data, isLoading } = useQuery<IRegion[] | null>({
    queryKey: ["getRegions"],
    queryFn: async () => {
      const regions = await $api.regions.RegionsEndPoint.getRegions();
      return regions;
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) return <Spin size="large" />;

  return data && !isLoading ? <DispatcherMap regions={data ?? []} /> : null;
};
