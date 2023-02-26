// REFACTOR
export const ArtsSortBy = {
  RECENT: {
    value: "RECENT",
    label: "Recent",
  },
  VIEWED: {
    value: "VIEWED_COUNT",
    label: "Viewed",
  },
} as const;

const values = Object.values(ArtsSortBy).map((item) => item.value);

export type ArtsSortByType = typeof values[0];

export const ArtsSortOptions = Object.values(ArtsSortBy).map(
  (item) => item.value
) as [ArtsSortByType];
