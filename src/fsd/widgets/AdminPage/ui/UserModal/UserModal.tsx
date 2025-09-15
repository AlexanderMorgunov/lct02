"use client";

import "@ant-design/v5-patch-for-react-19";
import { Modal, Form, Input, Select } from "antd";
import { IUser } from "@/fsd/entities/AdminPage/types";
import { useState } from "react";

interface UserModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (user: Omit<IUser, "id">) => void;
  user?: Partial<IUser>;
}

const roleOptions = [
  { label: "Администратор", value: 0 },
  { label: "Диспетчер", value: 1 },
  { label: "Аварийный", value: 2 },
];

export const UserModal = ({
  open,
  onClose,
  onSubmit,
  user,
}: UserModalProps) => {
  const [form] = Form.useForm();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values);
      form.resetFields();
      setSubmitted(false);
      onClose();
    } catch {
      setSubmitted(true);
    }
  };

  // Когда модалка открывается, сразу сбрасываем форму и подставляем новые значения
  if (open) {
    form.setFieldsValue({
      fullName: user?.fullName || "",
      login: user?.login || "",
      password: user?.password || "",
      role: user?.role ?? null,
    });
  }

  return (
    <Modal
      open={open}
      title={user ? "Редактирование пользователя" : "Создание пользователя"}
      okText={user ? "Сохранить" : "Создать"}
      cancelText="Отмена"
      onCancel={() => {
        form.resetFields();
        setSubmitted(false);
        onClose();
      }}
      onOk={handleSubmit}
      destroyOnHidden
    >
      <Form
        form={form}
        layout="vertical"
        validateTrigger={submitted ? "onChange" : "onSubmit"}
      >
        <Form.Item
          name="fullName"
          label="ФИО"
          rules={[{ required: true, message: "Введите ФИО" }]}
        >
          <Input placeholder="Иванов Иван Иванович" />
        </Form.Item>

        <Form.Item
          name="login"
          label="Логин"
          rules={[{ required: true, message: "Введите логин" }]}
        >
          <Input placeholder="ivanov" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Пароль"
          rules={[
            { required: true, message: "Введите пароль" },
            { min: 8, message: "Минимальная длина пароля - 8 символов" },
            {
              validator: (_, value) => {
                if (!value) return Promise.resolve();
                if (/[а-яА-ЯЁё]/.test(value))
                  return Promise.reject("Пароль не должен содержать кириллицу");
                if (!/[!@#$%^&*(),.?":{}|<>]/.test(value))
                  return Promise.reject(
                    "Пароль должен содержать хотя бы один спецсимвол"
                  );
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input.Password placeholder="Введите пароль" />
        </Form.Item>

        <Form.Item
          name="role"
          label="Роль"
          rules={[{ required: true, message: "Выберите роль" }]}
        >
          <Select options={roleOptions} placeholder="Выберите роль" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
