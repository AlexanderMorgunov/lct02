import { useQuery } from "@tanstack/react-query";
import { $api } from "@/fsd/shared/network/api";
import type { IGetAssignments, IGetAssignmentsRequestParams } from "@/fsd/shared/network/assignments/types";


export const useGetAssignments = (qKeys: unknown[], params?: IGetAssignmentsRequestParams) => {
  return useQuery<IGetAssignments | null>({
    queryKey: qKeys,
    queryFn: async () => {
      return await $api.assignments.AssignmentsEndPoint.getAssignments(params);
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}