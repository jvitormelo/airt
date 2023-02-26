import { UseMutationOptions } from "react-query";

export type MutationOptions<Data, Variables> = Omit<
  UseMutationOptions<Data, unknown, Variables, unknown>,
  "mutationFn"
>;
