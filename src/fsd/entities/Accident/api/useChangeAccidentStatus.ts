import {
  IChangeAccidentStatusRequest,
  IChangeAccidentStatusResponse,
} from "@/fsd/shared/network/accidents/type";
import { $api } from "@/fsd/shared/network/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useChangeAccidentStatus = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IChangeAccidentStatusResponse | null,
    Error,
    IChangeAccidentStatusRequest
  >({
    mutationFn: ({ id, status }: { id: number; status: boolean }) =>
      $api.accidents.AccidentsEndPoint.changeAccidentStatus({ id, status }),
    retry: false,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAccidents"] });
    },
  });
};
