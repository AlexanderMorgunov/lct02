"use client";
import "@ant-design/v5-patch-for-react-19";
import { App, Modal } from "antd";

interface CloseModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (props: { id: number; status: boolean }) => void;
  accidentTitle?: string;
  id: number | null;
}

export const CloseModal = ({
  open,
  onClose,
  onConfirm,
  accidentTitle,
  id,
}: CloseModalProps) => {
  const { message } = App.useApp();
  const handleConfirm = () => {
    try {
      if (id !== null) {
        onConfirm({ id, status: false });
        message.success(`Аномалия-${id} закрыта`);
      }
    } catch (error) {
      console.log(error);
      message.error("Ошибка закрытия");
    }
    onClose();
  };
  return (
    <Modal
      open={open}
      title="Закрытие аномалии"
      okText="Закрыть"
      okType="danger"
      cancelText="Отмена"
      onCancel={onClose}
      onOk={handleConfirm}
      destroyOnHidden
    >
      <p>
        Вы действительно хотите закрыть аварию
        <strong>{accidentTitle || "?"}</strong>
      </p>
    </Modal>
  );
};
