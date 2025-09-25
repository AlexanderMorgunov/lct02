import { useQuery } from "@tanstack/react-query";
import { IDistrict } from "../types/type";
import { $api } from "@/fsd/shared/network/api";

export const useGetDistrict = () => {
  const { data, isLoading, error } = useQuery<IDistrict[] | null>({
    queryKey: ["getDistricts"],
    queryFn: async () => {
      const districts = $api.districts.DistrictsEndPoint.getDistricts({});
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
