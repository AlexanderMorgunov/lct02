"use client";

import { Select } from "antd";
import { DownOutlined, CloseOutlined } from "@ant-design/icons";
import { cn } from "@/fsd/shared/utils/cn/cn";
import { IAssignmentStatus } from "@/fsd/shared/network/assignments/types";
import { AssignmentStatus } from "@/fsd/entities/Assignments";

interface Option {
  label: AssignmentStatus;
  value: IAssignmentStatus;
}

interface IProps {
  value: IAssignmentStatus | null;
  setValue: (value: IAssignmentStatus | null) => void;
  title: string;
  options: Option[];
  className?: string;
  selectClassName?: string;
  showSelect: boolean;
  setShowSelect: (val: boolean) => void;
}

export const TitleWithSelect = ({
  value,
  setValue,
  title,
  options,
  className,
  selectClassName,
  showSelect,
  setShowSelect,
}: IProps) => {
  return (
    <div className={cn("flex items-center justify-between px-2.5", className)}>
      {showSelect ? (
        <Select
          allowClear
          autoFocus
          value={value ?? undefined}
          onChange={(val) => setValue(val ?? null)}
          options={options}
          className={cn("w-full", selectClassName)}
          placeholder="Все"
          onClick={(e) => e.stopPropagation()}
        />
      ) : (
        <span>{title}</span>
      )}

      {showSelect ? (
        <CloseOutlined
          onClick={(e) => {
            e.stopPropagation();
            setShowSelect(false);
            setValue(null); // сбросить фильтр
          }}
          className="cursor-pointer text-gray-500 hover:text-red-500 ml-2"
        />
      ) : (
        <DownOutlined
          onClick={(e) => {
            e.stopPropagation();
            setShowSelect(true);
          }}
          className="cursor-pointer text-gray-500 hover:text-blue-500"
        />
      )}
    </div>
  );
};
