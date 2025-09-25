"use client";

import { useGetLocations } from "@/fsd/entities/locations/api/useGetLocations";
import { IRegion } from "@/fsd/entities/Regions/types/type";
import { ROUTES } from "@/fsd/shared/config/routes";
import { useMapCoordinates } from "@/fsd/shared/store/mapCoordinates/useMapCoordinates";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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
  const { data: locations } = useGetLocations();
  const router = useRouter();
  const { coordinates } = useMapCoordinates();

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.addEventListener("click", (e) => {
        const target = e.target as HTMLElement;
        if (target.classList.contains("balloon-link")) {
          const id = target.getAttribute("data-id");
          if (id) router.push(`${ROUTES.LOCATION}/${id}`);
        }
      });
    }
  }, [router]);

  return (
    <YMaps>
      <Map
        defaultState={{ center: [50.75, 30.57], zoom: 9 }}
        state={{
          center: [coordinates.lat, coordinates.long],
          zoom: 14,
        }}
        width="100%"
        height="100%"
        options={mapOptions}
      >
        {locations &&
          locations.map((loc) => (
            <Placemark
              modules={["geoObject.addon.balloon", "geoObject.addon.hint"]}
              key={loc.id}
              geometry={[loc.lat, loc.long]}
              properties={{
                balloonContent: `
      <div class="balloon">
        <div class="balloon-title">${loc.title}</div>
        <button class="balloon-link" data-id="${loc.id}"
              style="margin-top: 10px; color: white; background-color: #1677ff; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer;"
        ">Подробнее</button>
      </div>
    `,
              }}
              options={{
                balloonCloseButton: true,
                openBalloonOnClick: true,
              }}
            />
          ))}
      </Map>
    </YMaps>
  );
};
