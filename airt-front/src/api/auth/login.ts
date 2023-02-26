import { LoginFormSchema } from "@/views/login/form/schema";
import { httpClient } from "@/services/http-client";
import { useMutation } from "react-query";
import { User } from "@/types/entities/user";

export interface LoginResponse {
  token: string;
  user: User;
}

const login = async (data: LoginFormSchema) =>
  httpClient.post<LoginResponse>("/auth/login", data, {
    withCredentials: true,
  });

export const useLoginMutation = () => useMutation(login);
