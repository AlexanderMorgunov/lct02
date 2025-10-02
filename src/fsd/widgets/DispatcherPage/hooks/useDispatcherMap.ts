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
  const { data: districtDetail, isLoading: isDistrictDetailLoading } =
    useGetDistrictsDetail(activeDistrict?.id || null);
  const [regionKey, setRegionKey] = useState(
    districtDetail?.regions?.[0].id || null
  );

  const { data: regionDetail } = useGetRegion(regionKey);

  const handleSetRegionID = (id: number) => {
    setRegionKey(id);
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

  useEffect(() => {
    if (!districtDetail?.regions?.[0].id || isDistrictDetailLoading) return;
    form.setFieldsValue({ region_id: districtDetail?.regions?.[0].id });
    handleSetRegionID(districtDetail?.regions?.[0].id);
  }, [districtDetail, form, isDistrictDetailLoading]);

  return {
    isLoadingMap,
    activeDistrict,
    setISLoadingMap,
    regionDetail,
    form,
    districtDetail,
    handleSetRegionID,
  };
};
