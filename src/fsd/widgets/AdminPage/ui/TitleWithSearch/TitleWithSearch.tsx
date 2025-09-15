"use client";

import { Input } from "antd";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import { cn } from "@/fsd/shared/utils/cn/cn";
import { useEffect, useState, useDeferredValue } from "react";

interface IProps {
  showInput: boolean;
  setShowInput: (val: boolean) => void;
  value: string;
  setValue: (value: string) => void;
  title: string;
  className?: string;
  inputClassName?: string;
}

export const TitleWithSearch = ({
  showInput,
  value,
  setValue,
  setShowInput,
  title,
  className,
  inputClassName,
}: IProps) => {
  const [localValue, setLocalValue] = useState(value);

  const deferredValue = useDeferredValue(localValue);

  useEffect(() => {
    setValue(deferredValue);
  }, [deferredValue, setValue]);

  useEffect(() => {
    if (!value) setLocalValue("");
  }, [value]);

  return (
    <div className={cn("flex items-center justify-between px-2.5", className)}>
      {showInput ? (
        <Input
          type="text"
          className={cn("border px-2 py-1 rounded text-sm", inputClassName)}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => setLocalValue(e.target.value)}
          value={localValue}
          placeholder={`Поиск ${title}`}
        />
      ) : (
        title
      )}
      {showInput ? (
        <CloseOutlined
          onClick={(e) => {
            e.stopPropagation();
            setShowInput(false);
            setLocalValue("");
            setValue("");
          }}
          className="cursor-pointer text-gray-500 hover:text-red-500 ml-2"
        />
      ) : (
        <SearchOutlined
          onClick={(e) => {
            e.stopPropagation();
            setShowInput(true);
          }}
          className="cursor-pointer text-gray-500 hover:text-blue-500"
        />
      )}
    </div>
  );
};
