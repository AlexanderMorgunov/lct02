import { LocationPage } from "@/fsd/pages/Location/LocationPage";

export default async function Page({ params }: { params: { id: string } }) {
  return <LocationPage id={params.id} />;
}
