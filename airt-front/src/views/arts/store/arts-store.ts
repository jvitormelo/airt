import { create } from "zustand";
import { ArtsSortByType } from "../constants";

interface State {
  tags: string[];
  sortBy: ArtsSortByType;
  setData: (data: Pick<State, "sortBy" | "tags">) => void;
}

export const useArtsStore = create<State>((set) => ({
  sortBy: "RECENT",
  tags: [],
  setData: (data: Pick<State, "sortBy" | "tags">) =>
    set({
      sortBy: data.sortBy,
      tags: data.tags,
    }),
}));
