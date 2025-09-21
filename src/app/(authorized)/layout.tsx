import { AuthCheckProvider } from "@/fsd/app/providers/AuthCheckProvider/AuthCheckProvider";
import { RoleCheckProvider } from "@/fsd/app/providers/RoleCheckProvider/RoleCheckProvider";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthCheckProvider>
        <RoleCheckProvider>
          {children}
        </RoleCheckProvider>
      </AuthCheckProvider>
    </>
  );
}
