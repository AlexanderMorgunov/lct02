import { redirect } from "next/navigation";
import { ROUTES } from "@/fsd/shared/config/routes";

export default function Page() {
  redirect(ROUTES.REDIRECT);
}