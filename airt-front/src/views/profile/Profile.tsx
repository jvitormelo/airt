import { ImageUpload } from "@/components/core/image-upload/ImageUpload";
import { useFormResolver } from "@/hooks/use-form-resolver";
import { useUser } from "@/hooks/use-user";
import { Box, Button, Stack, TextInput } from "@mantine/core";
import { useState } from "react";
import { profileSchema, ProfileSchema } from "./schema";

export const ProfileView = () => {
  const { user } = useUser();

  const [file, setFile] = useState<File | null>(null);

  const { register, handleSubmit } = useFormResolver<ProfileSchema>(
    profileSchema,
    {
      defaultValues: {
        name: user.name,
      },
    }
  );

  const onSubmit = handleSubmit((data) => {
    // WIP
    console.log(data);
  });

  return (
    <Box
      onSubmit={onSubmit}
      component="form"
      sx={(theme) => ({
        gap: theme.spacing.md,
        display: "flex",
      })}
    >
      <ImageUpload initialImage={user.picture} file={file} setFile={setFile} />
      <Stack sx={{ flex: 2 }}>
        <TextInput {...register("name")} label="Name"></TextInput>
        <TextInput value={user.email} label="Email" disabled></TextInput>
        <Button type="submit">Save</Button>
      </Stack>
    </Box>
  );
};
