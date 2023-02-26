import { httpClient } from "@/services/http-client";
import { AxiosResponse } from "axios";
import { useMutation, UseMutationOptions } from "react-query";

interface Tag {
  id: number;
  name: string;
}

export const createTag = async (name: string) =>
  httpClient.post<Tag>("/tags", { name });

export const useCreateTag = (
  options?: UseMutationOptions<AxiosResponse<Tag>, unknown, string>
) => {
  return useMutation(createTag, options);
};
