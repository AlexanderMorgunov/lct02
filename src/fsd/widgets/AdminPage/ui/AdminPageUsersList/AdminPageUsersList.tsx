"use client";

import { Table, Avatar, Button, Space, App } from "antd";
import { EditOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
import { mockUsers } from "../../mock/mockUsers";
import { IUser, Role } from "@/fsd/entities/AdminPage/types";
import type { SortOrder } from "antd/es/table/interface";
import { useFilerUsersList } from "../../hooks/useFilerUsersList";
import { UserModal } from "../UserModal/UserModal";
import { DeleteUserModal } from "../DeleteUserModal/DeleteUserModal";

const roleLabels: Record<IUser["role"], Role> = {
  0: Role.Admin,
  1: Role.Dispatcher,
  2: Role.Emergency,
};

export const AdminPageUsersList = () => {
  const [users, setUsers] = useState<IUser[]>(mockUsers);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<IUser | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  const { message } = App.useApp();

  const {
    showNameInput,
    showLoginInput,
    showSelectRole,
    filteredUsers,
    fioTitle,
    loginTitle,
    roleTitle,
  } = useFilerUsersList({ users });

  const handleDelete = (id: number) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    setDeleteModalOpen(false);
    setSelectedUser(null);
    message.success(`Пользователь id: ${id} удален`);
  };

  const getNameInitials = (fullName: string) =>
    fullName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  const columns = [
    {
      title: fioTitle,
      dataIndex: "fullName",
      key: "fullName",
      sorter: !showNameInput
        ? (a: IUser, b: IUser) => a.fullName.localeCompare(b.fullName)
        : undefined,
      defaultSortOrder: "ascend" as SortOrder,
      render: (text: string) => (
        <div className="flex items-center gap-3">
          <Avatar className="bg-primary-text text-primary-bg">
            {getNameInitials(text)}
          </Avatar>
          <span>{text}</span>
        </div>
      ),
      className: "w-[32rem]",
    },
    {
      title: loginTitle,
      dataIndex: "login",
      key: "login",
      sorter: !showLoginInput
        ? (a: IUser, b: IUser) => a.login.localeCompare(b.login)
        : undefined,
      className: "w-[25rem]",
    },
    {
      title: roleTitle,
      dataIndex: "role",
      key: "role",
      sorter: !showSelectRole
        ? (a: IUser, b: IUser) =>
            roleLabels[a.role].localeCompare(roleLabels[b.role])
        : undefined,
      render: (role: IUser["role"]) => roleLabels[role],
      className: "w-[25rem]",
    },
    {
      title: "",
      key: "actions",
      render: (_: unknown, user: IUser) => (
        <Space size="middle">
          <EditOutlined
            className="cursor-pointer !text-success !text-success-hover"
            onClick={() => {
              setIsEditUserOpen(true);
              setEditingUser(user);
            }}
          />
          <DeleteOutlined
            className="cursor-pointer !text-danger !tex-danger-hover"
            onClick={() => {
              setSelectedUser(user);
              setDeleteModalOpen(true);
            }}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="!px-5 bg-primary-bg text-primary-text rounded-md shadow h-full">
        <div className="flex justify-between items-center mb-4 !py-5">
          <h2 className="text-xl font-bold">Список пользователей</h2>
          <Button
            type="text"
            icon={<PlusOutlined />}
            className="!text-xl"
            onClick={() => setIsAddUserOpen(true)}
          >
            Добавить
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={filteredUsers}
          rowKey="id"
          pagination={{ pageSize: 9 }}
          className="bg-primary-bg text-primary-text"
        />
      </div>
      {isAddUserOpen && (
        <UserModal
          open={isAddUserOpen}
          onClose={() => setIsAddUserOpen(false)}
          onSubmit={(newUser) => {
            setUsers((prev) => [
              ...prev,
              { ...newUser, id: Date.now() }, // временный id
            ]);
          }}
        />
      )}

      {isEditUserOpen && (
        <UserModal
          open={isEditUserOpen}
          onClose={() => {
            setIsEditUserOpen(false);
            setEditingUser(null);
          }}
          onSubmit={(newUser) => {
            setUsers((prev) =>
              prev.map((u) =>
                u.id === editingUser?.id ? { ...u, ...newUser } : u
              )
            );
            setIsEditUserOpen(false);
            setEditingUser(null);
          }}
          user={editingUser ?? {}}
        />
      )}

      {selectedUser && (
        <DeleteUserModal
          open={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={() => handleDelete(selectedUser.id)}
          userName={selectedUser.fullName}
        />
      )}
    </>
  );
};
