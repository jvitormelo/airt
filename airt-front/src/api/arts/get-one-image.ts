import { httpClient } from "@/services/http-client";
import { ImageWithTags } from "@/types/entities/image";
import { User } from "@/types/entities/user";

export interface GetOneImage extends ImageWithTags {
  user: Pick<User, "id" | "name" | "picture">;
}

export const getOneImage = async (id: string) => {
  return (await httpClient.get<GetOneImage>(`/arts/${id}`)).data;
};
