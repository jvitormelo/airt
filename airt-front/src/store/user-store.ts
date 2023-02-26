import { User } from "@/types/entities/user";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface State {
  user: User;
  setUser(user: Partial<User>): void;
}

export const useUserStore = create<State>()(
  devtools((set) => ({
    user: {
      email: "",
      id: 0,
      name: "",
      picture: "",
    },
    setUser: (data) =>
      set((state) => ({
        user: {
          ...state.user,
          ...data,
        },
      })),
  }))
);
