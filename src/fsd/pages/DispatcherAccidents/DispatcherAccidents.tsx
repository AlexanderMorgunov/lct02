import { useGetAccidents } from "@/fsd/entities/Accident/api/useGetAccidents";
import { DispatcherAccidentsTable } from "@/fsd/widgets/DispatcherPage";
import { useEffect } from "react";

interface IProps {
  location_id: string;
}

export const DispatcherAccidents = ({ location_id }: IProps) => {
  const { data, isLoading, error } = useGetAccidents({
    location_id,
    status: false,
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  return <DispatcherAccidentsTable />;
};
