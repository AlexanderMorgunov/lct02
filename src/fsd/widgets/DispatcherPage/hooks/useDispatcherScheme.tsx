import { IGetIndicationResponse } from "@/fsd/entities/Indication/types/type";
import { useSocket } from "@/fsd/shared/hooks/useSocket";
import { Spin } from "antd";
import dayjs from "dayjs";

export const useDispatcherScheme = (location_id: string) => {
  const indications = useSocket<IGetIndicationResponse>("indications", {
    location_id: location_id,
  });

  const {
    hot_water_in,
    hot_water_out,
    hot_consumption,
    temp_hot_water_in,
    temp_hot_water_out,
    cold_water_in,
    cold_consumption,
    updated_at,
    status,
  } = indications?.indications[0] || {};

  const getTemp = (temp: number | undefined | null) => {
    if (temp) {
      return `${temp} °C`;
    } else {
      return <Spin size="small" />;
    }
  };

  const getVolume = (volume: number | undefined | null) => {
    if (volume) {
      return `${volume.toFixed(3)} м3`;
    } else {
      return <Spin size="small" />;
    }
  };

  const indicationInfo = [
    // date
    {
      id: 0,
      title: "Дата",
      text: dayjs(updated_at).format("DD.MM.YYYY"),
    },
    // time
    {
      id: 1,
      title: "Время",
      text: dayjs(updated_at).format("HH:mm:ss"),
    },
    // status
    {
      id: 2,
      title: "Статус",
      text: status ? "Норма" : "Авария",
    },
  ];

  const counters = [
    // ХВС
    {
      id: 0,
      value: getVolume(cold_water_in),
      className: "bottom-[220px] left-[114px]",
      isHot: false,
      title: "ХВС",
    },
    // /Т1 ГВС, °С
    {
      id: 1,
      value: getTemp(temp_hot_water_in),
      // className: "bottom-[365px] right-[560px]",
      className: "bottom-[360px] right-[537px]",
      isHot: true,
      title: "Т1 ГВС, °С",
    },
    // обратка гвс
    {
      id: 2,
      value: getVolume(hot_water_out),
      className: "bottom-[295px] left-[122px]",
      isHot: true,
      title: "Обратка ГВС",
    },
    // подача гвс
    {
      id: 3,
      value: getVolume(hot_water_in),
      // className: "bottom-[430px] left-[140px]",
      className: "bottom-[390px] left-[122px]",
      isHot: true,
      title: "Подача ГВС",
    },
    // Потребление накопительным итогом
    {
      id: 4,
      value: getVolume(cold_consumption),
      className: "bottom-[220px] left-[305px]",
      isHot: false,
      title: "Потребление накопительным итогом",
    },
    // Т2 ГВС, °С
    {
      id: 5,
      value: getTemp(temp_hot_water_out),
      className: "bottom-[247px] left-[559px]",
      isHot: true,
      title: "Т2 ГВС, °С",
    },
    // потребление ГВС, м3
    {
      id: 6,
      value: getVolume(hot_consumption),
      className: "bottom-[320px] right-[530px]",
      isHot: true,
      title: "Потребление ГВС, м3",
      pointClassName: "mt-[-67px]",
      placement: "bottom",
    },
  ];

  return { indicationInfo, counters, status };
};
