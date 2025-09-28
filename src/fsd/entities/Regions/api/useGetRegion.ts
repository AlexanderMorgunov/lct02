import { useQuery } from "@tanstack/react-query";
import { IRegionDetail } from "../types/type";
import { $api } from "@/fsd/shared/network/api";

export const useGetRegion = (id: number | null, key?: string) => {
  return useQuery<IRegionDetail | null>({
    queryKey: ["getRegion", id, ...(key || "")],
    queryFn: async () => {
      if (!id) return null;
      return await $api.regions.RegionsEndPoint.getRegion(id);
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};
