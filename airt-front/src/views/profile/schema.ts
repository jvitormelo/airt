import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(2),
});

export type ProfileSchema = z.infer<typeof profileSchema>;
