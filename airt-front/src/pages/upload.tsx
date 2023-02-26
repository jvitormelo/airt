import { useFormResolver } from "@/hooks/use-form-resolver";
import { mediaMaxWidth } from "@/utils/css-media";
import { SingleUploadForm } from "@/views/single-upload/form/SingleUploadForm";
import { SingleUploadImage } from "@/views/single-upload/image/SingleImageUpload";
import {
  SingleUploadSchema,
  singleUploadSchema,
} from "@/views/single-upload/schema";

import { Container, createStyles } from "@mantine/core";
import { FormProvider } from "react-hook-form";

const useStyles = createStyles((theme) => ({
  container: {
    display: "flex",
    gap: theme.spacing.md,
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    minHeight: "80vh",
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    [mediaMaxWidth(theme.breakpoints.lg)]: {
      flexDirection: "column",
    },
  },
}));

const UploadImagePage = () => {
  const { classes } = useStyles();

  const methods = useFormResolver<SingleUploadSchema>(singleUploadSchema, {
    defaultValues: {
      nsfw: false,
      tags: [],
    },
  });

  return (
    <FormProvider {...methods}>
      <Container className={classes.container}>
        <SingleUploadImage />
        <SingleUploadForm />
      </Container>
    </FormProvider>
  );
};

export default UploadImagePage;
