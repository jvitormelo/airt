import { useCreatePresignedPost } from "@/api/arts/create-create-presigned-post";
import { useNotification } from "@/hooks/use-notification";
import { Routes } from "@/routes";
import { useRouter } from "next/router";
import { SingleUploadSchema } from "../schema";

export const useSubmitSingleUpload = () => {
  const { openNotification } = useNotification();

  const { push } = useRouter();

  const { mutateAsync: createLink } = useCreatePresignedPost();

  const submit = async ({ file, ...params }: SingleUploadSchema) => {
    try {
      const { data } = await createLink(params);
      const { url, fields } = data;

      if (!file) return null;

      const formData = new FormData();

      Object.entries(fields).forEach(([key, value]) =>
        formData.append(key, value)
      );

      formData.append("file", file);

      await fetch(url, {
        method: "POST",
        body: formData,
      });

      openNotification({
        message: "Image uploaded successfully",
        title: "Success",
        type: "success",
      });

      await push(Routes.Home);
    } catch (e) {
      openNotification({
        message: "Failed to upload image, please try again later",
        title: "Error",
        type: "error",
      });
      console.error(e);
    }
  };

  return {
    submit,
  };
};
