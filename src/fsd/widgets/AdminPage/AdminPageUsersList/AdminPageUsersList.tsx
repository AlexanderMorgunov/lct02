"use client";

import { Table, Avatar, Button, Space } from "antd";
import { EditOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";

interface User {
  id: number;
  fullName: string;
  position: string;
  comment: string;
  phone: string;
  email: string;
  password: string;
  role: string;
}

export const mockUsers: User[] = [
  {
    id: 1,
    fullName: "Иван Иванов",
    position: "Начальник Аварийной службы",
    comment: "",
    phone: "+7 (999) 999-99-99",
    email: "QHs5o@example.com",
    password: "password123",
    role: "Emergency service",
  },
  {
    id: 2,
    fullName: "Петр Петров",
    position: "Диспетчер",
    comment: "",
    phone: "+7 (999) 999-99-99",
    email: "QHs5o@example.com",
    password: "password123",
    role: "dispatcher",
  },
  {
    id: 3,
    fullName: "Сергей Сергеев",
    position: "Старший техник Аварийной службы",
    comment: "",
    phone: "+7 (999) 999-99-99",
    email: "QHs5o@example.com",
    password: "password123",
    role: "Emergency service",
  },
  {
    id: 4,
    fullName: "Алексей Алексеев",
    position: "Техник Аварийной службы",
    comment: "Комментарий 4",
    phone: "+7 (999) 999-99-99",
    email: "QHs5o@example.com",
    password: "password123",
    role: "Emergency service",
  },
  {
    id: 5,
    fullName: "Мария Смирнова",
    position: "Старший Диспетчер",
    comment: "Комментарий 5",
    phone: "+7 (999) 999-99-99",
    email: "QHs5o@example.com",
    password: "password123",
    role: "dispatcher",
  },
  {
    id: 6,
    fullName: "Елена Кузнецова",
    position: "Аварийная служба",
    comment: "Комментарий 6",
    phone: "+7 (999) 999-99-99",
    email: "QHs5o@example.com",
    password: "password123",
    role: "Emergency service",
  },
  {
    id: 7,
    fullName: "Николай Новиков",
    position: "Менеджер",
    comment: "Комментарий 7",
    phone: "+7 (999) 999-99-99",
    email: "QHs5o@example.com",
    password: "password123",
    role: "manager",
  },
  {
    id: 8,
    fullName: "Ольга Морозова",
    position: "Диспетчер",
    comment: "Комментарий 8",
    phone: "+7 (999) 999-99-99",
    email: "QHs5o@example.com",
    password: "password123",
    role: "dispatcher",
  },
  {
    id: 9,
    fullName: "Дмитрий Попов",
    position: "Аварийная служба",
    comment: "Комментарий 9",
    phone: "+7 (999) 999-99-99",
    email: "QHs5o@example.com",
    password: "password123",
    role: "Emergency service",
  },
  {
    id: 10,
    fullName: "Светлана Лебедева",
    position: "Диспетчер",
    comment: "Комментарий 10",
    phone: "+7 (999) 999-99-99",
    email: "QHs5o@example.com",
    password: "password123",
    role: "dispatcher",
  },
  {
    id: 11,
    fullName: "Андрей Васильев",
    position: "Диспетчер",
    comment: "Комментарий 11",
    phone: "+7 (999) 999-99-99",
    email: "QHs5o@example.com",
    password: "password123",
    role: "dispatcher",
  },
  {
    id: 12,
    fullName: "Татьяна Михайлова",
    position: "Аварийная служба",
    comment: "Комментарий 12",
    phone: "+7 (999) 999-99-99",
    email: "QHs5o@example.com",
    password: "password123",
    role: "Emergency service",
  },
  {
    id: 13,
    fullName: "Виктор Фролов",
    position: "Администратор",
    comment: "Комментарий 13",
    phone: "+7 (999) 999-99-99",
    email: "QHs5o@example.com",
    password: "password123",
    role: "admin",
  },
];

export const UserList = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);

  const handleDelete = (id: number) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const columns = [
    {
      title: "ФИО",
      dataIndex: "fullName",
      key: "fullName",
      render: (text: string) => (
        <div className="flex items-center gap-3">
          <Avatar className="bg-primary-text text-primary-bg">
            {text
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </Avatar>
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Должность",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Телефон",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Роль",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Комментарий",
      dataIndex: "comment",
      key: "comment",
    },
    {
      title: "",
      key: "actions",
      render: (_: unknown, record: User) => (
        <Space size="middle">
          <EditOutlined className="cursor-pointer !text-success !text-success-hover" />
          <DeleteOutlined
            className="cursor-pointer !text-danger !tex-danger-hover"
            onClick={() => handleDelete(record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="!px-5 bg-primary-bg text-primary-text rounded-md shadow h-full">
      <div className="flex justify-between items-center mb-4 !py-5">
        <h2 className="text-xl font-bold">Список пользователей</h2>
        <Button type="text" icon={<PlusOutlined />} className="!text-xl">
          Добавить
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={users}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        className="bg-primary-bg text-primary-text"
      />
    </div>
  );
};
