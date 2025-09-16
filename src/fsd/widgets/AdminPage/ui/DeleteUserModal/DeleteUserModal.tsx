"use client";
import "@ant-design/v5-patch-for-react-19";

import { Modal } from "antd";

interface DeleteUserModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName?: string; // Имя пользователя для отображения
}

export const DeleteUserModal = ({
  open,
  onClose,
  onConfirm,
  userName,
}: DeleteUserModalProps) => {
  return (
    <Modal
      open={open}
      title="Удаление пользователя"
      okText="Удалить"
      okType="danger"
      cancelText="Отмена"
      onCancel={onClose}
      onOk={onConfirm}
      destroyOnHidden
    >
      <p>
        Вы действительно хотите удалить пользователя{" "}
        <strong>{userName || "?"}</strong>?
      </p>
    </Modal>
  );
};
