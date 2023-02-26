import { ControlledTagsSelect } from "@/components/core/tags-select/TagsSelect";
import { useFormResolver } from "@/hooks/use-form-resolver";
import { Button, createStyles, Flex, Select, Stack } from "@mantine/core";
import { useController } from "react-hook-form";
import { FilterFormSchema, filterFormSchema } from "./schema";
import { mediaMaxWidth } from "@/utils/css-media";
import { ArtsSortBy } from "../constants";
import { useArtsStore } from "@/views/arts/store/arts-store";

const sortByData = Object.values(ArtsSortBy);

const useStyles = createStyles((theme) => ({
  selectContainer: {
    [mediaMaxWidth(theme.breakpoints.md)]: {
      flexDirection: "column",
    },
  },
  tags: {
    flex: 1,
  },
}));

export const ArtsFilterForm = () => {
  const { classes } = useStyles();

  const { setData } = useArtsStore();

  const { control, handleSubmit } = useFormResolver<FilterFormSchema>(
    filterFormSchema,
    {
      defaultValues: {
        sortBy: ArtsSortBy.RECENT.value,
        tags: [],
      },
    }
  );

  const { field, fieldState } = useController({
    name: "sortBy",
    control,
  });

  const onSubmit = handleSubmit(setData);

  return (
    <form onSubmit={onSubmit}>
      <Stack>
        <Flex gap={"md"} className={classes.selectContainer}>
          <ControlledTagsSelect<FilterFormSchema>
            name="tags"
            control={control}
            placeholder="Search for tags"
            className={classes.tags}
          />

          <Select
            value={field.value}
            onChange={(value) => field.onChange(value)}
            label="Sort by"
            data={sortByData}
            error={fieldState.error?.message}
          />
        </Flex>

        <Button type="submit">Filter</Button>
      </Stack>
    </form>
  );
};
