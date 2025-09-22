import { LocationPage } from "@/fsd/pages/Location/LocationPage";
import React from "react";

export default function Page({ params }: { params: { id: string } }) {
  return <LocationPage id={params.id} />;
}
