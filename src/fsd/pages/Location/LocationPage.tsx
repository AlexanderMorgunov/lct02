import { DispatcherMediator } from "@/fsd/features/DispatcherPage";

export const LocationPage = ({ id }: { id: string }) => {
  return <DispatcherMediator location_id={id} />;
};
