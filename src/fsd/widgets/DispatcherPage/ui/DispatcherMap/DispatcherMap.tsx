"use client";

import { IRegion } from "@/fsd/entities/Regions/types/type";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { useEffect, useState } from "react";

interface DispatcheerMapProps {
  regions: IRegion[];
}

const mapOptions = {
  suppressMapOpenBlock: true, // скрывает блок "Как добраться" и "Такси"
  copyrightUaVisible: false, // скрывает копирайты
  copyrightLogoVisible: false, // скрывает логотип Яндекса
  copyrightProvidersVisible: false, // скрывает провайдеров
};

export const DispatcherMap = ({ regions }: DispatcheerMapProps) => {
  console.log(regions);
  return (
    <YMaps>
      <Map
        defaultState={{ center: [55.75, 37.57], zoom: 9 }}
        width="100%"
        height="100%"
        options={mapOptions}
      >
        {regions.map((region) => (
          <Placemark
            key={region.id}
            geometry={[region.lat, region.long]}
            properties={{ balloonContentBody: region.title }}
            onClick={() => {
              console.log("region", region);
            }}
          />
        ))}
      </Map>
    </YMaps>
  );
};
