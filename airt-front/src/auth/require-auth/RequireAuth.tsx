import { useUser } from "@/hooks/use-user";

export const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { isAuth } = useUser();

  return isAuth ? <>{children}</> : <></>;
};
