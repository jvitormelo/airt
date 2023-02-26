import { useLoginMutation } from "@/api/auth/login";
import { Routes } from "@/routes";
import { useUserStore } from "@/store/user-store";
import { getError } from "@/utils/get-api-error";
import { useRouter } from "next/router";
import { LoginFormSchema } from "../form/schema";

interface Params {
  onError?: (message: string, status: number) => void;
  redirectTo?: string;
}

export const useLogin = ({ onError, redirectTo = Routes.Home }: Params) => {
  const { push } = useRouter();
  const { mutateAsync: login } = useLoginMutation();
  const { setUser } = useUserStore();

  const handleLogin = async (payload: LoginFormSchema) => {
    try {
      const { data } = await login(payload);

      setUser(data.user);

      await push(redirectTo);
    } catch (error) {
      const { status, message } = getError(error);

      onError && onError(message, status);
    }
  };

  return {
    login: handleLogin,
  };
};
