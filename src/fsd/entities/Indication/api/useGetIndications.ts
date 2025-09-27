import { $api } from "@/fsd/shared/network/api";
import { useQuery } from "@tanstack/react-query";
import { IIndication } from "../types/type";

interface IGetIndicationsRequest {
  location_id: string;
  date_at?: string;
  date_end?: string;
  time_of_day?: string;
}

export const useGetIndications = (props: IGetIndicationsRequest) => {
  const { data, isLoading, error } = useQuery<IIndication[] | null>({
    queryKey: ["getIndications", props.location_id],
    queryFn: async () => {
      const indications =
        await $api.indications.IndicationsEndPoint.getIndications({ ...props });
      return indications;
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
