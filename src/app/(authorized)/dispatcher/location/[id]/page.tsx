import { LocationPage } from "@/fsd/pages/Location/LocationPage";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  return <LocationPage id={id} />;
}
