import { useUserStore } from "@/store/user-store";

export const useUser = () => {
  const user = useUserStore((state) => state.user);

  return {
    user,
    isAuth: !!user.id,
  };
};
