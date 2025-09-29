import { IRegion } from "@/fsd/entities/Regions";
import { cn } from "@/fsd/shared/utils/cn/cn";
import { Form, Select } from "antd";
import React from "react";

interface IRegionSelectProps {
  regions: IRegion[];
  className?: string;
  handleSetRegionID: (id: number) => void;
}

export const RegionsSelect = ({
  regions,
  className,
  handleSetRegionID,
}: IRegionSelectProps) => {
  const onChange = (value: string) => {
    handleSetRegionID(+value);
  };

  return (
    <Form.Item name="region_id">
      <Select
        onChange={onChange}
        className={cn("min-w-52 bg-primary-bg", className)}
        placeholder="Выберите район"
        notFoundContent="Вначале выберите округ"
      >
        {regions?.map((region) => (
          <Select.Option key={region.id} value={region.id}>
            {region.title}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};
