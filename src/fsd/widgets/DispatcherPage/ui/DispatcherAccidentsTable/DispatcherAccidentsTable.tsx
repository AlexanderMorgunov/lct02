"use client";

import { App, Button, message, Space, Table, Tag, Tooltip } from "antd";
import type { TableProps } from "antd";
import { useState } from "react";
import dayjs from "dayjs";
import { CloseModal } from "../CloseModal/CloseModal";
import { IAccident } from "@/fsd/entities/Accident/types/type";
import { InfoCircleOutlined } from "@ant-design/icons";
import { AssignTaskModal } from "../AssignTaskModal/AssignTaskModal";
import { useForm } from "antd/lib/form/Form";
import { useCreateAssignment } from "@/fsd/entities/Assignments/api/useCreateAssignment";
import { ICreateAssignmentRequestBody } from "@/fsd/shared/network/assignments/types";
import { useQueryClient } from "@tanstack/react-query";
import { useChangeAccidentStatus } from "@/fsd/entities/Accident/api/useChangeAccidentStatus";
import { IndicationsModal } from "../IndicationsModal/IndicationsModal";

const PAGE_SIZE = 5;

interface IProps {
  accidents: IAccident[];
}

export const DispatcherAccidentsTable = ({ accidents }: IProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [openCloseModal, setOpenCloseModal] = useState(false);
  const [openAssignModal, setOpenAssignModal] = useState(false);
  const [openIndicationsModal, setOpenIndicationsModal] = useState(false);
  const [activeAccident, setActiveAccident] = useState<IAccident | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form] = useForm();
  const { mutate: createAssignment } = useCreateAssignment();
  const { message } = App.useApp();
  const queryClient = useQueryClient();
  const { mutate: changeAccidentStatus } = useChangeAccidentStatus();

  const handleCloseAccident = (accident: IAccident) => {
    setDeleteId(accident.id);
    setOpenCloseModal(true);
  };

  const handleOpenAssignModal = (accident: IAccident) => {
    setOpenAssignModal(true);
    setActiveAccident(accident);
  };

  const handleOpenIndicationsModal = (accident: IAccident) => {
    setOpenIndicationsModal(true);
    setActiveAccident(accident);
  };

  const onConfirmCloseModal = (props: { id: number; status: boolean }) => {
    setOpenCloseModal(false);
    changeAccidentStatus(props);
  };

  const onConfirmAssign = (values: ICreateAssignmentRequestBody) => {
    try {
      form.validateFields();
      createAssignment(values, {
        onSuccess: async () => {
          message.success("Задача назначена");
          queryClient.invalidateQueries({ queryKey: ["accidents"] });
        },
        onError: (error) => {
          console.log(error);
          message.error("Ошибка назначения задачи");
        },
      });
    } catch (error) {
      console.log("Ошибка валидации формы", error);
    } finally {
      setOpenAssignModal(false);
    }
  };

  const columns: TableProps<IAccident>["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
      width: 80,
    },
    {
      title: "Название аварии",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Создана",
      dataIndex: "created_at",
      key: "created_at",
      sorter: (a, b) =>
        dayjs(a.created_at).valueOf() - dayjs(b.created_at).valueOf(),
      render: (v: string) => dayjs(v).format("DD.MM.YYYY HH:mm"),
    },
    {
      title: "Действия",
      key: "actions",
      width: 460,
      render: (_, record) => (
        <Space>
          <Button size="small" onClick={() => handleOpenAssignModal(record)}>
            Назначить
          </Button>
          <Button
            size="small"
            type="primary"
            danger
            onClick={() => handleCloseAccident(record)}
          >
            Закрыть
          </Button>
          <Tooltip key="info" title="Показания приборов при аварии">
            <Button
              size="small"
              onClick={() => handleOpenIndicationsModal(record)}
            >
              <InfoCircleOutlined className="text-xl" />
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={accidents}
        rowKey={(record) => record.id}
        pagination={{
          pageSize: PAGE_SIZE,
          current: currentPage,
          total: accidents.length,
          onChange: (page) => setCurrentPage(page),
          showLessItems: true,
        }}
        className="bg-primary-bg text-primary-text"
      />
      {openCloseModal && (
        <CloseModal
          open={openCloseModal}
          onClose={() => setOpenCloseModal(false)}
          onConfirm={onConfirmCloseModal}
          id={deleteId}
        />
      )}
      {openAssignModal && activeAccident && (
        <AssignTaskModal
          open={openAssignModal}
          onClose={() => setOpenAssignModal(false)}
          onConfirm={onConfirmAssign}
          accident={activeAccident}
          form={form}
        />
      )}
      {openIndicationsModal && activeAccident && (
        <IndicationsModal
          indications={activeAccident.indication}
          open={openIndicationsModal}
          onClose={() => {
            setOpenIndicationsModal(false);
            setActiveAccident(null);
          }}
        />
      )}
    </>
  );
};
