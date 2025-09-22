import { DispatcherScheme } from "@/fsd/widgets/DispatcherPage/ui/DispatcherScheme/DispatcherScheme";

export const LocationPage = ({ id }: { id: string }) => {
  return <DispatcherScheme location_id={id} />;
};
