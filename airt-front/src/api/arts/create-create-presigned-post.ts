import { httpClient } from "@/services/http-client";
import { SingleUploadSchema } from "@/views/single-upload/schema";
import { useMutation } from "react-query";
import { queryClient } from "../query-client";

interface Response {
  fields: Record<string, string>;
  url: string;
}
type Request = Omit<SingleUploadSchema, "file">;

const createPresignedPost = async (data: Request) => {
  const toCreateTags = data.tags.filter((tag) => tag.split(" ").length === 1);

  if (toCreateTags.length) {
    await httpClient.post("/tags/bulk", { tags: toCreateTags });
  }

  return httpClient.post<Response>("/arts", data);
};

export const useCreatePresignedPost = () =>
  useMutation(createPresignedPost, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tags"],
      });
    },
  });
