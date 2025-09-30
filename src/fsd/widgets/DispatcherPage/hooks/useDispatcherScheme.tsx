import { useGetIndications } from "@/fsd/entities/Indication/api/useGetIndications";
import { IIndication } from "@/fsd/entities/Indication/types/type";
import { useSocket } from "@/fsd/shared/hooks/useSocket";
import { Spin } from "antd";
import dayjs from "dayjs";

export const useDispatcherScheme = (location_id: string) => {
  const initialIndication = useGetIndications({
    location_id,
    date_at: "2025-04-28",
    time_of_day: "1",
  });
  const indication = useSocket<IIndication>({
    event: `indication-${location_id}`,
    initialData: initialIndication.data?.[0],
  });

  const {
    hot_water_in,
    hot_water_out,
    hot_consumption,
    temp_hot_water_in,
    temp_hot_water_out,
    cold_water_in,
    cold_consumption,
    status,
    temperature, // температура ОВ
    relativehumidity, // относительная влажность ОВ
    precipitation, // давление ОВ
    windspeed, // скорость ветра
    time_of_day,
    date_at,
  } = indication || {};

  const getTemp = (temp: number | undefined | null) => {
    if (temp !== null && temp !== undefined) {
      return `${temp} °C`;
    } else {
      return <Spin size="small" />;
    }
  };

  const getVolume = (volume: number | undefined | null) => {
    if (volume !== null && volume !== undefined) {
      return `${volume.toFixed(3)} м3`;
    } else {
      return <Spin size="small" />;
    }
  };

  const indicationInfoData = [
    {
      id: 0,
      title: "Дата",
      text: dayjs(date_at).format("DD.MM.YYYY"),
    },
    {
      id: 1,
      title: "Время",
      text: time_of_day,
    },
    {
      id: 2,
      title: "Статус",
      text: status ? "Аномалия" : "Нормально",
    },
  ];

  const indicationInfo = [
    {
      id: 0,
      title: "Тепретура ОВ",
      text: getTemp(temperature),
    },
    {
      id: 1,
      title: "Относительная влажность",
      text: `${relativehumidity} %`,
    },
    {
      id: 2,
      title: "Давление ОВ",
      text: `${precipitation} мм рт. ст.`,
    },
    {
      id: 3,
      title: "Скорость ветра",
      text: `${windspeed} м/с`,
    },
  ];

  const counters = [
    // ХВС
    {
      id: 0,
      value: getVolume(cold_water_in),
      className: "bottom-[190px] left-[112px]",
      isHot: false,
      title: "ХВС",
    },
    // /Т1 ГВС, °С
    {
      id: 1,
      value: getTemp(temp_hot_water_in),
      className: "bottom-[332px] right-[537px]",
      isHot: true,
      title: "Т1 ГВС, °С",
    },
    // обратка гвс
    {
      id: 2,
      value: getVolume(hot_water_out),
      className: "bottom-[266px] left-[122px]",
      isHot: true,
      title: "Обратка ГВС",
    },
    // подача гвс
    {
      id: 3,
      value: getVolume(hot_water_in),
      className: "bottom-[360px] left-[122px]",
      isHot: true,
      title: "Подача ГВС",
    },
    // Потребление накопительным итогом
    {
      id: 4,
      value: getVolume(cold_consumption),
      className: "bottom-[190px] left-[305px]",
      isHot: false,
      title: "Потребление накопительным итогом",
    },
    // Т2 ГВС, °С
    {
      id: 5,
      value: getTemp(temp_hot_water_out),
      className: "bottom-[329px] left-[562px]",
      isHot: true,
      title: "Т2 ГВС, °С",
    },
    // потребление ГВС, м3
    {
      id: 6,
      value: getVolume(hot_consumption),
      className: "bottom-[288px] right-[530px]",
      isHot: true,
      title: "Потребление ГВС, м3",
      pointClassName: "mt-[-67px]",
      placement: "bottom",
    },
  ];

  return { indicationInfoData, counters, status, indicationInfo };
};
