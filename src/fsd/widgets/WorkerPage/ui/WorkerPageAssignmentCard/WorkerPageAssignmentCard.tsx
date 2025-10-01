'use client';

import { IAssignmentStatus, IUpdateAssignmentRequestBody } from "@/fsd/shared/network/assignments/types";
import { Button, Card, Divider, Tag } from 'antd';
import { assignmentStatus } from "@/fsd/shared/constants/constants";
import { PresetColorType } from "antd/es/_util/colors";
import Link from "next/link";
import { useState } from "react";
import { WorkerModal } from "@/fsd/widgets/WorkerPage/ui/WorkerModal/WorkerModal";
import { useUpdateAssignment } from "@/fsd/widgets/WorkerPage/api/useUpdateAssignment";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  task: string;
  status: IAssignmentStatus;
  deadline: string;
  comment: string;
  taskId: number;
  titleLocation: string;
  loading?: boolean;
}

const tagColors: Record<IAssignmentStatus, "success" | "default" | PresetColorType | "processing" | "error" | "warning"> = {
  assigned: 'error',
  progress: 'processing',
  completed: 'success',
}

const btnText: Record<IAssignmentStatus, string> = {
  assigned: 'Взять в работу',
  progress: 'Завершить задачу',
  completed: 'Задача завершена',
}

export const WorkerPageAssignmentCard = (props: Props) => {
  const { task, status, deadline, taskId, loading = false, titleLocation } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const { mutate: updateAssignment } = useUpdateAssignment();

  const handleBtnClick = () => {
    if (status === 'completed') {
      return;
    }
    setIsModalOpen(true);
  }

  const handleUpdateAssignment = (body: IUpdateAssignmentRequestBody) => {
    updateAssignment({id: taskId, body}, {
      onSuccess: async() => {
        await queryClient.invalidateQueries({ queryKey: ["getAssignments"] });
      }
    })
    setIsModalOpen(false);
  }

  return (
    <>
      <Card
        loading={loading}
        title={`Задача №${taskId}`}
        variant={"borderless"}
        styles={{
          body: {
            paddingLeft: 0,
            paddingRight: 0,
            display: "grid",
            gridTemplateRows: 'subgrid',
            gridRow: 'span 8',
          },
        }}
        className={'grid grid-rows-subgrid row-span-9 gap-0'}
        rootClassName={'bg-amber-400'}
      >
        <div className={'grid grid-rows-subgrid row-span-5 gap-y-3 px-6'}>
          <div>
            <p><span className={'font-bold text-base'}>Задача:</span> {task}</p>
          </div>
          <div>
            <p><span className={'font-bold text-base'}>Статус:</span> <Tag className={'!ml-2'} color={tagColors[status]}>{assignmentStatus[status]}</Tag></p>
          </div>
          <div>
            <p><span className={'font-bold text-base'}>Дедлайн:</span> {deadline}</p>
          </div>
          <div>
            <p><span className={'font-bold text-base'}>Локация:</span> {titleLocation}</p>
          </div>
          <div>
            <Link href={'#'} >
              На карту
            </Link>
          </div>
        </div>

        <Divider/>
        <div className={'flex justify-end px-6'}>
          <Button
            onClick={handleBtnClick}
            disabled={status === 'completed'}
            type={status === 'assigned' ? 'default' : 'primary'}
          >
            {btnText[status]}
          </Button>
        </div>
      </Card>
      <WorkerModal
        taskId={taskId}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        status={status}
        onSubmit={(b) => handleUpdateAssignment(b)} />
    </>
  );
}