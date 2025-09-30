import { IIndication } from "@/fsd/entities/Indication/types/type";
import { Modal, Table } from "antd";

interface IndicationsModalProps {
  indications: IIndication;
  open: boolean;
  onClose: () => void;
}

export const IndicationsModal = ({
  indications,
  open,
  onClose,
}: IndicationsModalProps) => {
  const data = [
    {
      key: "1",
      name: "Температура",
      value: indications.temperature,
      unit: "°C",
    },
    {
      key: "2",
      name: "Влажность",
      value: indications.relativehumidity,
      unit: "%",
    },
    {
      key: "3",
      name: "Скорость ветра",
      value: indications.windspeed,
      unit: "м/с",
    },
    { key: "4", name: "Осадки", value: indications.precipitation, unit: "мм" },
    {
      key: "5",
      name: "Хол. вода (расход)",
      value: indications.cold_consumption,
      unit: "м³",
    },
    {
      key: "6",
      name: "Гор. вода (расход)",
      value: indications.hot_consumption,
      unit: "м³",
    },
    {
      key: "7",
      name: "Хол. вода (вход)",
      value: indications.cold_water_in,
      unit: "м³",
    },
    {
      key: "8",
      name: "Гор. вода (вход)",
      value: indications.hot_water_in,
      unit: "м³",
    },
    {
      key: "9",
      name: "Гор. вода (выход)",
      value: indications.hot_water_out,
      unit: "м³",
    },
    {
      key: "10",
      name: "T гор. воды (вход)",
      value: indications.temp_hot_water_in,
      unit: "°C",
    },
    {
      key: "11",
      name: "T гор. воды (выход)",
      value: indications.temp_hot_water_out,
      unit: "°C",
    },
  ];

  const columns = [
    { title: "Показатель", dataIndex: "name", key: "name" },
    { title: "Значение", dataIndex: "value", key: "value" },
    { title: "Ед. изм.", dataIndex: "unit", key: "unit" },
  ];

  return (
    <Modal
      open={open}
      title="Показания при аварии"
      onCancel={onClose}
      footer={null}
      width={600}
    >
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        size="small"
        bordered
      />
    </Modal>
  );
};
