import { httpClient } from "@/services/http-client";
import { useQuery, UseQueryOptions } from "react-query";

export const TagsSearchField = {
  NAME: "NAME",
  POPULARITY: "POPULARITY",
} as const;

export const TagsSearchOrder = {
  ASC: "ASC",
  DESC: "DESC",
} as const;

interface Params {
  limit?: number;
  field?: keyof typeof TagsSearchField;
  order?: keyof typeof TagsSearchOrder;
  page?: number;
  searchTerm?: string;
}

interface Tag {
  name: string;
  id: number;
  count: number;
}

type Response = {
  tags: Tag[];
  pagination: {
    currentPage: number;
    limit: number;
    hasNextPage: boolean;
  };
};

const getTags = async (params?: Params) =>
  httpClient
    .get<Response>("/tags", {
      params: {
        ...params,
        searchTerm: params?.searchTerm || null,
      },
    })
    .then((res) => res.data);

export const useGetTags = (
  params: Params,
  options: UseQueryOptions<Response>
) =>
  useQuery<Response>(["tags", params], async () => getTags(params), {
    keepPreviousData: true,
    cacheTime: 1000 * 60 * 60 * 24,
    staleTime: Infinity,
    ...options,
  });
