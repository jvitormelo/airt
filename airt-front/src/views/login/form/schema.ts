import zod from "zod";

export const loginFormSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(2),
});

export type LoginFormSchema = zod.infer<typeof loginFormSchema>;
