export const ORDER = {
  ASC: 'ASC',
  DESC: 'DESC',
} as const;

export type Order = keyof typeof ORDER;
