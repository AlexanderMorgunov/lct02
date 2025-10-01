import { useQuery } from "@tanstack/react-query";
import { ILocation } from "../types/type";
import { $api } from "@/fsd/shared/network/api";

export const useGetLocation = (id: number) => {
  return useQuery<ILocation | null>({
    queryKey: ["getLocation", id],
    queryFn: async () => {
      const region = await $api.locations.getObject(id);
      return region;
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};
