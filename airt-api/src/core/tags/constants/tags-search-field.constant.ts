export const TAGS_FIELD = {
  NAME: 'NAME',
  POPULARITY: 'POPULARITY',
} as const;

export type TagsField = keyof typeof TAGS_FIELD;
