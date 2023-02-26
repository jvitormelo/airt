import { httpClient } from "@/services/http-client";
import { useQuery } from "react-query";

interface Params {
  artId: number;
}

export interface GetIsLikedResponse {
  liked: boolean;
}

export const getUseIsLikedKey = (params: Params) => ["isLiked", params];

const getLiked = ({ artId }: Params) =>
  httpClient
    .get<GetIsLikedResponse>(`/likes/${artId}/liked`)
    .then((res) => res.data);

export const useIsLiked = (params: Params) => {
  return useQuery(getUseIsLikedKey(params), () => getLiked(params));
};
