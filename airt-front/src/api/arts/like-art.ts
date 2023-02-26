import { httpClient } from "@/services/http-client";
import { MutationOptions } from "@/types/infra/mutation-options";
import { useMutation } from "react-query";

interface Params {
  artId: number;
  liked: boolean;
}

interface Response {
  liked: boolean;
}

const likeArt = async ({ artId, liked }: Params) => {
  const { data } = await httpClient.post<Response>(`/likes/${artId}/like`, {
    liked,
  });

  return data;
};

export const useLikeArtMutation = (
  options?: MutationOptions<Response, Params>
) => {
  return useMutation(likeArt, options);
};
