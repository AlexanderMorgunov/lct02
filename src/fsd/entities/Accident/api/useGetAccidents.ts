import { $api } from "@/fsd/shared/network/api";
import { IAccident } from "../types/type";
import { IGetAccidentsRequest } from "@/fsd/shared/network/accidents/type";
import { useQuery } from "@tanstack/react-query";

export const useGetAccidents = (props: IGetAccidentsRequest) => {
  return useQuery<IAccident[] | null>({
    queryKey: ["getAccidents", props],
    queryFn: async () => {
      const accidents = await $api.accidents.AccidentsEndPoint.getAccidents(
        props
      );
      return accidents || null;
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};
