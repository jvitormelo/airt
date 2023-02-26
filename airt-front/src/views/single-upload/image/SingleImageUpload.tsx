import { ImageUpload } from "@/components/core/image-upload/ImageUpload";
import { useFormContext } from "react-hook-form";
import { SingleUploadSchema } from "../schema";

export const SingleUploadImage = () => {
  const { watch, setValue } = useFormContext<SingleUploadSchema>();

  const file = watch("file");

  const setFile = (file: File | null) => {
    setValue("file", file, { shouldValidate: true });
  };

  return <ImageUpload file={file} setFile={setFile} />;
};
