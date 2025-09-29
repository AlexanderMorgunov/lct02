"use client";

import { useGetAssignments } from "@/fsd/widgets/WorkerPage/api/useGetAssignments";
import { useCurrentUser } from "@/fsd/entities/Auth/api/useCurrentUser";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { IGetAssignmentsRequestParams } from "@/fsd/shared/network/assignments/types";
import { Spin } from "antd";
import {WorkerPageAssignmentCard} from "@/fsd/widgets/WorkerPage/ui/WorkerPageAssignmentCard/WorkerPageAssignmentCard";

const PAGE_SIZE = 2;

export const WorkerPageTodoList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: currentUser } = useCurrentUser();

  const params: IGetAssignmentsRequestParams = {
    page: currentPage,
    page_size: PAGE_SIZE,
    ...(currentUser ? {user_id: currentUser.id} : {}),
  };

// Генерируем queryKey для react-query
  const queryKey = [
    "getAssignments",
    currentPage,
    ...(currentUser ? [currentUser.id] : []),
  ];

  const queryClient = useQueryClient();

  const { data, isLoading } = useGetAssignments(queryKey, params);

  if (isLoading) {
    return <Spin size="large" fullscreen />
  }

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Задачи</h2>
      {/*<div className="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-4">*/}
      <div
        className="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-4"
      >
        {data ? (data.assignments.map((assignment) => (
          <WorkerPageAssignmentCard
            key={assignment.id}
            task={assignment.task}
            status={assignment.status}
            deadline={assignment.date_at}
            comment={assignment.comment}
            taskId={assignment.id}
          />))) : (<p>Невозможно загрузить задания</p>)}
      </div>
    </>

  )
}