import { useGetTags } from "@/api/tags/get-tags";
import { MultiSelect, SelectItem } from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { formatTagName } from "@/utils/format-tag-name";
import { useState } from "react";

const addCountToTag = (tag: { name: string; count: number }) => {
  return `${tag.name} (${tag.count})`;
};

const useKeepTags = (searchTerm: string) => {
  const [tags, setTags] = useState(new Map<string, SelectItem>());

  useGetTags(
    {
      searchTerm,
      limit: 10,
      field: "POPULARITY",
      order: "DESC",
      page: 1,
    },
    {
      onSuccess(data) {
        setTags((tagsMap) => {
          const newMap = new Map(tagsMap);

          data.tags.forEach((tag) => {
            newMap.set(tag.name, {
              value: tag.name,
              label: addCountToTag(tag),
            });
          });

          return newMap;
        });
      },
    }
  );

  return { tags: Array.from(tags.values()) };
};

interface Props<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  creatable?: boolean;
  placeholder?: string;
  className?: string;
}

export const ControlledTagsSelect = <T extends FieldValues>({
  control,
  name,
  creatable,
  placeholder = "Pick all tags that apply",
  className,
}: Props<T>) => {
  const [searchTerm, setSearchTerm] = useDebouncedState("", 200);
  const { tags } = useKeepTags(searchTerm);

  const [toCreateTags, setToCreateTags] = useState<string[]>([]);

  const multiSelectData: SelectItem[] = (() => {
    return [
      ...tags,
      ...toCreateTags.map((tag) => ({
        value: tag,
        label: tag,
      })),
    ];
  })();

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => (
          <MultiSelect
            className={className}
            data={multiSelectData}
            error={fieldState.error?.message}
            label="Tags"
            creatable={creatable}
            searchable
            onSearchChange={setSearchTerm}
            placeholder={placeholder}
            getCreateLabel={(query) => `+ Create ${formatTagName(query)}`}
            onCreate={(query) => {
              const value = formatTagName(query);

              setToCreateTags([...toCreateTags, value]);

              return value;
            }}
            {...field}
          />
        )}
      />
    </>
  );
};
