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
import { DispatcherForecast } from "@/fsd/pages/DispatcherForecast/DispatcherForecast";
import { DispatcherAccidents } from "@/fsd/pages/DispatcherAccidents/DispatcherAccidents";
import { useGetLocation } from "@/fsd/entities/locations/api/useGetLocation";
import { IndicationsPage } from "@/fsd/pages/IndicationsPage/IndicationsPage";

interface IDispatcherMediatorProps {
  location_id: string;
}

type ScreenKey =
  | "indications"
  | "accidents"
  | "analytics"
  | "forecast"
  | "scheme";

type Screen = {
  key: ScreenKey;
  label: string;
  icon: React.JSX.Element;
};

const screens: Screen[] = [
  {
    key: "scheme",
    label: "Схема",
    icon: <ApartmentOutlined />,
  },
  {
    key: "indications",
    label: "Показания",
    icon: <DashboardOutlined />,
  },
  { key: "accidents", label: "Аварии", icon: <AlertOutlined /> },
  {
    key: "analytics",
    label: "Аналитика",
    icon: <AreaChartOutlined />,
  },
  {
    key: "forecast",
    label: "Стат-модель",
    icon: <FundProjectionScreenOutlined />,
  },
];

export const DispatcherMediator = ({
  location_id,
}: IDispatcherMediatorProps) => {
  const [active, setActive] = useState<ScreenKey>("scheme");
  const { data: location } = useGetLocation(+location_id);

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold p-4">{location?.title}</h2>
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
          {active === "indications" && <IndicationsPage />}
          {active === "accidents" && (
            <DispatcherAccidents location_id={location_id} />
          )}
          {active === "analytics" && <AnalyticsPage />}
          {active === "forecast" && <DispatcherForecast />}
          {active === "scheme" && (
            <DispatcherScheme location_id={location_id} />
          )}
        </div>
      </div>
    </div>
  );
};
