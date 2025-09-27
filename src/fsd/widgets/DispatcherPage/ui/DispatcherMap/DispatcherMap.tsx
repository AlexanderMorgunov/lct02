"use client";

import { useGetLocations } from "@/fsd/entities/locations/api/useGetLocations";
import { ROUTES } from "@/fsd/shared/config/routes";
import { useMapCoordinates } from "@/fsd/shared/store/mapCoordinates/useMapCoordinates";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { RegionsSelect } from "../RegionSelect/RegionSelect";
import { useGetRegions } from "@/fsd/entities/Regions";

const mapOptions = {
  suppressMapOpenBlock: true, // скрывает блок "Как добраться" и "Такси"
  copyrightUaVisible: false, // скрывает копирайты
  copyrightLogoVisible: false, // скрывает логотип Яндекса
  copyrightProvidersVisible: false, // скрывает провайдеров
};

export const DispatcherMap = () => {
  const { data: locations } = useGetLocations();
  const { data: regions } = useGetRegions();

  const router = useRouter();
  const { coordinates } = useMapCoordinates();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handler = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target?.classList?.contains("balloon-link")) {
        const id = target.getAttribute("data-id");
        if (id) router.push(`${ROUTES.LOCATION}/${id}`);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [router]);

  return (
    <div className="relative w-full h-full">
      <YMaps>
        <div className="w-full h-full">
          <Map
            defaultState={{ center: [55.75, 37.57], zoom: 9 }}
            state={{
              center: [coordinates.lat, coordinates.long],
              zoom: 12,
            }}
            width="100%"
            height="100%"
            options={mapOptions}
          >
            {locations?.map((loc) => (
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
          zIndex: 999999 /* очень высокий, чтобы гарантированно над картой */,
        }}
      >
        <RegionsSelect regions={regions ?? []} />
      </div>
    </div>
  );
};
