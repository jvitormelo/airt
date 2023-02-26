import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm, UseFormProps } from "react-hook-form";
import { ZodType } from "zod";

export const useFormResolver = <T extends FieldValues>(
  schema: ZodType,
  options?: UseFormProps<T>
) =>
  useForm<T>({
    mode: "all",
    resolver: zodResolver(schema),
    ...options,
  });
