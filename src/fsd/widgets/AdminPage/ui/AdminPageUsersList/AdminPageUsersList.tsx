"use client";

import { Table, Avatar, Button, Space, App, TableProps } from "antd";
import { EditOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Role } from "@/fsd/entities/AdminPage";
import { useFilerUsersList } from "../../hooks/useFilerUsersList";
import { UserModal } from "../UserModal/UserModal";
import { DeleteUserModal } from "../DeleteUserModal/DeleteUserModal";
import { useGetUsers } from "@/fsd/widgets/AdminPage/api/useGetUsers";
import {
  ICreateUserRequestBody,
  IEditUserRequestBody,
  IGetUsersRequestParams,
  IUser,
} from "@/fsd/shared/network/users/types";
import { getNameInitials } from "@/fsd/shared/utils/getNameInitials";
import { useCreateUser } from "@/fsd/widgets/AdminPage/api/useCreateUser";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteUser } from "@/fsd/widgets/AdminPage/api/useDeleteUser";
import { useEditUser } from "@/fsd/widgets/AdminPage/api/useEditUser";
import { ProtectedUserButton } from "../ProtectedUserButton/ProtectedUserButton";

type SortKeys = "name" | "login" | "role";

const roleLabels: Record<IUser["role"], Role> = {
  admin: Role.Admin,
  user: Role.Dispatcher,
  worker: Role.Emergency,
  superadmin: Role.Superadmin,
};

const PAGE_SIZE = 5;
const protectedUserLogins = ["admin", "user", "worker", "superadmin"];

const isProtectedUser = (login: string) =>
  protectedUserLogins.includes(login.toLowerCase());

export const AdminPageUsersList = () => {
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<IUser | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<SortKeys | null>(null);
  const [sortOrder, setSortOrder] = useState<boolean | null>(null); // true = desc, false = asc

  const {
    showNameInput,
    showLoginInput,
    showSelectRole,
    fioTitle,
    loginTitle,
    roleTitle,
    deferredSearchLoginText,
    deferredSearchNameText,
    roleFilter,
  } = useFilerUsersList();

  const params: IGetUsersRequestParams = {
    page: currentPage,
    page_size: PAGE_SIZE,
    ...(sortField && sortOrder !== null
      ? { [`${sortField}_sort`]: sortOrder }
      : {}),
    ...(deferredSearchLoginText ? { login: deferredSearchLoginText } : {}),
    ...(deferredSearchNameText ? { name: deferredSearchNameText } : {}),
    ...(roleFilter ? { role: roleFilter } : {}),
  };

  // Генерируем queryKey для react-query
  const queryKey = [
    "getUsers",
    currentPage,
    ...(sortField && sortOrder !== null ? [sortField, sortOrder] : []),
    ...(deferredSearchLoginText ? [deferredSearchLoginText] : []),
    ...(deferredSearchNameText ? [deferredSearchNameText] : []),
    ...(roleFilter ? [roleFilter] : []),
  ];

  const queryClient = useQueryClient();
  const { message } = App.useApp();

  const { data, isFetching } = useGetUsers(queryKey, params);
  const { mutate: createUser } = useCreateUser();
  const { mutate: deleteUser } = useDeleteUser();
  const { mutate: editUser } = useEditUser();

  useEffect(() => {
    if (deferredSearchNameText || deferredSearchLoginText || roleFilter) {
      setCurrentPage(1);
    }
  }, [deferredSearchNameText, deferredSearchLoginText, roleFilter]);

  const handleTableChange: TableProps<IUser>["onChange"] = (_, __, sorter) => {
    if (!Array.isArray(sorter) && sorter?.field) {
      const field = sorter.field as SortKeys;
      if (sorter.order === "ascend") {
        setSortField(field);
        setSortOrder(false);
      } else if (sorter.order === "descend") {
        setSortField(field);
        setSortOrder(true);
      } else {
        setSortField(null);
        setSortOrder(null);
      }
    } else {
      setSortField(null);
      setSortOrder(null);
    }
  };

  const handleAddUser = (newUser: ICreateUserRequestBody) => {
    createUser(newUser, {
      onSuccess: async () => {
        queryClient.removeQueries({ queryKey: ["getUsers"] });
        setIsAddUserOpen(false);
      },
    });
  };

  const handleEditUser = (userId: number, user: IEditUserRequestBody) => {
    editUser(
      { userId, body: user },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: ["getUsers"] });
          setIsEditUserOpen(false);
          setEditingUser(null);
        },
      }
    );
  };

  const handleDelete = (id: number) => {
    deleteUser(id, {
      onSuccess: async () => {
        queryClient.removeQueries({ queryKey: ["getUsers"] });
        const total = (data?.pagination.count ?? 0) - 1;
        console.log(total);
        const lastPage = Math.ceil(total / PAGE_SIZE);
        setCurrentPage((prev) => (prev > lastPage ? lastPage : prev));
        setDeleteModalOpen(false);
        setSelectedUser(null);
        message.success(`Пользователь id: ${id} удален`);
      },
    });
  };

  const columns = [
    {
      title: fioTitle,
      dataIndex: "name",
      key: "name",
      sorter: !showNameInput ? true : undefined,
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
      sorter: !showLoginInput ? true : undefined,
      className: "w-[25rem]",
    },
    {
      title: roleTitle,
      dataIndex: "role",
      key: "role",
      sorter: !showSelectRole ? true : undefined,
      render: (role: IUser["role"]) => roleLabels[role],
      className: "w-[25rem]",
    },
    {
      title: "",
      key: "actions",
      render: (_: unknown, user: IUser) => (
        <Space size="middle">
          <ProtectedUserButton
            isProtected={isProtectedUser(user.login)}
            onClick={() => {
              setIsEditUserOpen(true);
              setEditingUser(user);
            }}
            message="Редактирование дефольтных пользователей запрещено"
            placement="topRight"
          >
            <EditOutlined className="cursor-pointer !text-success !text-success-hover" />
          </ProtectedUserButton>
          <ProtectedUserButton
            isProtected={isProtectedUser(user.login)}
            onClick={() => {
              setSelectedUser(user);
              setDeleteModalOpen(true);
            }}
            message="Удаление дефольтных пользователей запрещено"
            placement="topLeft"
          >
            <DeleteOutlined className="cursor-pointer !text-danger !tex-danger-hover" />
          </ProtectedUserButton>
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
          dataSource={data?.users || []}
          rowKey={(record) => record.id}
          loading={isFetching}
          onChange={handleTableChange}
          pagination={{
            pageSize: PAGE_SIZE,
            total: data?.pagination.count,
            current: currentPage,
            onChange: (page) => setCurrentPage(page),
            showLessItems: true,
          }}
          className="bg-primary-bg text-primary-text"
        />
      </div>

      {isAddUserOpen && (
        <UserModal<"create">
          open={isAddUserOpen}
          onClose={() => setIsAddUserOpen(false)}
          onSubmit={handleAddUser}
        />
      )}

      {isEditUserOpen && editingUser && (
        <UserModal<"edit">
          open={isEditUserOpen}
          onClose={() => {
            setIsEditUserOpen(false);
            setEditingUser(null);
          }}
          onSubmit={(v) => handleEditUser(editingUser.id, v)}
          user={editingUser ?? {}}
        />
      )}

      {selectedUser && (
        <DeleteUserModal
          open={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={() => handleDelete(selectedUser.id)}
          userName={selectedUser.name}
        />
      )}
    </>
  );
};
