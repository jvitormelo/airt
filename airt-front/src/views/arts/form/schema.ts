import { z } from "zod";
import { ArtsSortOptions } from "../constants";

export const filterFormSchema = z.object({
  tags: z.array(z.string()),
  sortBy: z.enum(ArtsSortOptions),
});

export type FilterFormSchema = z.infer<typeof filterFormSchema>;
