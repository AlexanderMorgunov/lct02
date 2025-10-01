import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { $api } from "@/fsd/shared/network/api";
import {IAssignment, IUpdateAssignmentRequestBody} from "@/fsd/shared/network/assignments/types";


type UpdateAssignmentArgs = {
  id: number;
  body: IUpdateAssignmentRequestBody;
};

export const useUpdateAssignment = () => {
  return useMutation<IAssignment | null, AxiosError<unknown>, UpdateAssignmentArgs>({
    mutationFn: async ({ id, body }) => $api.assignments.AssignmentsEndPoint.updateAssignment(id, body)
  });
};