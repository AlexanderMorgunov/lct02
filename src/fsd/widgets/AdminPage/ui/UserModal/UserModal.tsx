"use client";

import "@ant-design/v5-patch-for-react-19";
import { Modal, Form, Input, Select, Checkbox } from "antd";
import type { CheckboxProps } from "antd";
import { useEffect, useState } from "react";
import {ICreateUserRequestBody, IEditUserRequestBody, IUser, TUserRole} from "@/fsd/shared/network/users/types";
import { PasswordField } from "@/fsd/widgets/AdminPage/ui/UserModal/PasswordField";


type UserModalProps<T extends "create" | "edit"> = {
  open: boolean;
  onClose: () => void;
} & (T extends "create"
  ? { onSubmit: (user: ICreateUserRequestBody) => void; user?: undefined }
  : { onSubmit: (user: IEditUserRequestBody) => void; user: IUser | object });

interface RoleOption {
  label: string;
  value: TUserRole;
};

const roleOptions: RoleOption[] = [
  { label: "Администратор", value: 'admin' },
  { label: "Диспетчер", value: 'user' },
  { label: "Аварийный", value: 'worker' },
];

export const UserModal = <T extends "create" | "edit">({
  open,
  onClose,
  onSubmit,
  user,
}: UserModalProps<T>) => {
  const [form] = Form.useForm();
  const [submitted, setSubmitted] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const onChangeCheckbox: CheckboxProps['onChange'] = (e) => {
    setIsShowPassword(e.target.checked);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values);
      form.resetFields();
      setSubmitted(false);
    } catch {
      setSubmitted(true);
    }
  };

  // Подставляем данные при открытии
  useEffect(() => {
    if (open) {
      form.setFieldsValue({
        ...user,
      });
      setSubmitted(false);
    } else {
      form.resetFields();
    }
  }, [open, user, form]);

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
          name="name"
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

        {user && <Checkbox style={{ marginBottom: '24px' }} onChange={onChangeCheckbox}>Изменить пароль</Checkbox>}

        {!user ? (
          <PasswordField />
        ) : isShowPassword ? (
          <PasswordField />
        ) : null}

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
