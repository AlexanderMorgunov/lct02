"use client";

import { useGetAssignments } from "@/fsd/widgets/WorkerPage/api/useGetAssignments";
import { useCurrentUser } from "@/fsd/entities/Auth/api/useCurrentUser";
import { useState } from "react";
import { IAssignmentStatus, IGetAssignmentsRequestParams } from "@/fsd/shared/network/assignments/types";
import { Card, Pagination, Select } from "antd";
import { WorkerPageAssignmentCard } from "@/fsd/widgets/WorkerPage/ui/WorkerPageAssignmentCard/WorkerPageAssignmentCard";

const PAGE_SIZE = 5;

const mockData = new Array(PAGE_SIZE).fill(0).map((_, i) => i + 1);

interface StatusOption {
  label: string;
  value: IAssignmentStatus;
}

const statusOptions: StatusOption[] = [
  { label: "Назначено", value: 'assigned' },
  { label: "В работе", value: 'progress' },
  { label: "Завершено", value: 'completed' },
];

export const WorkerPageTodoList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState<IAssignmentStatus | undefined>(undefined);

  const { data: currentUser } = useCurrentUser();

  const params: IGetAssignmentsRequestParams = {
    page: currentPage,
    page_size: PAGE_SIZE,
    ...(currentUser ? {user_id: currentUser.id} : {}),
    ...(status ? {status} : {}),
  };

// Генерируем queryKey для react-query
  const queryKey = [
    "getAssignments",
    currentPage,
    ...(currentUser ? [currentUser.id] : []),
    ...(status ? [status] : []),
  ];

  const { data, isFetching } = useGetAssignments(queryKey, params);

  const handleChangeStatus = (value: IAssignmentStatus | undefined) => {
    setStatus(value);
    setCurrentPage(1);
  }

  return (
    <>
      <h2 className="text-2xl font-bold mb-10">Задачи</h2>

      {!isFetching && data && data.assignments.length > 0 && (
        <Select
          value={status}
          onChange={handleChangeStatus}
          allowClear
          options={statusOptions}
          placeholder="Выберите статус"
          className="w-[161px]"
        />
      )}

      <div className="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-4 min-h-[350px] mt-6">
        {!data && isFetching && (
          mockData.map((assignment, i) => (
            <Card key={i} loading={isFetching} />
          )
        ))}
        {!data && !isFetching && <p>Невозможно загрузить задания</p>}
        {data && (data.assignments.map((assignment) => (
          <WorkerPageAssignmentCard
            key={assignment.id}
            task={assignment.task}
            status={assignment.status}
            deadline={assignment.date_at}
            comment={assignment.comment}
            taskId={assignment.id}
            loading={isFetching}
            titleLocation={assignment.accident.location.title}
            locationId={assignment.accident.location.id}
          />)))}
        {data && data.assignments.length === 0 && <p>Нет заданий</p>}
      </div>
      <Pagination
        hideOnSinglePage
        className="!mt-4"
        pageSize={PAGE_SIZE}
        total={data?.pagination.count}
        current={currentPage}
        onChange={(page) => setCurrentPage(page)}
      />
    </>

  )
}