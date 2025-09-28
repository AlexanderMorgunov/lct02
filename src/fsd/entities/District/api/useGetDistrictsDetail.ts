import { useQuery } from "@tanstack/react-query";
import { IDistrictDetail } from "../types/type";
import { $api } from "@/fsd/shared/network/api";

export const useGetDistrictsDetail = (id: number | null) => {
  const { data, isLoading, error } = useQuery<IDistrictDetail | null>({
    queryKey: ["getDistrictsDetail", id],
    queryFn: async () => {
      if (!id) return null;
      const districts =
        await $api.districts.DistrictsEndPoint.getDistrictDetail(id);
      return districts;
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  return {
    data,
    isLoading,
    error,
  };
};
