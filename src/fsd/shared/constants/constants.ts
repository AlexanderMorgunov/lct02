import { IAssignmentStatus } from "@/fsd/shared/network/assignments/types";

export const assignmentStatus: Record<IAssignmentStatus, string> = {
  assigned: 'Назначено',
  progress: 'В Работе',
  completed: 'Завершено',
}