import { LocationPage } from "@/fsd/pages/Location/LocationPage";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  return <LocationPage id={id} />;
}
