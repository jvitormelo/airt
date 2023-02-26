import { httpClient } from "@/services/http-client";
import { ImageEntity } from "@/types/entities/image";
import { ArtsSortByType } from "@/views/arts/constants";
import { useRouter } from "next/router";
import { useInfiniteQuery } from "react-query";

interface Params {
  page: number;
  tags?: string[];
  sortBy?: ArtsSortByType;
}

interface Response {
  data: ImageEntity[];
  nextPage: number;
  haveNextPage: boolean;
}

export const getAllImages = async (params?: Params): Promise<Response> => {
  return (
    await httpClient.get("/arts", {
      params: {
        limit: 10,
        ...params,
        tags: params?.tags || [],
      },
    })
  ).data;
};

export const useInfiniteGetAllImages = (
  tags: string[],
  sortBy: ArtsSortByType
) => {
  const { isReady } = useRouter();

  return useInfiniteQuery(["arts", tags, sortBy], {
    enabled: isReady,
    queryFn: ({ pageParam = 1, queryKey }) =>
      getAllImages({
        page: pageParam,
        tags: queryKey[1] as string[],
        sortBy: queryKey[2] as ArtsSortByType,
      }),
    getNextPageParam: (lastPage) => {
      if (lastPage.haveNextPage) {
        return lastPage.nextPage;
      }

      return undefined;
    },
  });
};
