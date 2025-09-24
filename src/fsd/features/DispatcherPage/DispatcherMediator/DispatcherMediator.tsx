"use client";

import { useState } from "react";
import { Radio } from "antd";
import {
  AreaChartOutlined,
  AlertOutlined,
  DashboardOutlined,
  FundProjectionScreenOutlined,
  ApartmentOutlined,
} from "@ant-design/icons";
import { DispatcherScheme } from "@/fsd/widgets/DispatcherPage/ui/DispatcherScheme/DispatcherScheme";
import { AnalyticsPage } from "@/fsd/pages/AnalyticsPage/AnalyticsPage";

interface IDispatcherMediatorProps {
  location_id: string;
}

type ScreenKey =
  | "indications"
  | "accidents"
  | "analytics"
  | "forecast"
  | "scheme";

const screens = [
  {
    key: "scheme" as ScreenKey,
    label: "Схема",
    icon: <ApartmentOutlined />,
  },
  {
    key: "indications" as ScreenKey,
    label: "Показания",
    icon: <DashboardOutlined />,
  },
  { key: "accidents" as ScreenKey, label: "Аварии", icon: <AlertOutlined /> },
  {
    key: "analytics" as ScreenKey,
    label: "Аналитика",
    icon: <AreaChartOutlined />,
  },
  {
    key: "forecast" as ScreenKey,
    label: "Прогноз",
    icon: <FundProjectionScreenOutlined />,
  },
];

export const DispatcherMediator = ({
  location_id,
}: IDispatcherMediatorProps) => {
  const [active, setActive] = useState<ScreenKey>("scheme");

  return (
    <div className="flex flex-col gap-4 h-full justify-between">
      <Radio.Group
        value={active}
        onChange={(e) => setActive(e.target.value)}
        optionType="button"
        buttonStyle="solid"
      >
        {screens.map((s) => (
          <Radio.Button key={s.key} value={s.key}>
            {s.icon} {s.label}
          </Radio.Button>
        ))}
      </Radio.Group>

      <div className="bg-card h-full z-30 w-full">
        {active === "indications" && <div>Таблица с показаниями</div>}
        {active === "accidents" && <div>Таблица с происшествиями</div>}
        {active === "analytics" && <AnalyticsPage />}
        {active === "forecast" && <div>Прогноз</div>}
        {active === "scheme" && <DispatcherScheme location_id={location_id} />}
      </div>
    </div>
  );
};
