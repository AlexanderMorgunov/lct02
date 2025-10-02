"use client";

import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { RegionsSelect } from "../RegionSelect/RegionSelect";
import { Form, Spin } from "antd";
import { useDispatcherMap } from "../../hooks/useDispatcherMap";

const mapOptions = {
  suppressMapOpenBlock: true, // скрывает блок "Как добраться" и "Такси"
  copyrightUaVisible: false, // скрывает копирайты
  copyrightLogoVisible: false, // скрывает логотип Яндекса
  copyrightProvidersVisible: false, // скрывает провайдеров
};

export const DispatcherMap = () => {
  const {
    isLoadingMap,
    activeDistrict,
    setISLoadingMap,
    regionDetail,
    form,
    districtDetail,
    handleSetRegionID,
  } = useDispatcherMap();

  return (
    <div className="relative w-full h-full">
      {isLoadingMap && (
        <div className="absolute inset-0 flex w-full h-full items-center justify-center opacity-90 z-40">
          <Spin size="large" fullscreen></Spin>
        </div>
      )}
      <YMaps>
        <div className="w-full h-full">
          <Map
            state={{
              center: [
                activeDistrict?.lat || 55.75,
                activeDistrict?.long || 37.57,
              ],
              zoom: 8,
            }}
            width="100%"
            height="100%"
            options={mapOptions}
            onLoad={() => setISLoadingMap(false)}
          >
            {regionDetail?.locations?.map((loc) => (
              <Placemark
                key={loc.id}
                geometry={[loc.lat, loc.long]}
                modules={["geoObject.addon.balloon", "geoObject.addon.hint"]}
                properties={{
                  balloonContent: `
                    <div class="balloon">
                      <div class="balloon-title">${loc.title}</div>
                      <button class="balloon-link" data-id="${loc.id}"
                        style="margin-top: 10px; color: white; background-color: #1677ff; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer;"
                      >Подробнее</button>
                    </div>
                  `,
                }}
                options={{ balloonCloseButton: true, openBalloonOnClick: true }}
              />
            ))}
          </Map>
        </div>
      </YMaps>

      {/* селект поверх карты */}
      <div
        className="absolute top-5 left-5"
        style={{
          zIndex: 30,
        }}
      >
        <Form form={form}>
          <RegionsSelect
            regions={districtDetail?.regions ?? []}
            handleSetRegionID={handleSetRegionID}
          />
        </Form>
      </div>
    </div>
  );
};
