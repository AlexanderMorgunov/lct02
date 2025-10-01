"use client";

import "@ant-design/v5-patch-for-react-19";
import { Modal, Form, Input } from "antd";
import { useState } from "react";
import { IAssignmentStatus, IUpdateAssignmentRequestBody } from "@/fsd/shared/network/assignments/types";

interface WorkerModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: IUpdateAssignmentRequestBody) => void;
  status: IAssignmentStatus;
  taskId: number;
}



export const WorkerModal = (props: WorkerModalProps) => {
  const { open, onClose, onSubmit, status, taskId } = props;
  const [form] = Form.useForm<Pick<IUpdateAssignmentRequestBody, 'comment'>>();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    try {
      if (status === 'assigned') {
        const body: IUpdateAssignmentRequestBody = {
          status: 'progress',
          comment: '',
        }
        onSubmit(body);
      }

      if (status === 'progress') {
        const { comment } = await form.validateFields();
        const body: IUpdateAssignmentRequestBody = {
          status: 'completed',
          comment,
        }
        onSubmit(body);
      }
      form.resetFields();
      setSubmitted(false);
    } catch {
      setSubmitted(true);
    }
  };

  return (
    <Modal
      open={open}
      title={status === "assigned" ? "В работу" : "Завершение работы"}
      okText={status === "assigned" ? "Взять в работу" : "Закрыть задачу"}
      cancelText="Отмена"
      onCancel={() => {
        setSubmitted(false);
        onClose();
      }}
      onOk={handleSubmit}
      destroyOnHidden
    >
      {status === "progress" && (
        <Form
          form={form}
          layout="vertical"
          validateTrigger={submitted ? "onChange" : "onSubmit"}
        >
          <Form.Item<Pick<IUpdateAssignmentRequestBody, 'comment'>>
            name="comment"
            label="Комментарий"
            rules={[
              {
                required: true,
                message: "Введите комментарий",
              },
              {
                max: 1000,
                message: "Максимальная длина комментария - 1000 символов",
              },
              {
                min: 5,
                message: "Минимальная длина комментария - 5 символов"
              }
            ]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      )}
      {status === 'assigned' && <p>Вы уверены что хотите взять в работу задачу №{taskId}?</p>}
    </Modal>
  );
};
