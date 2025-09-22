import { useQuery } from "@tanstack/react-query";
import { IRegion } from "@/fsd/entities/Regions";
import { $api } from "@/fsd/shared/network/api";


export const useGetRegions = () => {
  return useQuery<IRegion[] | null>({
    queryKey: ["getRegions"],
    queryFn: async () => {
      return await $api.regions.RegionsEndPoint.getRegions();
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
}