import { $api } from "@/fsd/shared/network/api";
import {
  IAccidentWithPagination,
  IGetAccidentsRequest,
} from "@/fsd/shared/network/accidents/type";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetAccidents = (props: IGetAccidentsRequest) => {
  return useQuery<IAccidentWithPagination | null>({
    queryKey: [
      "getAccidents",
      props.location_id,
      props.is_task,
      props.status,
      props.page,
      props.page_size,
    ],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const accidents = await $api.accidents.AccidentsEndPoint.getAccidents(
        props
      );
      return accidents;
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};
