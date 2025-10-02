import { DispatcherAccidentsTable } from "@/fsd/widgets/DispatcherPage";
interface IProps {
  location_id: string;
}

export const DispatcherAccidents = ({ location_id }: IProps) => {
  return <DispatcherAccidentsTable location_id={location_id} />;
};
