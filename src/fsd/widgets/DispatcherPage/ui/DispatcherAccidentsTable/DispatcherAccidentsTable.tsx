"use client";

import { Table, Tag } from "antd";
import type { TableProps } from "antd";
import { useState } from "react";
import { mockAccidents } from "../../MOCK/mockData";

interface Accident {
  id: number;
  title: string;
  ratio: number;
  status: boolean;
  created_at: string;
  location: {
    title: string;
  };
  indication: {
    temperature: number;
    relativehumidity: number;
  };
}

const PAGE_SIZE = 5;

export const DispatcherAccidentsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const columns: TableProps<Accident>["columns"] = [
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
      title: "Локация",
      dataIndex: ["location", "title"],
      key: "location",
      sorter: (a, b) => a.location.title.localeCompare(b.location.title),
    },
    {
      title: "Коэф.",
      dataIndex: "ratio",
      key: "ratio",
      sorter: (a, b) => a.ratio - b.ratio,
      render: (value: number) => value.toFixed(2),
    },
    {
      title: "Температура",
      dataIndex: ["indication", "temperature"],
      key: "temperature",
      sorter: (a, b) => a.indication.temperature - b.indication.temperature,
      render: (v: number) => `${v} °C`,
    },
    {
      title: "Влажность",
      dataIndex: ["indication", "relativehumidity"],
      key: "humidity",
      sorter: (a, b) =>
        a.indication.relativehumidity - b.indication.relativehumidity,
      render: (v: number) => `${v} %`,
    },
    {
      title: "Статус",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => Number(a.status) - Number(b.status),
      render: (status: boolean) =>
        status ? (
          <Tag color="green">Активна</Tag>
        ) : (
          <Tag color="red">Закрыта</Tag>
        ),
    },
    {
      title: "Создана",
      dataIndex: "created_at",
      key: "created_at",
      sorter: (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      render: (v: string) => new Date(v).toLocaleString(),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={mockAccidents}
      rowKey={(record) => record.id}
      pagination={{
        pageSize: PAGE_SIZE,
        current: currentPage,
        total: mockAccidents.length,
        onChange: (page) => setCurrentPage(page),
        showLessItems: true,
      }}
      className="bg-primary-bg text-primary-text"
    />
  );
};
