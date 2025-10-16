'use client';

import {Table, Tag} from "antd";
import {IAssignmentStatus, IGetAssignmentsRequestParams} from "@/fsd/shared/network/assignments/types";
import {useGetAssignments} from "@/fsd/widgets/WorkerPage/api/useGetAssignments";
import {useState} from "react";
import {assignmentStatus} from "@/fsd/shared/constants/constants";
import {PresetColorType} from "antd/es/_util/colors";
import {IAccident} from "@/fsd/entities/Accident/types/type";
import {IUser} from "@/fsd/shared/network/users/types";
import {Role} from "@/fsd/entities/AdminPage";
import {TitleWithSelect} from "@/fsd/widgets/DispatcherPage/ui/TitleWithSelect/TitleWithSelect";
import {AssignmentStatus} from "@/fsd/entities/Assignments";

const PAGE_SIZE = 5;

const tagColors: Record<IAssignmentStatus, "success" | "default" | PresetColorType | "processing" | "error" | "warning"> = {
  assigned: 'error',
  progress: 'processing',
  completed: 'success',
}

export const DispatcherAssignmentsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<IAssignmentStatus | null>(null);
  const [showSelectStatus, setShowSelectStatus] = useState(false);

  const params: IGetAssignmentsRequestParams = {
    page: currentPage,
    page_size: PAGE_SIZE
  };

// Генерируем queryKey для react-query
  const queryKey = [
    "getAssignments",
    currentPage
  ];

  const { data, isFetching } = useGetAssignments(queryKey, params);

  const statusTitle = (
    <TitleWithSelect
      value={statusFilter}
      setValue={setStatusFilter}
      showSelect={showSelectStatus}
      setShowSelect={setShowSelectStatus}
      title="Статус"
      options={[
        { value: 'assigned', label: AssignmentStatus.Assigned },
        { value: 'progress', label: AssignmentStatus.Progress },
        { value: 'completed', label: AssignmentStatus.Completed },
      ]}
    />
  );

  const columns = [
    {
      title: 'ID инцидента',
      dataIndex: "accident_id",
      key: "accident_id",
      className: "w-[5rem]",
    },
    {
      title: 'Задача',
      dataIndex: "task",
      key: "task",
      className: "w-[25rem]",
    },
    {
      // title: 'Статус',
      title: statusTitle,
      dataIndex: "status",
      key: "status",
      render: (status: IAssignmentStatus) => <Tag color={tagColors[status]}>{assignmentStatus[status]}</Tag>,
      className: "w-[8rem]",
    },
    {
      title: 'Локация',
      dataIndex: "accident",
      key: "accident",
      render: (accident: IAccident) => accident.location.title,
      className: "w-[10rem]",
    },
    {
      title: 'Дедлайн',
      dataIndex: "date_at",
      key: "date_at",
      className: "w-[5rem]",
    },
    {
      title: 'Работник',
      dataIndex: "user",
      key: "user",
      render: (user: IUser) => user.name,
      className: "w-[10rem]",
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data?.assignments || []}
      rowKey={(record) => record.id}
      loading={isFetching}
      // onChange={handleTableChange}
      pagination={{
        pageSize: PAGE_SIZE,
        total: data?.pagination.count,
        current: currentPage,
        onChange: (page) => setCurrentPage(page),
        showLessItems: true,
        hideOnSinglePage: true
      }}
    />
  )
}