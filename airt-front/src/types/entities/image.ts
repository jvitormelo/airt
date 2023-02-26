import { Tag } from "./tag";

export interface ImageEntity {
  id: number;
  key: string;
  name: string;
  url: string;
  views: number;
  likes: number;
  createdAt: string;
}

export interface ImageWithTags extends ImageEntity {
  tags: Tag[];
}
