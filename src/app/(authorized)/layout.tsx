import { AuthCheckProvider } from "@/fsd/app/providers/AuthCheckProvider/AuthCheckProvider";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthCheckProvider>{children}</AuthCheckProvider>
    </>
  );
}
