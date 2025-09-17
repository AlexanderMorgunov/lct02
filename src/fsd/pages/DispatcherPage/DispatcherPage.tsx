import { $api } from "@/fsd/shared/network/api";
import { DispatcherMap } from "@/fsd/widgets/DispatcherPage/ui/DispatcherMap/DispatcherMap";
import React from "react";

export const DispatcherPage = async () => {
  const data = await $api.regions.RegionsEndPoint.getRegions();

  return <DispatcherMap regions={data ?? []} />;
};
