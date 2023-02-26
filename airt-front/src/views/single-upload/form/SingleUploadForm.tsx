import { ControlledTagsSelect } from "@/components/core/tags-select/TagsSelect";
import { Box, Button, Checkbox, createStyles, TextInput } from "@mantine/core";
import { useFormContext } from "react-hook-form";
import { useSubmitSingleUpload } from "../hooks/useSubmitSingleUpload";
import { SingleUploadSchema } from "../schema";

const useStyles = createStyles((theme) => ({
  checkbox: {
    ["input,label"]: {
      cursor: "pointer",
    },
  },
  form: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    gap: theme.spacing.md,
  },
}));

export const SingleUploadForm = () => {
  const { classes } = useStyles();
  const {
    register,
    control,

    handleSubmit,
    formState: { isSubmitting, isValid, errors },
  } = useFormContext<SingleUploadSchema>();

  const { submit } = useSubmitSingleUpload();

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(submit)}
      className={classes.form}
    >
      <TextInput
        {...register("name")}
        error={errors.name?.message}
        label="Image name"
        placeholder="The name of your image"
      />

      <ControlledTagsSelect<SingleUploadSchema>
        control={control}
        name="tags"
        creatable
      />

      <Checkbox
        {...register("nsfw")}
        className={classes.checkbox}
        label="NSFW"
      />

      <Button
        loading={isSubmitting}
        disabled={!isValid}
        mt={"auto"}
        type="submit"
      >
        Upload
      </Button>
    </Box>
  );
};
