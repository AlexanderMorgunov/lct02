import { useGetAccidents } from "@/fsd/entities/Accident/api/useGetAccidents";
import { DispatcherAccidentsTable } from "@/fsd/widgets/DispatcherPage";
interface IProps {
  location_id: string;
}

export const DispatcherAccidents = ({ location_id }: IProps) => {
  const { data } = useGetAccidents({
    location_id: "1", // todo - заменить.Написано временно пока на беке нет данных
    // location_id,
    status: true,
  });

  return <DispatcherAccidentsTable accidents={data ?? []} />;
};
