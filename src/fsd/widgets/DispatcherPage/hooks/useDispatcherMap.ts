import { useGetDistrictsDetail } from "@/fsd/entities/District/api/useGetDistrictsDetail";
import { ILocation } from "@/fsd/entities/locations/types/type";
import { useGetRegion } from "@/fsd/entities/Regions";
import { ROUTES } from "@/fsd/shared/config/routes";
import { useActiveDistrict } from "@/fsd/shared/store/mapCoordinates/useActiveDistrict";
import { useForm } from "antd/lib/form/Form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useDispatcherMap = () => {
  const router = useRouter();
  const [form] = useForm();

  const { activeDistrict } = useActiveDistrict();
  const { data: districtDetail } = useGetDistrictsDetail(
    activeDistrict?.id || null
  );
  const initialActiveRegionIndex = districtDetail?.regions?.[0].id;
  const [activeRegionIndex, setActiveRegionIndex] = useState<number | null>(
    initialActiveRegionIndex || null
  );
  const { data: regionDetail } = useGetRegion(activeRegionIndex || 0);

  const handleSetActiveRegion = (index: number) => {
    setActiveRegionIndex(index);
  };

  const [isLoadingMap, setISLoadingMap] = useState(true);

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

  /// изменение координат для теста
  const getChangeLocation = (locations: ILocation[] | null | undefined) => {
    if (!locations) return [];
    return locations.map((loc, i) => ({
      ...loc,
      lat: loc.lat + i * 0.0000001,
      long: loc.long + i * 0.0001,
    }));
  };

  useEffect(() => {
    form.resetFields();
    setActiveRegionIndex(null);
  }, [activeDistrict]);

  return {
    isLoadingMap,
    activeDistrict,
    setISLoadingMap,
    getChangeLocation,
    regionDetail,
    form,
    districtDetail,
    handleSetActiveRegion,
  };
};
