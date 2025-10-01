import { useMutation } from "@tanstack/react-query";
import {
  ICreateAssignmentRequestBody,
  IAssignment,
} from "@/fsd/shared/network/assignments/types";
import AssignmentsEndPoint from "@/fsd/shared/network/assignments/AssignmentsEndPoint/AssignmentsEndPoint";

export const useCreateAssignment = () => {
  return useMutation<IAssignment | null, Error, ICreateAssignmentRequestBody>({
    mutationFn: (body) => AssignmentsEndPoint.createNewAssignment(body),
  });
};
