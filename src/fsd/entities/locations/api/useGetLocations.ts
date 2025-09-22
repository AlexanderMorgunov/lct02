import { useQuery } from "@tanstack/react-query";
import { ILocation } from "../types/type";
import { $api } from "@/fsd/shared/network/api";
import { IGetLocationsRequest } from "@/fsd/shared/network/locations/LocationsEndPoint/type";

export const useGetLocations = (props: IGetLocationsRequest = {}) => {
  const { data, isLoading, error } = useQuery<ILocation[] | null>({
    queryKey: ["getLocations"],
    queryFn: async () => {
      const regions = await $api.locations.getObjects(props);
      return regions;
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
