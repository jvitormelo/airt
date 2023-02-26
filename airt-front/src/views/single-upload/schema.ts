import z from "zod";

export const singleUploadSchema = z.object({
  name: z.string().min(3),
  tags: z.array(z.string()).min(1),
  nsfw: z.boolean(),
  file: typeof window === "undefined" ? z.null() : z.instanceof(File),
});

export type SingleUploadSchema = z.infer<typeof singleUploadSchema>;
