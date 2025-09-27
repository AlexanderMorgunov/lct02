import { IRegion } from "@/fsd/entities/Regions";
import { cn } from "@/fsd/shared/utils/cn/cn";
import { Select } from "antd";
import React from "react";

interface IRegionSelectProps {
  regions: IRegion[];
  className?: string;
}

export const RegionsSelect = ({ regions, className }: IRegionSelectProps) => {
  const onChange = (value: number) => {
    console.log("selected region id", value);
  };

  return (
    <Select
      onChange={onChange}
      className={cn("min-w-52 bg-primary-bg", className)}
      placeholder="Выберите район"
    >
      {regions?.map((region) => (
        <Select.Option key={region.id} value={region.id}>
          {region.title}
        </Select.Option>
      ))}
    </Select>
  );
};
