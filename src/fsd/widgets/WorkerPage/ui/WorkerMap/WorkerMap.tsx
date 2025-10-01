'use client';

import { useParams, useRouter } from "next/navigation";
import { useGetLocation } from "@/fsd/entities/locations/api/useGetLocation";
import { Spin } from "antd";
import { Map, Placemark, YMaps } from "@pbe/react-yandex-maps";
import { useState } from "react";
import { CaretLeftOutlined } from "@ant-design/icons";

const mapOptions = {
  suppressMapOpenBlock: true, // скрывает блок "Как добраться" и "Такси"
  copyrightUaVisible: false, // скрывает копирайты
  copyrightLogoVisible: false, // скрывает логотип Яндекса
  copyrightProvidersVisible: false, // скрывает провайдеров
};

export const WorkerMap = () => {
  const { id } = useParams<{ id: string }>();
  const { back } = useRouter();
  const [isLoadingMap, setISLoadingMap] = useState(true)

  const { data: location, isLoading: isLoadingLocation } = useGetLocation(+id);

  if (isLoadingLocation) {
    return <Spin size="large" fullscreen></Spin>
  }

  return (
    <div className="relative w-full h-full">
      {isLoadingMap && (
        <div className="absolute inset-0 flex w-full h-full items-center justify-center opacity-90 z-40">
          <Spin size="large" fullscreen></Spin>
        </div>
      )}
      {location ? (
        <YMaps>
          <div className="w-full h-full">
            <Map
              state={{
                center: [
                  location.lat,
                  location.long,
                ],
                zoom: 15,
              }}
              width="100%"
              height="100%"
              options={mapOptions}
              onLoad={() => setISLoadingMap(false)}
            >
              <Placemark
                geometry={[location.lat, location.long]}
                modules={["geoObject.addon.balloon", "geoObject.addon.hint"]}
                options={{
                  balloonCloseButton: true,
                  openBalloonOnClick: true,
                  iconLayout: "default#image",
                  iconImageHref: "/worker-location.svg",
                  iconImageSize: [50, 50],
                  iconImageOffset: [-25, -50],
                }}
                properties={{
                  balloonContent: `
                    <div class="balloon">
                      <div class="balloon-title">${location.title}</div>
                    </div>
                  `,
                }}
              />
            </Map>
          </div>
        </YMaps>
      ) : (<p>Не удалось загрузить локацию</p>)}


      {/* кнопка назад */}
      <div
        className="absolute top-5 left-5"
        style={{
          zIndex: 30,
        }}
      >
        <button
          className={"w-12 h-12 bg-blue-900 text-white text-2xl flex items-center justify-center rounded-full hover:bg-blue-600 cursor-pointer transition duration-300"}
          onClick={() => back()}
        >
          <CaretLeftOutlined />
        </button>
      </div>
    </div>
  );
}